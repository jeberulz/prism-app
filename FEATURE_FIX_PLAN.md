# Prism App - UI Feature Fix Plan

> **Document Type:** UI/UX Mockup Enhancement Plan
> **Date:** November 21, 2025
> **Scope:** Client-side only - No backend/API integration required
> **Purpose:** Make the prototype fully interactive with simulated functionality

---

## Executive Summary

This document outlines fixes for broken and incomplete UI features in the Prism App mockup. All solutions are **client-side only**, using localStorage for data persistence and simulated behaviors for a high-fidelity interactive prototype.

### Priority Breakdown

| Priority | Count | Total Time |
|----------|-------|------------|
| 🔴 Critical | 6 fixes | ~3 hours |
| 🟡 High | 8 fixes | ~12 hours |
| 🟢 Medium | 9 fixes | ~15 hours |
| ⚪ Low | 4 fixes | ~6 hours |
| **Total** | **27 fixes** | **~36 hours** |

### Success Criteria

✅ All interactive elements respond to user actions
✅ Data persists across page refreshes (localStorage)
✅ Keyboard navigation works throughout app
✅ WCAG 2.1 AA accessibility compliance
✅ Smooth, polished user experience
✅ No console errors

---

## 🔴 CRITICAL FIXES (Week 1 - ~3 hours)

### 1. Remove User Scaling Restriction

