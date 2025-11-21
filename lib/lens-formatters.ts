import { PrismLens } from '@/types';

/**
 * Formats summary text into bullet points for EXPLAINED lens
 */
export function formatExplainedSummary(summary: string): string[] {
  // Split by periods, semicolons, or common separators
  const sentences = summary
    .split(/[.;]\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // If already has bullet-like structure, extract points
  if (summary.includes('•') || summary.includes('-')) {
    return summary
      .split(/[•\-]\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.match(/^(Click|Read)/i));
  }

  // Otherwise, split into logical points (2-3 sentences max)
  if (sentences.length <= 2) {
    return sentences;
  }

  // Group sentences into meaningful points
  const points: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const point = sentences.slice(i, i + 2).join('. ');
    if (point) points.push(point);
  }

  return points.length > 0 ? points : [summary];
}

/**
 * Formats summary into fact-check structure for DEBUNKED lens
 */
export function formatDebunkedSummary(summary: string): {
  claim?: string;
  reality: string;
  points: string[];
} {
  // Try to extract claim vs reality pattern
  const claimMatch = summary.match(/(?:claim|rumor|says?|alleged?)[:\s]+(.+?)(?:\.|,|but|however)/i);
  const realityMatch = summary.match(/(?:actually|reality|truth|but|however)[:\s]+(.+)/i);

  if (claimMatch && realityMatch) {
    return {
      claim: claimMatch[1].trim(),
      reality: realityMatch[1].trim(),
      points: [],
    };
  }

  // If no clear pattern, split into structured points
  const sentences = summary
    .split(/[.;]\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // First sentence often contains the claim/context
  const firstSentence = sentences[0] || '';
  const restSentences = sentences.slice(1);

  return {
    reality: summary,
    points: restSentences.length > 0 ? restSentences : [],
  };
}

/**
 * Gets appropriate content format based on lens
 */
export function getLensContentFormat(lens: PrismLens, summary: string) {
  switch (lens) {
    case 'explained':
      return {
        type: 'bullets' as const,
        bullets: formatExplainedSummary(summary),
      };
    case 'debunked':
      return {
        type: 'fact-check' as const,
        factCheck: formatDebunkedSummary(summary),
      };
    case 'raw':
    default:
      return {
        type: 'paragraph' as const,
        text: summary,
      };
  }
}

