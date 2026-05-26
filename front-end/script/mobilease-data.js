/* ════════════════════════════════════════
   MobiLeasePH — Shared Data Store
   Single source of truth for all pages
════════════════════════════════════════ */

window.MOBILEASE = window.MOBILEASE || {};

/* ── BOOKINGS ── */
window.MOBILEASE.bookings = [
    {
        id: '#B004',
        vehicle: 'Honda Jazz 2022',
        image: 'pictures/jazz.jpg',
        fallback: 'https://placehold.co/150x110/1e5a6e/fff?text=Jazz',
        location: 'Mandaluyong City',
        startDate: '2026-03-05',
        endDate: '2026-03-06',
        startDisplay: 'Mar 5, 2026',
        endDisplay: 'Mar 6, 2026',
        duration: '1 day',
        pickupTime: '10:00 AM',
        dropoffTime: '10:00 AM',
        amount: '₱2,200',
        amountRaw: 2200,
        owner: 'Rosario Fajardo',
        driveType: 'self',
        addons: [],
        status: 'cancelled',
        cancelReason: 'Personal emergency — trip cancelled by renter',
        contractLink: 'contracts.html',
        dataDate: '2026-03-05'
    },
    {
        id: '#B003',
        vehicle: 'Toyota Fortuner 2023',
        image: 'pictures/fortuner.jpg',
        fallback: 'https://placehold.co/150x110/1e5a6e/fff?text=Fortuner',
        location: 'Makati City',
        startDate: '2026-05-15',
        endDate: '2026-05-18',
        startDisplay: 'May 15, 2026',
        endDisplay: 'May 18, 2026',
        duration: '3 days',
        pickupTime: '8:00 AM',
        dropoffTime: '8:00 AM',
        amount: '₱13,800',
        amountRaw: 13800,
        owner: 'Maria Cherry Cortez',
        driveType: 'driver',
        driverName: 'Ricardo Cruz',
        addons: ['Pocket WiFi', 'GPS'],
        status: 'confirmed',
        cancelReason: null,
        contractLink: 'contracts.html',
        dataDate: '2026-05-15'
    },
    {
        id: '#B002',
        vehicle: 'Mitsubishi Xpander 2024',
        image: 'pictures/xpander.png',
        fallback: 'https://placehold.co/150x110/1e5a6e/fff?text=Xpander',
        location: 'Pasig City',
        startDate: '2026-04-12',
        endDate: '2026-04-14',
        startDisplay: 'Apr 12, 2026',
        endDisplay: 'Apr 14, 2026',
        duration: '2 days',
        pickupTime: '9:00 AM',
        dropoffTime: '9:00 AM',
        amount: '₱7,600',
        amountRaw: 7600,
        owner: 'Tanggol Dimagiba',
        driveType: 'self',
        addons: ['Travel Cooler'],
        status: 'pending',
        cancelReason: null,
        contractLink: 'contracts.html',
        dataDate: '2026-04-12'
    },
    {
        id: '#B001',
        vehicle: 'Toyota Vios 2024',
        image: 'pictures/vios.jpg',
        fallback: 'https://placehold.co/150x110/1e5a6e/fff?text=Vios',
        location: 'Makati City',
        startDate: '2026-04-10',
        endDate: '2026-04-11',
        startDisplay: 'Apr 10, 2026',
        endDisplay: 'Apr 11, 2026',
        duration: '1 day',
        pickupTime: '8:00 AM',
        dropoffTime: '8:00 AM',
        amount: '₱1,800',
        amountRaw: 1800,
        owner: 'Juan Dela Cruz',
        driveType: 'driver',
        driverName: 'Ricardo Cruz',
        addons: [],
        status: 'completed',
        feedbackSubmitted: false,
        cancelReason: null,
        contractLink: 'contracts.html',
        dataDate: '2026-04-10'
    }
];

/* ── FEEDBACK (trips awaiting feedback = completed & feedbackSubmitted=false) ── */
window.MOBILEASE.getFeedbackPending = function () {
    return window.MOBILEASE.bookings.filter(b => b.status === 'completed' && !b.feedbackSubmitted);
};

/* ── STATS computed from bookings ── */
window.MOBILEASE.getStats = function () {
    const b = window.MOBILEASE.bookings;
    const completed  = b.filter(x => x.status === 'completed');
    const cancelled  = b.filter(x => x.status === 'cancelled');
    const active     = b.filter(x => x.status === 'confirmed');
    const pending    = b.filter(x => x.status === 'pending');
    const totalSpent = completed.reduce((s, x) => s + x.amountRaw, 0)
                     + active.reduce((s, x) => s + x.amountRaw, 0);
    return { total: b.length, completed, cancelled, active, pending, totalSpent };
};

/* ── Mark feedback submitted (in-session only) ── */
window.MOBILEASE.markFeedbackDone = function (bookingId) {
    const b = window.MOBILEASE.bookings.find(x => x.id === bookingId);
    if (b) b.feedbackSubmitted = true;
};