**Priority:** 🔴 CRITICAL
**Time:** 5 minutes
**Location:** [index.html:5](index.html#L5)

**Problem:** Users cannot zoom, violating WCAG 1.4.4 Level AA

**Current Code:**
```html
<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=no">
```

**Fixed Code:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Testing:**
- [ ] Pinch to zoom on mobile devices
- [ ] Browser zoom (Cmd/Ctrl +) works
- [ ] Layout doesn't break at 200% zoom

---

### 2. Fix XSS Vulnerability in onclick Handlers

**Priority:** 🔴 CRITICAL
**Time:** 1 hour
**Locations:** [index.html:739, 762, 781, 809, 824](index.html#L739)

**Problem:** Story titles/categories injected into onclick attributes can execute malicious code

**Current Code (Line 781):**
```javascript
<h2 onclick="openStory('${lensContent.title.replace(/'/g, "\\'")}')" class="...">
    ${lensContent.title}
</h2>
```

**Attack Vector:**
```javascript
// Malicious title: '); alert('XSS'); //
// Results in: onclick="openStory(''); alert('XSS'); //')"
```

**Fixed Code:**
```javascript
// Replace ALL inline onclick handlers with data attributes
<h2 data-story-title="${lensContent.title}" class="story-title clickable ...">
    ${lensContent.title}
</h2>

// Add event listener after rendering
function renderFeed(data) {
    // ... existing render code ...

    // Remove inline handlers, use event delegation
    container.querySelectorAll('.story-title').forEach(el => {
        el.addEventListener('click', () => {
            const title = el.dataset.storyTitle;
            openStory(title);
        });
    });
}
```

**Alternative (Better) - Use Event Delegation:**
```javascript
// Single listener on container
document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed-container');

    feedContainer.addEventListener('click', (e) => {
        const storyTitle = e.target.closest('[data-story-title]');
        if (storyTitle) {
            openStory(storyTitle.dataset.storyTitle);
        }

        const contextBtn = e.target.closest('[data-context-category]');
        if (contextBtn) {
            openContextAI(contextBtn.dataset.contextCategory);
        }
    });
});
```

**All locations to fix:**
- Line 739: `onclick="openContextAI('${story.category}')"`
- Line 762: `onclick="openStory('${story.title}')"`
- Line 781: `onclick="openStory('${lensContent.title}')"`
- Line 809: `onclick="openStory('${item.title}')"`
- Line 824: Similar patterns

**Testing:**
- [ ] Stories open correctly
- [ ] Special characters in titles work
- [ ] No console errors
- [ ] Try title with quotes, brackets, HTML tags

---

### 3. Implement Bookmark System

**Priority:** 🔴 CRITICAL
**Time:** 2 hours
**Locations:** [index.html:478-485](index.html#L478-L485) (reader), [352-368](index.html#L352-L368) (profile)

**Problem:** Bookmark button exists but doesn't work

**Implementation:**

```javascript
// Add to <script> section

// Bookmark storage system
const BookmarkManager = {
    getBookmarks() {
        const saved = localStorage.getItem('prism-bookmarks');
        return saved ? JSON.parse(saved) : [];
    },

    saveBookmarks(bookmarks) {
        localStorage.setItem('prism-bookmarks', JSON.stringify(bookmarks));
    },

    isBookmarked(storyTitle) {
        return this.getBookmarks().some(b => b.title === storyTitle);
    },

    addBookmark(story) {
        const bookmarks = this.getBookmarks();
        if (!this.isBookmarked(story.title)) {
            bookmarks.push({
                title: story.title,
                category: story.category,
                image: story.image,
                time: story.time,
                addedAt: new Date().toISOString()
            });
            this.saveBookmarks(bookmarks);
            return true;
        }
        return false;
    },

    removeBookmark(storyTitle) {
        const bookmarks = this.getBookmarks();
        const filtered = bookmarks.filter(b => b.title !== storyTitle);
        this.saveBookmarks(filtered);
        return bookmarks.length !== filtered.length;
    },

    toggleBookmark(story) {
        if (this.isBookmarked(story.title)) {
            this.removeBookmark(story.title);
            return false;
        } else {
            this.addBookmark(story);
            return true;
        }
    }
};

// Update bookmark button in reader
function updateBookmarkButton(storyTitle) {
    const bookmarkBtn = document.querySelector('#reader-bookmark-btn');
    if (!bookmarkBtn) return;

    const isBookmarked = BookmarkManager.isBookmarked(storyTitle);
    const icon = bookmarkBtn.querySelector('svg');

    if (isBookmarked) {
        icon.setAttribute('data-lucide', 'bookmark');
        icon.classList.add('fill-purple-500', 'text-purple-500');
    } else {
        icon.setAttribute('data-lucide', 'bookmark');
        icon.classList.remove('fill-purple-500', 'text-purple-500');
    }

    renderIcons();
}

// Bookmark button click handler
function toggleBookmark(button, story) {
    const isNowBookmarked = BookmarkManager.toggleBookmark(story);

    // Visual feedback
    button.classList.add('scale-110');
    setTimeout(() => button.classList.remove('scale-110'), 200);

    // Update icon
    const icon = button.querySelector('svg');
    if (isNowBookmarked) {
        icon.classList.add('fill-purple-500', 'text-purple-500');
        showToast('Saved to bookmarks');
    } else {
        icon.classList.remove('fill-purple-500', 'text-purple-500');
        showToast('Removed from bookmarks');
    }

    renderIcons();
}

// Toast notification helper
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast fixed bottom-20 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm z-50 transition-opacity';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}
```

**Update HTML - Reader Bookmark Button (Line 478-485):**
```html
<button
    id="reader-bookmark-btn"
    onclick="toggleBookmark(this, currentStory)"
    class="p-2 text-white/60 hover:text-white active:scale-95 transition-all"
    aria-label="Bookmark this story">
    <svg data-lucide="bookmark" width="20" height="20"></svg>
</button>
```

**Update Profile Bookmarks Section:**
```javascript
function renderProfileBookmarks() {
    const bookmarks = BookmarkManager.getBookmarks();
    const container = document.querySelector('#bookmarks-list');

    if (bookmarks.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <svg data-lucide="bookmark" class="w-12 h-12 mx-auto mb-3 opacity-30"></svg>
                <p class="text-sm">No bookmarks yet</p>
                <p class="text-xs mt-2">Bookmark stories to read them later</p>
            </div>
        `;
        renderIcons();
        return;
    }

    const html = bookmarks.map(bookmark => `
        <div class="bg-gray-900/30 rounded-xl p-4 border border-gray-800 flex gap-4 items-center">
            <div class="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                <img src="${bookmark.image}" class="w-full h-full object-cover" loading="lazy" alt="">
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-white truncate cursor-pointer"
                    onclick="openStory('${bookmark.title.replace(/'/g, "\\'")}')">${bookmark.title}</h4>
                <p class="text-xs text-gray-500">${bookmark.category} • ${bookmark.time}</p>
            </div>
            <button
                onclick="removeBookmarkFromProfile('${bookmark.title.replace(/'/g, "\\'")}')"
                class="text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Remove bookmark">
                <svg data-lucide="x" width="16" height="16"></svg>
            </button>
        </div>
    `).join('');

    container.innerHTML = html;
    renderIcons();
}

function removeBookmarkFromProfile(title) {
    BookmarkManager.removeBookmark(title);
    renderProfileBookmarks();
    showToast('Bookmark removed');
}

// Call on tab switch to Profile
function switchTab(tabId, btn) {
    // ... existing code ...

    if (tabId === 'view-profile') {
        renderProfileBookmarks();
    }
}
```

**Update openStory function to track current story:**
```javascript
let currentStory = null;

function openStory(title) {
    const story = stories.find(s => s.title === title) ||
                  discoverItems.find(d => d.title === title) ||
                  stories[0];

    currentStory = story; // Store for bookmark button

    // ... existing code ...

    updateBookmarkButton(story.title);
}
```

**Testing:**
- [ ] Bookmark button toggles state
- [ ] Bookmarks persist after refresh
- [ ] Profile shows all bookmarks
- [ ] Can remove bookmarks from profile
- [ ] Toast notifications appear
- [ ] Bookmark icon fills when saved

---

### 4. Implement Share Functionality

**Priority:** 🔴 CRITICAL
**Time:** 2 hours
**Locations:** [index.html:486-497](index.html#L486-L497), [769-774](index.html#L769-L774)

**Problem:** Share buttons don't work

**Implementation:**

```javascript
// Share system with Web Share API fallback
const ShareManager = {
    async shareStory(story) {
        const shareData = {
            title: story.title,
            text: `Check out this story on Prism: ${story.title}`,
            url: window.location.href // In real app would be unique URL
        };

        // Try native Web Share API first (mobile)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return { success: true, method: 'native' };
            } catch (error) {
                if (error.name === 'AbortError') {
                    return { success: false, cancelled: true };
                }
                // Fall through to clipboard
            }
        }

        // Fallback: Copy to clipboard
        return this.copyToClipboard(shareData);
    },

    async copyToClipboard(shareData) {
        const text = `${shareData.title}\n\n${shareData.text}\n${shareData.url}`;

        try {
            await navigator.clipboard.writeText(text);
            showToast('Link copied to clipboard!');
            return { success: true, method: 'clipboard' };
        } catch (error) {
            // Final fallback: Show share modal with manual copy
            this.showShareModal(shareData);
            return { success: true, method: 'modal' };
        }
    },

    showShareModal(shareData) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-white">Share Story</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <svg data-lucide="x" width="20" height="20"></svg>
                    </button>
                </div>

                <div class="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <p class="text-sm text-gray-300 mb-2">${shareData.title}</p>
                    <input
                        type="text"
                        value="${shareData.url}"
                        readonly
                        class="w-full bg-gray-900 text-gray-400 text-xs px-3 py-2 rounded border border-gray-700"
                        id="share-url-input">
                </div>

                <div class="grid grid-cols-3 gap-3">
                    <button onclick="ShareManager.shareToSocial('twitter', '${shareData.title.replace(/'/g, "\\'")}'); this.closest('.fixed').remove();"
                            class="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg width="20" height="20" fill="currentColor" class="text-blue-400"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        <span class="text-xs text-gray-400">Twitter</span>
                    </button>

                    <button onclick="ShareManager.shareToSocial('facebook', '${shareData.title.replace(/'/g, "\\'")}'); this.closest('.fixed').remove();"
                            class="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg width="20" height="20" fill="currentColor" class="text-blue-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        <span class="text-xs text-gray-400">Facebook</span>
                    </button>

                    <button onclick="ShareManager.manualCopy(); this.closest('.fixed').remove();"
                            class="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg data-lucide="copy" width="20" height="20" class="text-purple-400"></svg>
                        <span class="text-xs text-gray-400">Copy</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        renderIcons();

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    shareToSocial(platform, title) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(title);

        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            reddit: `https://reddit.com/submit?url=${url}&title=${text}`
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    },

    manualCopy() {
        const input = document.getElementById('share-url-input');
        if (input) {
            input.select();
            document.execCommand('copy');
            showToast('Link copied!');
        }
    }
};

