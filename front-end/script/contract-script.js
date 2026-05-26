
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
/* ═══════════════════════════════════
   CONTRACT DATA
═══════════════════════════════════ */
const contracts = {
    C001: {
        ref: '#C001', booking: '#B001',
        vehicle: 'Toyota Vios 2024', owner: 'Juan Dela Cruz',
        renter: 'Maria Santos', driver: 'With Driver — Ricardo Cruz',
        period: 'Apr 10, 2026 → Apr 11, 2026', duration: '1 day',
        pickup: 'Makati City', dropoff: 'Makati City',
        amount: '₱1,800', downpay: '₱540', balance: '₱1,260',
        status: 'Signed', statusColor: '#16a34a',
        issued: 'Apr 9, 2026'
    },
    C002: {
        ref: '#C002', booking: '#B002',
        vehicle: 'Mitsubishi Xpander 2024', owner: 'Tanggol Dimagiba',
        renter: 'Maria Santos', driver: 'Self-Drive',
        period: 'Apr 12, 2026 → Apr 14, 2026', duration: '2 days',
        pickup: 'Pasig City', dropoff: 'Pasig City',
        amount: '₱7,600', downpay: '₱2,280', balance: '₱5,320',
        status: 'Pending Signature', statusColor: '#f59e0b',
        issued: 'Apr 11, 2026'
    },
    C003: {
        ref: '#C003', booking: '#B003',
        vehicle: 'Toyota Fortuner 2023', owner: 'Maria Cherry Cortez',
        renter: 'Maria Santos', driver: 'With Driver — Ricardo Cruz',
        period: 'May 15, 2026 → May 18, 2026', duration: '3 days',
        pickup: 'Makati City', dropoff: 'Makati City',
        amount: '₱13,800', downpay: '₱4,140', balance: '₱9,660',
        status: 'Awaiting Review', statusColor: '#0ea5e9',
        issued: 'May 14, 2026'
    }
};

/* ── View Modal ── */
function openViewModal(id) {
    const c = contracts[id];
    document.getElementById('viewModalTitle').textContent = `Contract ${c.ref} — ${c.vehicle}`;
    document.getElementById('viewModalBody').innerHTML = `
        <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;font-size:.8rem;font-weight:700;color:#fff;background:${c.statusColor};margin-bottom:18px;">
            <i class="bi bi-circle-fill" style="font-size:.45rem;"></i> ${c.status}
        </div>
        ${row('Contract Reference', c.ref)}
        ${row('Booking Reference', c.booking)}
        ${row('Date Issued', c.issued)}
        ${row('Renter', c.renter)}
        ${row('Vehicle Owner', c.owner)}
        ${row('Vehicle', c.vehicle)}
        ${row('Driver Option', c.driver)}
        ${row('Rental Period', c.period)}
        ${row('Duration', c.duration)}
        ${row('Pick-up Location', c.pickup)}
        ${row('Drop-off Location', c.dropoff)}
        ${row('Total Rental Amount', `<strong style="color:var(--primary);">${c.amount}</strong>`)}
        ${row('Down Payment (30%)', `<strong style="color:#c2410c;">${c.downpay}</strong>`)}
        ${row('Balance Due on Pick-up', `<strong style="color:#028a5d;">${c.balance}</strong>`)}
        <div class="modal-actions">
            <button class="modal-dl-btn" onclick="downloadPDF('${id}','${c.vehicle}')">
                <i class="bi bi-download"></i> Download PDF
            </button>
            ${c.status !== 'Signed'
                ? `<button class="modal-sign-btn" onclick="closeViewModal();openSignModal('${id}','${c.vehicle}')">
                        <i class="bi bi-pen"></i> Sign Contract
                   </button>`
                : `<button class="modal-dl-btn" style="background:#e2f7ed;color:#16a34a;border-color:#10b981;" disabled>
                        <i class="bi bi-patch-check-fill"></i> Already Signed
                   </button>`
            }
        </div>`;
    document.getElementById('viewModal').classList.add('open');
}

function row(label, val) {
    return `<div class="contract-detail-row"><span class="cdl">${label}</span><span class="cdv">${val}</span></div>`;
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('open');
}

/* ── PDF Download (simulated) ── */
function downloadPDF(id, vehicle) {
    showToast(`Downloading PDF for ${vehicle}...`);
    setTimeout(() => showToast(`✓ ${vehicle} contract downloaded!`), 1200);
}

/* ── Sign Modal & Canvas ── */
let currentSignId = null;
let isDrawing = false;
let canvas, ctx;

function openSignModal(id, vehicle) {
    currentSignId = id;
    document.getElementById('signModalTitle').textContent = `Sign Contract — ${vehicle}`;
    document.getElementById('signModal').classList.add('open');
    setTimeout(initCanvas, 50);
}

function closeSignModal() {
    document.getElementById('signModal').classList.remove('open');
}

function initCanvas() {
    canvas = document.getElementById('signCanvas');
    ctx    = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    canvas.onmousedown  = e => { isDrawing = true; ctx.beginPath(); ctx.moveTo(pos(e).x, pos(e).y); };
    canvas.onmousemove  = e => { if (!isDrawing) return; ctx.lineTo(pos(e).x, pos(e).y); ctx.stroke(); };
    canvas.onmouseup    = () => { isDrawing = false; };
    canvas.onmouseleave = () => { isDrawing = false; };

    canvas.ontouchstart = e => { e.preventDefault(); isDrawing = true; const t = e.touches[0]; ctx.beginPath(); ctx.moveTo(pos(t).x, pos(t).y); };
    canvas.ontouchmove  = e => { e.preventDefault(); if (!isDrawing) return; const t = e.touches[0]; ctx.lineTo(pos(t).x, pos(t).y); ctx.stroke(); };
    canvas.ontouchend   = () => { isDrawing = false; };
}

function pos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX || e.pageX) - r.left, y: (e.clientY || e.pageY) - r.top };
}

function clearCanvas() {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function confirmSign() {
    if (!currentSignId) return;
    // Check canvas has content
    const blank = document.createElement('canvas');
    blank.width = canvas.width; blank.height = canvas.height;
    if (canvas.toDataURL() === blank.toDataURL()) {
        showToast('Please draw your signature first.');
        return;
    }
    closeSignModal();

    // Update contract status in data + DOM
    contracts[currentSignId].status = 'Signed';
    contracts[currentSignId].statusColor = '#16a34a';

    // Update the card in DOM
    const cards = document.querySelectorAll('.contract-card');
    const idx   = ['C001','C002','C003'].indexOf(currentSignId);
    if (idx !== -1) {
        const card = cards[idx];
        const badgeEl = card.querySelector('.badge');
        badgeEl.className = 'badge active';
        badgeEl.textContent = 'Active';
        card.querySelector('.status-label').style.color = '#16a34a';
        card.querySelector('.status-label').innerHTML = '<i class="bi bi-check-circle-fill"></i> Signed by Both Parties';
        // Remove "Sign Now" button
        const signBtn = card.querySelector('.btn-dark');
        if (signBtn) signBtn.remove();
    }

    showToast('✓ Contract signed successfully! A copy has been sent to your email.');
    currentSignId = null;
}

/* ── Toast ── */
function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastText').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── Mobile sidebar ── */
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

/* ── Close modals on backdrop click ── */
document.getElementById('viewModal').addEventListener('click', e => {
    if (e.target === document.getElementById('viewModal')) closeViewModal();
});
document.getElementById('signModal').addEventListener('click', e => {
    if (e.target === document.getElementById('signModal')) closeSignModal();
});