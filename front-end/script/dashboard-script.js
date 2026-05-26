/* ════════════════════════════════════════
   DASHBOARD SCRIPT — MobiLeasePH
════════════════════════════════════════ */

/* ── GLOBAL: must be outside DOMContentLoaded so onclick="" in HTML can reach it ── */

/**
 * Called by the "Book Now" buttons on the dashboard car cards.
 * Stores the target car ID in localStorage, then navigates to browse.html.
 * browse-script.js reads this on load and opens the booking form automatically.
 */
function bookFromDashboard(carId) {
    localStorage.setItem('deepLinkCarId', carId);
    window.location.href = 'browse.html';
}

/* ════════════════════════════════════════
   SET TO true  → banner hidden  (account verified)
   SET TO false → banner visible (account NOT verified)
════════════════════════════════════════ */
const IS_ACCOUNT_VERIFIED = true;

document.addEventListener('DOMContentLoaded', () => {

    /* 1. MOBILE SIDEBAR TOGGLE */
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn  = document.getElementById('mobileMenuBtn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('show');
        });
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
        });
    }

    /* 2. LOGOUT BUTTON */
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                window.location.href = 'SignIn.html';
            }
        });
    }

    /* 3. VERIFICATION BANNER
         IS_ACCOUNT_VERIFIED = false  → show yellow banner
         IS_ACCOUNT_VERIFIED = true   → hide yellow banner               */
    const banner = document.getElementById('verificationBanner');
    if (banner) {
        banner.style.display = IS_ACCOUNT_VERIFIED ? 'none' : 'flex';
    }

});

document.addEventListener('DOMContentLoaded', () => {
    const stats = window.MOBILEASE.getStats();
    const bookings = window.MOBILEASE.bookings;

    /* Stats */
    document.getElementById('dashStatsContainer').innerHTML = `
        <a href="reports.html" class="stat-card stat-card-link">
            <div class="stat-icon icon-blue"><i class="bi bi-calendar-event"></i></div>
            <div class="stat-info"><span class="stat-label">Total Trips</span><span class="stat-value">${bookings.length}</span></div>
        </a>
        <a href="reports.html" class="stat-card stat-card-link">
            <div class="stat-icon icon-gold"><i class="bi bi-credit-card"></i></div>
            <div class="stat-info"><span class="stat-label">Total Spending</span><span class="stat-value">₱${stats.totalSpent.toLocaleString()}</span></div>
        </a>`;

    /* Bookings shortlist — show last 4, most recent first */
    const statusStyles = {
        confirmed: 'background:#e2f7ed;color:#10b981;',
        pending:   'background:#fff3cd;color:#856404;',
        completed: 'background:#f1f5f9;color:#64748b;',
        cancelled: 'background:#fee2e2;color:#dc2626;'
    };
    const display = bookings.slice(0, 3);
    document.getElementById('dashBookingsList').innerHTML = display.map((b, i) => {
        const borderStyle = i < display.length - 1 ? 'border-bottom:1px solid #f1f5f9;padding-bottom:14px;margin-bottom:4px;' : '';
        const driveLabel = b.driveType === 'driver' ? 'With Driver' : 'Self-Drive';
        const label = b.status.charAt(0).toUpperCase() + b.status.slice(1);
        return `
        <a href="booking.html#booking-${b.id}" class="booking-item booking-item--link" style="${borderStyle}text-decoration:none;">
            <div class="booking-text-details">
                <span class="car-name">${b.vehicle}</span>
                <span class="booking-date">${b.startDisplay} — ${b.endDisplay} &nbsp;·&nbsp; ${b.location} &nbsp;·&nbsp; ${driveLabel}</span>
            </div>
            <span class="status-badge" style="${statusStyles[b.status]}padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;">${label}</span>
        </a>`;
    }).join('');
});