// Share button click handler
function shareStory(story) {
    ShareManager.shareStory(story);
}
```

**Update HTML - Reader Share Button (Line 486-497):**
```html
<button
    onclick="shareStory(currentStory)"
    class="p-2 text-white/60 hover:text-white active:scale-95 transition-all"
    aria-label="Share this story">
    <svg data-lucide="share-2" width="20" height="20"></svg>
</button>
```

**Update HTML - Feed Share Button (Line 769-774):**
```html
<button
    onclick="shareStory(${JSON.stringify(story).replace(/'/g, '&#39;')}); event.stopPropagation();"
    class="p-2 text-gray-400 hover:text-white active:scale-95 transition-all"
    aria-label="Share story">
    <svg data-lucide="share-2" width="16" height="16"></svg>
</button>
```

**Testing:**
- [ ] Native share works on mobile
- [ ] Clipboard fallback works on desktop
- [ ] Share modal appears if clipboard fails
- [ ] Social media links open correctly
- [ ] Toast notifications appear
- [ ] Modal closes on backdrop click

---

### 5. Fix Following Feed System

**Priority:** 🔴 CRITICAL
**Time:** 1 hour
**Location:** [index.html:920-938](index.html#L920-L938)

**Problem:** Following feed just randomly shuffles stories instead of filtering by follows

**Implementation:**

```javascript
// Follow system with localStorage
const FollowManager = {
    getFollows() {
        const saved = localStorage.getItem('prism-follows');
        return saved ? JSON.parse(saved) : { topics: [], sources: [] };
    },

    saveFollows(follows) {
        localStorage.setItem('prism-follows', JSON.stringify(follows));
    },

    followTopic(topic) {
        const follows = this.getFollows();
        if (!follows.topics.includes(topic)) {
            follows.topics.push(topic);
            this.saveFollows(follows);
        }
    },

    unfollowTopic(topic) {
        const follows = this.getFollows();
        follows.topics = follows.topics.filter(t => t !== topic);
        this.saveFollows(follows);
    },

    isFollowingTopic(topic) {
        return this.getFollows().topics.includes(topic);
    },

    toggleTopic(topic) {
        if (this.isFollowingTopic(topic)) {
            this.unfollowTopic(topic);
            return false;
        } else {
            this.followTopic(topic);
            return true;
        }
    },

    getFollowingFeed(allStories) {
        const follows = this.getFollows();

        if (follows.topics.length === 0) {
            // Return empty or show onboarding
            return [];
        }

        // Filter stories by followed topics
        return allStories.filter(story =>
            follows.topics.includes(story.category)
        );
    }
};

// Update switchHomeFeed function
function switchHomeFeed(type) {
    const buttons = document.querySelectorAll('.home-feed-btn');
    buttons.forEach(b => {
        b.classList.remove('text-white', 'border-white/20');
        b.classList.add('text-gray-400', 'border-transparent');
    });

    event.target.classList.remove('text-gray-400', 'border-transparent');
    event.target.classList.add('text-white', 'border-white/20');

    if (type === 'following') {
        const followingStories = FollowManager.getFollowingFeed(stories);

        if (followingStories.length === 0) {
            showFollowingEmptyState();
        } else {
            renderFeed(followingStories);
        }
    } else {
        renderFeed(stories);
    }
}

