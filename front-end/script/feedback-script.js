/* ════════════════════════════════════════
   FEEDBACK PAGE — COMPLETE JAVASCRIPT
   MobiLeasePH | feedback-script.js
════════════════════════════════════════ */

'use strict';

// ── Rating Labels ──
const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
};

// ── Vehicle Feedback Scores ──
const feedbackScores = {
    overall:       0,
    condition:     0,
    cleanliness:   0,
    accuracy:      0,
    communication: 0
};

// ── Driver Score (only used when not self-drive) ──
let driverScore = 0;

// ── Session Tracking (for empty state) ──
let totalReviewsSubmitted = 0;
let allRatingsGiven       = [];

// ── Current Trip ──
let currentTripData = {
    carName:    '',
    dates:      '',
    duration:   '',
    location:   '',
    isSelfDrive: false,
    driverName:  ''
};

// ════════════════════════════════════════
//  HELPERS — INITIALS
// ════════════════════════════════════════
function getInitials(name) {
    if (!name) return '--';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// ════════════════════════════════════════
//  VIEW NAVIGATION
// ════════════════════════════════════════

/**
 * Shows the feedback form and populates trip data.
 * @param {boolean} isSelfDrive - true = self-drive, false = with driver
 * @param {string}  driverName  - driver's full name (empty string if self-drive)
 */
function showFeedbackForm(carName, dates, duration, imageSrc, location, isSelfDrive, driverName) {
    currentTripData = { carName, dates, duration, location, isSelfDrive, driverName };

    // Populate trip info
    document.getElementById('displayCarName').textContent  = carName;
    document.getElementById('displayTripMeta').innerHTML   =
        `${dates} &bull; ${duration} &bull; ${location}`;

    // Toggle driver section vs self-drive notice
    const driverSection   = document.getElementById('driverSection');
    const selfDriveNotice = document.getElementById('selfDriveNotice');

    if (isSelfDrive) {
        driverSection.classList.add('hidden');
        selfDriveNotice.classList.add('visible');
    } else {
        driverSection.classList.remove('hidden');
        selfDriveNotice.classList.remove('visible');
        // Set driver name + avatar initials
        document.getElementById('driverNameDisplay').textContent = driverName || 'Assigned Driver';
        document.getElementById('driverAvatarSm').textContent    = getInitials(driverName);
    }

    resetFeedbackForm();

    document.getElementById('tripSelectionView').style.display  = 'none';
    document.getElementById('feedbackFormView').style.display   = 'flex';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Returns to trip selection view.
 */
function hideFeedbackForm() {
    document.getElementById('feedbackFormView').style.display  = 'none';
    document.getElementById('tripSelectionView').style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Shows the empty state when no trips remain.
 */
function showEmptyState() {
    document.getElementById('tripSelectionView').style.display  = 'none';
    document.getElementById('feedbackFormView').style.display   = 'none';

    // Update stats
    document.getElementById('totalReviewedCount').textContent = totalReviewsSubmitted;

    if (allRatingsGiven.length > 0) {
        const flat = allRatingsGiven.flat();
        const avg  = flat.reduce((a, b) => a + b, 0) / flat.length;
        document.getElementById('avgRatingDisplay').textContent = avg.toFixed(1);
    } else {
        document.getElementById('avgRatingDisplay').textContent = '--';
    }

    // Re-trigger animation
    const emptyView = document.getElementById('emptyStateView');
    emptyView.style.display = 'none';
    void emptyView.offsetWidth;
    emptyView.style.display = 'flex';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ════════════════════════════════════════
//  FORM RESET
// ════════════════════════════════════════

function resetFeedbackForm() {
    // Reset vehicle scores
    Object.keys(feedbackScores).forEach(key => feedbackScores[key] = 0);
    driverScore = 0;

    // Reset all star groups (vehicle + driver)
    document.querySelectorAll('.star-rating').forEach(group => {
        const category = group.dataset.category;
        highlightStars(group.querySelectorAll('i'), 0);

        const label = document.getElementById(`ratingLabel-${category}`);
        if (label) {
            label.textContent = 'Not rated';
            label.classList.remove('rated');
        }
    });

    // Reset textareas
    document.getElementById('reviewText').value       = '';
    document.getElementById('driverReviewText').value = '';
    updateCharCount();
    updateDriverCharCount();

    document.getElementById('submitBtn').disabled = true;

    const hint = document.getElementById('progressHint');
    hint.classList.remove('complete');
    hint.innerHTML = '<i class="bi bi-info-circle"></i> Rate all categories and write a review to submit.';
}

// ════════════════════════════════════════
//  STAR RATING INTERACTIVITY
// ════════════════════════════════════════

document.querySelectorAll('.star-rating').forEach(group => {
    const category = group.dataset.category;
    const stars     = group.querySelectorAll('i');

    stars.forEach((star, index) => {
        const val = index + 1;

        star.addEventListener('mouseenter', () => highlightStars(stars, val));

        group.addEventListener('mouseleave', () => {
            const current = category === 'driver'
                ? driverScore
                : feedbackScores[category];
            highlightStars(stars, current);
        });

        star.addEventListener('click', () => {
            if (category === 'driver') {
                driverScore = val;
            } else {
                feedbackScores[category] = val;
            }
            highlightStars(stars, val);
            updateRatingLabel(category, val);
            checkValidity();
        });
    });
});

function highlightStars(stars, value) {
    stars.forEach((s, i) => {
        if (i < value) {
            s.className = s.className.replace('bi-star', 'bi-star-fill');
            if (!s.classList.contains('bi-star-fill')) {
                s.classList.remove('bi-star');
                s.classList.add('bi-star-fill');
            }
            s.classList.add('active');
        } else {
            s.classList.remove('bi-star-fill');
            s.classList.add('bi-star');
            s.classList.remove('active');
        }
    });
}

function updateRatingLabel(category, value) {
    const label = document.getElementById(`ratingLabel-${category}`);
    if (!label) return;
    if (value > 0) {
        label.textContent = `${value}/5 — ${ratingLabels[value]}`;
        label.classList.add('rated');
    } else {
        label.textContent = 'Not rated';
        label.classList.remove('rated');
    }
}

// ════════════════════════════════════════
//  CHARACTER COUNTERS
// ════════════════════════════════════════

function updateCharCount() {
    const reviewText = document.getElementById('reviewText');
    const charCount  = document.getElementById('charCount');
    const charMin    = document.getElementById('charMin');
    const len        = reviewText.value.trim().length;

    charCount.textContent = reviewText.value.length;

    if (len >= 10) {
        charMin.style.color = '#028a5d';
        charMin.textContent = '(minimum met)';
    } else {
        charMin.style.color = '#94a3b8';
        charMin.textContent = `(minimum 10 chars — ${10 - len} more needed)`;
    }
}

function updateDriverCharCount() {
    const el = document.getElementById('driverReviewText');
    document.getElementById('driverCharCount').textContent = el.value.length;
}

document.getElementById('reviewText').addEventListener('input', () => {
    updateCharCount();
    checkValidity();
});

document.getElementById('driverReviewText').addEventListener('input', () => {
    updateDriverCharCount();
});

// ════════════════════════════════════════
//  VALIDATION
// ════════════════════════════════════════

function checkValidity() {
    const allVehicleRated = Object.values(feedbackScores).every(s => s > 0);

    // Driver rating required only if not self-drive
    const driverRated = currentTripData.isSelfDrive ? true : driverScore > 0;

    const textValid = document.getElementById('reviewText').value.trim().length >= 10;
    const isReady   = allVehicleRated && driverRated && textValid;

    document.getElementById('submitBtn').disabled = !isReady;

    const hint       = document.getElementById('progressHint');
    const ratedCount = Object.values(feedbackScores).filter(s => s > 0).length;
    const remaining  = 5 - ratedCount;

    if (isReady) {
        hint.classList.add('complete');
        hint.innerHTML = '<i class="bi bi-check-circle-fill"></i> All done! You can now submit your feedback.';
        return;
    }

    hint.classList.remove('complete');

    const issues = [];
    if (remaining > 0) {
        issues.push(`${remaining} vehicle rating${remaining > 1 ? 's' : ''} needed`);
    }
    if (!currentTripData.isSelfDrive && !driverRated) {
        issues.push('driver rating needed');
    }
    if (!textValid) {
        const needed = 10 - document.getElementById('reviewText').value.trim().length;
        issues.push(`${needed} more character${needed > 1 ? 's' : ''} in your review`);
    }

    hint.innerHTML = `<i class="bi bi-info-circle"></i> ${issues.join(' &bull; ')}.`;
}

// ════════════════════════════════════════
//  FORM SUBMISSION
// ════════════════════════════════════════

document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('successCarName').textContent = currentTripData.carName;
    buildSuccessSummary();
    buildSuccessDriverSummary();

    document.getElementById('successOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
});

function buildSuccessSummary() {
    const summaryEl = document.getElementById('successSummary');
    const categoryNames = {
        overall:       'Overall',
        condition:     'Condition',
        cleanliness:   'Cleanliness',
        accuracy:      'Accuracy',
        communication: 'Comm.'
    };

    summaryEl.innerHTML = Object.entries(feedbackScores).map(([key, val]) => `
        <div class="summary-star-group">
            <span class="summary-star-val">
                ${val}<i class="bi bi-star-fill summary-star-icon"></i>
            </span>
            <span>${categoryNames[key]}</span>
        </div>
    `).join('');
}

function buildSuccessDriverSummary() {
    const el = document.getElementById('successDriverSummary');

    if (currentTripData.isSelfDrive) {
        el.classList.remove('visible');
        return;
    }

    const driverComment = document.getElementById('driverReviewText').value.trim();
    const textEl        = document.getElementById('successDriverText');

    textEl.innerHTML = `
        <span style="font-weight:700; color:#1e293b;">${currentTripData.driverName}</span>
        &mdash; ${driverScore}/5 ${ratingLabels[driverScore]}
        ${driverComment ? `<br><em style="color:#475569;">"${driverComment}"</em>` : ''}
    `;

    el.classList.add('visible');
}

/**
 * Called when user confirms the success modal.
 */
function finishFeedback() {
    document.getElementById('successOverlay').classList.remove('show');
    document.body.style.overflow = '';

    // Track stats — include driver score in average if applicable
    totalReviewsSubmitted++;
    const scores = Object.values(feedbackScores);
    if (!currentTripData.isSelfDrive && driverScore > 0) {
        scores.push(driverScore);
    }
    allRatingsGiven.push(scores);

    removeReviewedTrip();

    setTimeout(() => {
        const remaining = document.querySelectorAll('#tripSelectionView .selectable-trip-card');
        if (remaining.length === 0) {
            showEmptyState();
        } else {
            hideFeedbackForm();
        }
    }, 450);
}

/**
 * Fades out and removes the reviewed trip card.
 */
function removeReviewedTrip() {
    document.querySelectorAll('.selectable-trip-card').forEach(card => {
        const nameEl = card.querySelector('.card-car-name');
        if (nameEl && nameEl.textContent.trim() === currentTripData.carName) {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity    = '0';
            card.style.transform  = 'translateX(-24px)';
            setTimeout(() => card.remove(), 420);
        }
    });
}

// ════════════════════════════════════════
//  MOBILE SIDEBAR
// ════════════════════════════════════════

const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// ════════════════════════════════════════
//  KEYBOARD ACCESSIBILITY
// ════════════════════════════════════════

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('successOverlay');
        if (overlay && overlay.classList.contains('show')) {
            finishFeedback();
        }
    }
});