// Empty state for following feed
function showFollowingEmptyState() {
    const container = document.getElementById('feed-container');
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-[60vh] text-center px-6">
            <svg data-lucide="heart" class="w-16 h-16 text-purple-500/30 mb-4"></svg>
            <h3 class="text-xl font-semibold text-white mb-2">No Followed Topics Yet</h3>
            <p class="text-gray-400 text-sm mb-6 max-w-xs">
                Follow topics you're interested in to see personalized content here
            </p>
            <button
                onclick="switchTab('view-discover', this)"
                class="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white font-medium text-sm">
                Explore Topics
            </button>
        </div>
    `;
    renderIcons();
}

// Add follow button to category badges
function addFollowButtons() {
    // Add follow toggle to discover categories
    document.querySelectorAll('.category-badge').forEach(badge => {
        const category = badge.textContent;
        const isFollowing = FollowManager.isFollowingTopic(category);

        badge.classList.add('cursor-pointer', 'select-none');
        badge.onclick = (e) => {
            e.stopPropagation();
            const nowFollowing = FollowManager.toggleTopic(category);

            if (nowFollowing) {
                badge.classList.add('ring-2', 'ring-purple-500');
                showToast(`Following ${category}`);
            } else {
                badge.classList.remove('ring-2', 'ring-purple-500');
                showToast(`Unfollowed ${category}`);
            }
        };

        if (isFollowing) {
            badge.classList.add('ring-2', 'ring-purple-500');
        }
    });
}

// Initialize some default follows for demo purposes
function initializeDefaultFollows() {
    const follows = FollowManager.getFollows();
    if (follows.topics.length === 0) {
        // Add some starter follows
        ['Tech', 'Climate', 'Culture'].forEach(topic => {
            FollowManager.followTopic(topic);
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultFollows();
});
```

**Unhide the For You / Following tabs (Line 189-205):**
```html
<!-- Remove the 'hidden' class -->
<div class="flex gap-6 pointer-events-auto bg-black/20 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/5">
    <button onclick="switchHomeFeed('for-you')" class="home-feed-btn text-white border-b-2 border-white/20 pb-0.5 px-2 text-xs font-medium transition-all">For You</button>
    <button onclick="switchHomeFeed('following')" class="home-feed-btn text-gray-400 border-b-2 border-transparent pb-0.5 px-2 text-xs font-medium transition-all">Following</button>
</div>
```

**Testing:**
- [ ] Following feed shows only followed topics
- [ ] Empty state appears when no follows
- [ ] Can follow/unfollow by clicking category badges
- [ ] Follows persist after refresh
- [ ] Tab switching works
- [ ] Toast notifications appear

---

### 6. Add Unique Story Content

**Priority:** 🔴 CRITICAL
**Time:** 1 hour
**Location:** [index.html:516-541](index.html#L516-L541)

**Problem:** All stories show the same hardcoded article text

**Implementation:**

Add `body` field to each story in the stories array:

```javascript
const stories = [
    {
        title: "Climate Summit Reaches Historic Agreement",
        category: "Climate",
        time: "2h ago",
        image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6...",
        gradient: "from-emerald-600/20 to-green-900/40",
        source: "Global News",
        body: `
            <p>World leaders gathered in Geneva today to sign what experts are calling the most comprehensive climate agreement since the Paris Accords. The summit, which brought together representatives from 195 nations, concluded with unprecedented commitments to reduce carbon emissions and invest in renewable energy infrastructure.</p>

            <p>The agreement includes binding targets for developed nations to achieve net-zero emissions by 2040, a full decade earlier than previous commitments. Developing nations will receive $500 billion in climate finance over the next ten years to support their transition to clean energy.</p>

            <p>"This is a turning point in our fight against climate change," said UN Secretary-General António Guterres. "For the first time, we have universal agreement on both the urgency of the crisis and the concrete steps needed to address it."</p>

            <p>Key provisions of the agreement include a global carbon pricing mechanism, mandatory disclosure of corporate emissions, and the phase-out of coal power by 2035. Critics note that enforcement mechanisms remain weak, but supporters argue the universal buy-in represents significant progress.</p>

            <p>Climate activists gave the agreement cautious praise, with Greta Thunberg stating it's "a step in the right direction, but we must remain vigilant that words translate into action."</p>
        `,
        lensData: {
            // ... existing lens data ...
        }
    },
    {
        title: "New AI Model Breaks Language Barriers",
        category: "Tech",
        time: "4h ago",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995...",
        gradient: "from-blue-600/20 to-indigo-900/40",
        source: "Tech Daily",
        body: `
            <p>A breakthrough in artificial intelligence translation technology was unveiled today by researchers at MIT, promising to revolutionize global communication. The new model, called UniversalSpeak, can translate between 200 languages in real-time with unprecedented accuracy.</p>

            <p>Unlike previous translation systems, UniversalSpeak understands context, cultural nuances, and idiomatic expressions, making conversations feel natural rather than mechanical. The system was trained on trillions of multilingual conversations and can even detect and preserve tone and emotion across languages.</p>

            <p>"This isn't just about converting words," explained lead researcher Dr. Sarah Chen. "It's about preserving meaning, context, and cultural significance. We're breaking down language barriers in a way that respects and celebrates linguistic diversity."</p>

            <p>Early tests show 95% accuracy in professional contexts and 98% in casual conversation—numbers that far exceed current industry standards. The technology will be made available as an open-source API, allowing developers worldwide to integrate it into their applications.</p>

            <p>The announcement has sparked discussions about the future of human translators, though experts suggest the technology will augment rather than replace human expertise, particularly in literary and legal translation where nuance is critical.</p>
        `,
        lensData: {
            // ... existing lens data ...
        }
    },
    // Continue for all other stories...
];
```

**Update openStory function to use story.body:**

```javascript
function openStory(title) {
    const story = stories.find(s => s.title === title) ||
                  discoverItems.find(d => d.title === title) ||
                  stories[0];

    currentStory = story;

    const reader = document.getElementById('story-reader');
    const currentLens = document.querySelector('.lens-btn.active')?.dataset.lens || 'raw';
    const lensContent = story.lensData?.[currentLens] || { title: story.title, summary: "Content not available" };

    // Update title
    document.getElementById('reader-title').textContent = lensContent.title || story.title;

    // Update body content
    const bodyContainer = document.getElementById('reader-body');
    if (story.body) {
        bodyContainer.innerHTML = story.body;
    } else {
        // Fallback for discover items or stories without body
        bodyContainer.innerHTML = `
            <p class="text-gray-300 leading-relaxed">
                ${lensContent.summary || "Click the headline above to read the full story and analysis across different perspectives using the lens buttons below."}
            </p>
        `;
    }

    // Update meta
    document.getElementById('reader-category').textContent = story.category;
    document.getElementById('reader-time').textContent = story.time;
    document.getElementById('reader-source').textContent = story.source || 'Prism News';

    // Update image
    document.getElementById('reader-image').src = story.image;

    // Show reader
    reader.classList.remove('translate-y-full');
    reader.classList.add('translate-y-0');

    updateBookmarkButton(story.title);
}
```

**Testing:**
- [ ] Each story shows unique content
- [ ] Content is readable and properly formatted
- [ ] Fallback works for items without body
- [ ] No layout breaks with long content
- [ ] Images load correctly

---

## 🟡 HIGH PRIORITY FIXES (Week 2-3 - ~12 hours)

### 7. Add "Surprise Me" Button Functionality

**Priority:** 🟡 HIGH
**Time:** 30 minutes
**Location:** [index.html:232-234](index.html#L232-L234)

**Implementation:**

```javascript
function surpriseMe() {
    // Combine stories and discover items
    const allContent = [...stories, ...discoverItems];

    // Pick random item
    const randomItem = allContent[Math.floor(Math.random() * allContent.length)];

    // Visual feedback
    const btn = event.target;
    btn.classList.add('animate-pulse');

    setTimeout(() => {
        btn.classList.remove('animate-pulse');
        openStory(randomItem.title);
    }, 300);
}
```

**Update HTML:**
```html
<button
    onclick="surpriseMe()"
    class="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95 transition-transform flex items-center gap-1">
    <svg data-lucide="shuffle" width="12" height="12"></svg> Surprise Me
</button>
```

**Testing:**
- [ ] Opens random story
- [ ] Animation plays
- [ ] Works from any tab

---

### 8. Create Settings Panel

**Priority:** 🟡 HIGH
**Time:** 3 hours
**Location:** [index.html:289-297](index.html#L289-L297)

**Implementation:**

```javascript
// Settings management
const SettingsManager = {
    getSettings() {
        const defaults = {
            theme: 'dark',
            fontSize: 'medium',
            autoPlayVideos: false,
            showNotifications: true,
            reducedMotion: false,
            highContrast: false
        };

        const saved = localStorage.getItem('prism-settings');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    },

    saveSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        localStorage.setItem('prism-settings', JSON.stringify(settings));
        this.applySettings();
    },

    applySettings() {
        const settings = this.getSettings();

        // Apply font size
        document.documentElement.style.fontSize = {
            small: '14px',
            medium: '16px',
            large: '18px'
        }[settings.fontSize];

        // Apply reduced motion
        if (settings.reducedMotion) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }

        // Apply high contrast
        if (settings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }
};

// Settings modal
function openSettings() {
    const settings = SettingsManager.getSettings();

    const modal = document.createElement('div');
    modal.id = 'settings-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center';
    modal.innerHTML = `
        <div class="bg-gray-900 w-full md:max-w-md md:rounded-2xl rounded-t-2xl border-t md:border border-white/10 max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="sticky top-0 bg-gray-900 border-b border-white/10 p-4 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-white">Settings</h2>
                <button onclick="closeSettings()" class="text-gray-400 hover:text-white">
                    <svg data-lucide="x" width="24" height="24"></svg>
                </button>
            </div>

            <!-- Settings Content -->
            <div class="p-4 space-y-6">
                <!-- Appearance Section -->
                <section>
                    <h3 class="text-sm font-semibold text-white mb-3">Appearance</h3>

                    <!-- Font Size -->
                    <div class="mb-4">
                        <label class="text-sm text-gray-400 mb-2 block">Font Size</label>
                        <div class="flex gap-2">
                            ${['small', 'medium', 'large'].map(size => `
                                <button
                                    onclick="SettingsManager.saveSetting('fontSize', '${size}')"
                                    class="flex-1 py-2 px-3 rounded-lg border transition-all ${settings.fontSize === size ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-gray-700 bg-gray-800 text-gray-400'}"
                                >
                                    ${size.charAt(0).toUpperCase() + size.slice(1)}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- High Contrast -->
                    <div class="flex justify-between items-center py-3">
                        <div>
                            <p class="text-sm text-white">High Contrast</p>
                            <p class="text-xs text-gray-500">Increase text visibility</p>
                        </div>
                        <label class="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                ${settings.highContrast ? 'checked' : ''}
                                onchange="SettingsManager.saveSetting('highContrast', this.checked)"
                                class="sr-only peer">
                            <div class="w-full h-full bg-gray-700 peer-checked:bg-purple-500 rounded-full peer transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <!-- Reduced Motion -->
                    <div class="flex justify-between items-center py-3">
                        <div>
                            <p class="text-sm text-white">Reduced Motion</p>
                            <p class="text-xs text-gray-500">Minimize animations</p>
                        </div>
                        <label class="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                ${settings.reducedMotion ? 'checked' : ''}
                                onchange="SettingsManager.saveSetting('reducedMotion', this.checked)"
                                class="sr-only peer">
                            <div class="w-full h-full bg-gray-700 peer-checked:bg-purple-500 rounded-full peer transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                </section>

                <!-- Preferences Section -->
                <section>
                    <h3 class="text-sm font-semibold text-white mb-3">Preferences</h3>

                    <!-- Notifications -->
                    <div class="flex justify-between items-center py-3">
                        <div>
                            <p class="text-sm text-white">Notifications</p>
                            <p class="text-xs text-gray-500">Breaking news alerts</p>
                        </div>
                        <label class="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                ${settings.showNotifications ? 'checked' : ''}
                                onchange="SettingsManager.saveSetting('showNotifications', this.checked)"
                                class="sr-only peer">
                            <div class="w-full h-full bg-gray-700 peer-checked:bg-purple-500 rounded-full peer transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <!-- Auto-play Videos -->
                    <div class="flex justify-between items-center py-3">
                        <div>
                            <p class="text-sm text-white">Auto-play Videos</p>
                            <p class="text-xs text-gray-500">Play videos automatically</p>
                        </div>
                        <label class="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                ${settings.autoPlayVideos ? 'checked' : ''}
                                onchange="SettingsManager.saveSetting('autoPlayVideos', this.checked)"
                                class="sr-only peer">
                            <div class="w-full h-full bg-gray-700 peer-checked:bg-purple-500 rounded-full peer transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                </section>

                <!-- Data Section -->
                <section>
                    <h3 class="text-sm font-semibold text-white mb-3">Data</h3>

                    <button
                        onclick="clearAllData()"
                        class="w-full py-3 px-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors">
                        Clear All Data
                    </button>

                    <p class="text-xs text-gray-500 mt-2">This will remove all bookmarks, follows, and preferences</p>
                </section>

                <!-- About Section -->
                <section class="border-t border-white/10 pt-4">
                    <p class="text-xs text-gray-500 text-center">Prism App v1.0.0</p>
                    <p class="text-xs text-gray-600 text-center mt-1">UI Mockup Prototype</p>
                </section>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    renderIcons();

    // Close on backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSettings();
    });
}

function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.remove();
}

function clearAllData() {
    if (confirm('Are you sure? This will clear all bookmarks, follows, and settings.')) {
        localStorage.clear();
        showToast('All data cleared');
        closeSettings();
        location.reload();
    }
}

// Apply settings on load
document.addEventListener('DOMContentLoaded', () => {
    SettingsManager.applySettings();
});
```

**Add CSS for settings:**
```css
/* In <style> section */
.reduce-motion * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
}

.high-contrast {
    --tw-text-opacity: 1;
}

.high-contrast .text-gray-400 {
    color: rgb(209 213 219);
}

.high-contrast .text-gray-500 {
    color: rgb(156 163 175);
}
```

**Update HTML:**
```html
<button
    onclick="openSettings()"
    class="p-2 text-gray-400 hover:text-white transition-colors"
    aria-label="Open settings">
    <svg data-lucide="settings" width="20" height="20"></svg>
</button>
```

**Testing:**
- [ ] Settings modal opens
- [ ] All toggles work
- [ ] Settings persist
- [ ] Font size changes apply
- [ ] High contrast mode works
- [ ] Reduced motion works
- [ ] Clear data works

---

### 9. Improve Search Functionality

**Priority:** 🟡 HIGH
**Time:** 2 hours
**Location:** [index.html:244, 969](index.html#L244)

**Implementation:**

```javascript
// Advanced search system
const SearchManager = {
    searchHistory: [],

    init() {
        const saved = localStorage.getItem('prism-search-history');
        this.searchHistory = saved ? JSON.parse(saved) : [];
    },

    addToHistory(query) {
        if (query && !this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10); // Keep last 10
            localStorage.setItem('prism-search-history', JSON.stringify(this.searchHistory));
        }
    },

    clearHistory() {
        this.searchHistory = [];
        localStorage.removeItem('prism-search-history');
    },

    fuzzyMatch(text, query) {
        const textLower = text.toLowerCase();
        const queryLower = query.toLowerCase();

        // Exact match gets highest score
        if (textLower.includes(queryLower)) return 10;

        // Check for individual words
        const words = queryLower.split(' ');
        let score = 0;
        words.forEach(word => {
            if (textLower.includes(word)) score += 5;
        });

        return score;
    },

    search(query, items) {
        if (!query) return items;

        const results = items.map(item => {
            const titleScore = this.fuzzyMatch(item.title, query);
            const categoryScore = this.fuzzyMatch(item.category, query) * 0.5;
            const descScore = item.description ? this.fuzzyMatch(item.description, query) * 0.3 : 0;

            return {
                item,
                score: titleScore + categoryScore + descScore
            };
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.item);

        this.addToHistory(query);
        return results;
    }
};

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Search with debouncing
const debouncedSearch = debounce((query, category) => {
    renderDiscover(category, query);
}, 300);

// Update search input handler
function setupSearchListeners() {
    const searchInput = document.getElementById('discover-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            const currentCategory = document.querySelector('.category-btn.active')?.dataset.category || 'All';
            debouncedSearch(query, currentCategory);
        });

        // Show search history on focus
        searchInput.addEventListener('focus', () => {
            if (!searchInput.value && SearchManager.searchHistory.length > 0) {
                showSearchHistory();
            }
        });
    }
}

// Search history dropdown
function showSearchHistory() {
    const existing = document.getElementById('search-history');
    if (existing) existing.remove();

    const searchInput = document.getElementById('discover-search-input');
    const history = SearchManager.searchHistory;

    if (history.length === 0) return;

    const dropdown = document.createElement('div');
    dropdown.id = 'search-history';
    dropdown.className = 'absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-white/10 rounded-lg overflow-hidden z-10';
    dropdown.innerHTML = `
        <div class="p-2 border-b border-white/10 flex justify-between items-center">
            <span class="text-xs text-gray-400">Recent Searches</span>
            <button onclick="SearchManager.clearHistory(); document.getElementById('search-history').remove();"
                    class="text-xs text-purple-500 hover:text-purple-400">
                Clear
            </button>
        </div>
        ${history.map(query => `
            <button
                onclick="document.getElementById('discover-search-input').value = '${query}'; renderDiscover('All', '${query}'); document.getElementById('search-history').remove();"
                class="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                <svg data-lucide="clock" width="14" height="14" class="text-gray-500"></svg>
                ${query}
            </button>
        `).join('')}
    `;

    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(dropdown);
    renderIcons();

    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', function closeHistory(e) {
            if (!dropdown.contains(e.target) && e.target !== searchInput) {
                dropdown.remove();
                document.removeEventListener('click', closeHistory);
            }
        });
    }, 100);
}

// Update renderDiscover to use SearchManager
function renderDiscover(filter = 'All', searchQuery = '') {
    const input = searchQuery || document.getElementById('discover-search-input').value.toLowerCase();
    const container = document.getElementById('discover-grid');

    // Use SearchManager for better search
    let items = discoverItems;

    // Filter by category first
    if (filter !== 'All') {
        items = items.filter(item => item.category === filter);
    }

    // Then search
    if (input) {
        items = SearchManager.search(input, items);
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <svg data-lucide="search-x" class="w-16 h-16 text-gray-700 mx-auto mb-3"></svg>
                <p class="text-gray-500 text-sm">No results found for "${input}"</p>
                <button
                    onclick="document.getElementById('discover-search-input').value = ''; renderDiscover();"
                    class="mt-4 text-purple-500 text-sm hover:text-purple-400">
                    Clear search
                </button>
            </div>
        `;
        renderIcons();
        return;
    }

    // ... rest of existing render code ...
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    SearchManager.init();
    setupSearchListeners();
});
```

**Testing:**
- [ ] Search is debounced (doesn't lag)
- [ ] Fuzzy matching works
- [ ] Search history appears
- [ ] Can clear history
- [ ] Empty state shows properly
- [ ] Search works across all content

---

### 10. Add Keyboard Navigation

**Priority:** 🟡 HIGH
**Time:** 3 hours
**Location:** Throughout app

**Implementation:**

```javascript
// Keyboard navigation system
const KeyboardNav = {
    init() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    },

    handleKeyPress(e) {
        // Don't interfere with input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            // Escape should blur input
            if (e.key === 'Escape') {
                e.target.blur();
            }
            return;
        }

        switch(e.key) {
            case 'Escape':
                this.handleEscape();
                break;
            case 'ArrowLeft':
                this.handleLeft(e);
                break;
            case 'ArrowRight':
                this.handleRight(e);
                break;
            case 'ArrowUp':
                this.handleUp(e);
                break;
            case 'ArrowDown':
                this.handleDown(e);
                break;
            case 'Enter':
            case ' ':
                this.handleActivate(e);
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                this.handleTabShortcut(e.key);
                break;
            case 'l':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.cycleLens();
                }
                break;
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.focusSearch();
                }
                break;
        }
    },

    handleEscape() {
        // Close reader if open
        const reader = document.getElementById('story-reader');
        if (reader && !reader.classList.contains('translate-y-full')) {
            closeReader();
            return;
        }

        // Close context overlay
        const context = document.getElementById('ai-context-overlay');
        if (context && !context.classList.contains('translate-x-full')) {
            closeContextOverlay();
            return;
        }

        // Close settings
        const settings = document.getElementById('settings-modal');
        if (settings) {
            closeSettings();
            return;
        }

        // Close any other modals
        document.querySelectorAll('.fixed.z-50').forEach(modal => modal.remove());
    },

    handleLeft(e) {
        // In reader, cycle lens left
        if (this.isReaderOpen()) {
            e.preventDefault();
            this.cycleLens(-1);
        }
    },

    handleRight(e) {
        // In reader, cycle lens right
        if (this.isReaderOpen()) {
            e.preventDefault();
            this.cycleLens(1);
        }
    },

    handleUp(e) {
        // Scroll up in feed
        if (!this.isReaderOpen()) {
            e.preventDefault();
            window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        }
    },

    handleDown(e) {
        // Scroll down in feed
        if (!this.isReaderOpen()) {
            e.preventDefault();
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
    },

    handleActivate(e) {
        // Activate focused element
        const focused = document.activeElement;
        if (focused && focused.tagName === 'BUTTON') {
            e.preventDefault();
            focused.click();
        }
    },

    handleTabShortcut(key) {
        const tabMap = {
            '1': 'view-home',
            '2': 'view-discover',
            '3': 'view-profile',
            '4': 'view-notifications'
        };

        const tabId = tabMap[key];
        if (tabId) {
            const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
            if (tabBtn) {
                switchTab(tabId, tabBtn);
            }
        }
    },

    cycleLens(direction = 1) {
        const lenses = ['raw', 'explained', 'debunked', 'quick', 'deep'];
        const currentBtn = document.querySelector('.lens-btn.active');
        const currentLens = currentBtn?.dataset.lens || 'raw';
        const currentIndex = lenses.indexOf(currentLens);
        const nextIndex = (currentIndex + direction + lenses.length) % lenses.length;
        const nextLens = lenses[nextIndex];

        const nextBtn = document.querySelector(`.lens-btn[data-lens="${nextLens}"]`);
        if (nextBtn) {
            nextBtn.click();
            nextBtn.focus();
        }
    },

    focusSearch() {
        const searchInput = document.getElementById('discover-search-input');
        if (searchInput) {
            // Switch to discover tab if needed
            const discoverTab = document.querySelector('[data-tab="view-discover"]');
            if (discoverTab && !discoverTab.classList.contains('active')) {
                switchTab('view-discover', discoverTab);
            }

            setTimeout(() => {
                searchInput.focus();
                searchInput.select();
            }, 100);
        }
    },

    isReaderOpen() {
        const reader = document.getElementById('story-reader');
        return reader && !reader.classList.contains('translate-y-full');
    }
};

// Initialize keyboard nav
document.addEventListener('DOMContentLoaded', () => {
    KeyboardNav.init();
});

// Show keyboard shortcuts help
function showKeyboardHelp() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                    <svg data-lucide="x" width="20" height="20"></svg>
                </button>
            </div>

            <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-400">Switch tabs</span>
                    <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">1-4</kbd>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Search</span>
                    <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">⌘/Ctrl + S</kbd>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Close modal</span>
                    <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">Esc</kbd>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Scroll feed</span>
                    <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">↑ ↓</kbd>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Cycle lens (in reader)</span>
                    <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">← →</kbd>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Change lens</span>
                    <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">⌘/Ctrl + L</kbd>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    renderIcons();

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}
```

**Add help button to header:**
```html
<button
    onclick="showKeyboardHelp()"
    class="p-2 text-gray-400 hover:text-white transition-colors"
    aria-label="Keyboard shortcuts"
    title="Keyboard shortcuts">
    <svg data-lucide="keyboard" width="20" height="20"></svg>
</button>
```

**Testing:**
- [ ] Escape closes modals
- [ ] Arrow keys navigate
- [ ] Number keys switch tabs
- [ ] Ctrl/Cmd+S focuses search
- [ ] Ctrl/Cmd+L cycles lens
- [ ] Enter activates buttons
- [ ] Help modal shows shortcuts

---

### 11. Add Focus Indicators

**Priority:** 🟡 HIGH
**Time:** 1 hour
**Location:** Throughout (CSS)

**Implementation:**

Add to `<style>` section:

```css
/* Focus indicators for keyboard navigation */
*:focus {
    outline: none;
}

*:focus-visible {
    outline: 2px solid #a78bfa;
    outline-offset: 2px;
    border-radius: 4px;
}

button:focus-visible,
a:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
}

input:focus-visible,
textarea:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 0;
    border-color: #8b5cf6;
}

.lens-btn:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
    transform: scale(1.05);
}

.tab-btn:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: -2px;
}

/* High contrast mode adjustments */
.high-contrast *:focus-visible {
    outline-width: 3px;
    outline-color: #fbbf24;
}

/* Skip to content link */
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #8b5cf6;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 0 0 8px 0;
    z-index: 100;
    transition: top 0.3s;
}

.skip-link:focus {
    top: 0;
}
```

**Add skip link to HTML (after opening `<body>`):**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**Add id to main content area:**
```html
<div id="main-content" class="relative z-10 pointer-events-none h-screen overflow-hidden">
```

**Testing:**
- [ ] Tab key shows focus indicators
- [ ] Focus visible on all interactive elements
- [ ] High contrast mode enhances focus
- [ ] Skip link appears on Tab
- [ ] Focus doesn't show on mouse click

---

_(Continue with remaining fixes in similar detailed format...)_

---

## 🟢 MEDIUM PRIORITY FIXES (Week 4 - ~15 hours)

### 12. Like Button Persistence
### 13. Category Filter Visual States
### 14. Complete Lens Data
### 15. Expand AI Context Data
### 16. Loading States
### 17. Error States
### 18. Empty States
### 19. Related Coverage Links
### 20. Trending Pulse Interaction

---

## ⚪ LOW PRIORITY ENHANCEMENTS

### 21. Profile Picture Upload
### 22. Profile Stats Interaction
### 23. Broken Image Handling
### 24. Animation Performance
### 25. Touch Target Sizes
### 26. Color Contrast Improvements
### 27. Icon Rendering Reliability

---

## Quick Reference Checklist

### Critical (Do First)
- [ ] Remove user-scalable=no
- [ ] Fix XSS in onclick handlers
- [ ] Implement bookmarks
- [ ] Implement share
- [ ] Fix following feed
- [ ] Add unique story content

### High Priority (Do Next)
- [ ] "Surprise Me" button
- [ ] Settings panel
- [ ] Improve search
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] For You/Following tabs
- [ ] Like persistence
- [ ] Category filter states

### Polish (Do Later)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Related links
- [ ] Trending interaction
- [ ] Profile features
- [ ] Visual improvements

---

## Testing Strategy

### Manual Testing
1. **Functionality**: Click every button, test every feature
2. **Keyboard**: Navigate entire app without mouse
3. **Mobile**: Test on actual mobile devices
4. **Refresh**: Ensure data persists across refreshes
5. **Edge Cases**: Test with no data, lots of data, special characters

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Testing
- [ ] Keyboard-only navigation
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] 200% zoom
- [ ] High contrast mode
- [ ] Reduced motion

---

## Success Metrics

✅ **All 27 issues fixed**
✅ **No console errors**
✅ **Data persists across refreshes**
✅ **Keyboard navigation works**
✅ **Mobile responsive**
✅ **WCAG 2.1 AA compliant**
✅ **Smooth, polished UX**

---

**Document Version:** 1.0
**Last Updated:** November 21, 2025
**Estimated Total Time:** 36 hours
**Status:** Ready for implementation
