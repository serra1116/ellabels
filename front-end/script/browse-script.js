/* ════════════════════════════════════════
   BROWSE PAGE — COMPLETE JAVASCRIPT
   MobiLeasePH | browse-script.js
════════════════════════════════════════ */
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
/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const carsData = [
    { id:1,  name:"Toyota Vios 2024",             location:"Makati City",         image:"pictures/vios.jpg",     price:1800, type:"SEDAN",    seats:5, transmission:"Automatic", fuel:"Gasoline", features:["Dashcam","Bluetooth","USB Charging","Air Conditioning","Central Lock"], rating:4.7, trips:48,  available:true,  featured:true,  owner:"Juan dela Cruz" },
    { id:2,  name:"Honda CR-V 2023",              location:"Quezon City",         image:"pictures/crv.jpg",      price:3500, type:"SUV",      seats:7, transmission:"Automatic", fuel:"Diesel",   features:["GPS","Dashcam","4WD","Sunroof","Leather Seats"],               rating:4.9, trips:102, available:true,  featured:true,  owner:"Ana Reyes" },
    { id:3,  name:"Toyota Innova 2024",           location:"Malabon City",           image:"pictures/innova.png",   price:2800, type:"MPV",      seats:8, transmission:"Automatic", fuel:"Diesel",   features:["Spacious","Bluetooth","Dashcam","USB Charging","Rear A/C"],    rating:4.8, trips:76,  available:true,  featured:false, owner:"Carlos Bautista" },
    { id:4,  name:"Honda Civic RS 2023",          location:"Taguig City",         image:"pictures/civic.jpg",    price:2200, type:"SEDAN",    seats:5, transmission:"Automatic", fuel:"Gasoline", features:["Bluetooth","USB Charging","Sunroof","Lane Assist","Cruise Control"], rating:4.6, trips:39,  available:true,  featured:false, owner:"Liza Moreno" },
    { id:5,  name:"Mitsubishi Montero Sport 2024",location:"Makati City",          image:"pictures/montero.jpg",  price:3800, type:"SUV",      seats:7, transmission:"Automatic", fuel:"Diesel",   features:["4WD","GPS","Dashcam","Push Start","Electric Seats"],               rating:4.7, trips:55,  available:true,  featured:true,  owner:"Marco Villanueva" },
    { id:6,  name:"Toyota Fortuner 2023",         location:"Pasig City",          image:"pictures/fortuner.jpg", price:4200, type:"SUV",      seats:7, transmission:"Automatic", fuel:"Diesel",   features:["4WD","Bluetooth","GPS","Rear Camera","Fog Lights"],             rating:4.9, trips:88,  available:true,  featured:false, owner:"Rosa Aquino" },
    { id:7,  name:"Suzuki Swift 2023",            location:"Mandaluyong",         image:"pictures/swift.jpeg",   price:1400, type:"HATCHBACK",seats:5, transmission:"Manual",    fuel:"Gasoline", features:["Bluetooth","Fuel Efficient","USB Charging"],        rating:4.5, trips:27,  available:true,  featured:false, owner:"Ben Torres" },
    { id:8,  name:"Ford Ranger Wildtrak 2024",    location:"San Juan City",      image:"pictures/ranger.jpeg",  price:3600, type:"PICKUP",   seats:5, transmission:"Automatic", fuel:"Diesel",   features:["4WD","Tow Hook","Dashcam","Off-Road Mode"],          rating:4.8, trips:41,  available:false, featured:false, owner:"Dave Lacson" },
    { id:9,  name:"Hyundai Tucson 2023",          location:"Pasay City",          image:"pictures/tucson.jfif",  price:3200, type:"SUV",      seats:5, transmission:"Automatic", fuel:"Gasoline", features:["Sunroof","GPS","Bluetooth","Wireless Charging"],         rating:4.6, trips:33,  available:true,  featured:false, owner:"Nina Castro" },
    { id:10, name:"Kia Carnival 2024",            location:"Paranaque City",      image:"pictures/carnival.jpg", price:4500, type:"MPV",      seats:8, transmission:"Automatic", fuel:"Diesel",   features:["Premium Sound","USB Charging","GPS","Captain Seats","Power Doors"],rating:4.9, trips:19,  available:true,  featured:true,  owner:"Felix Sy" },
    { id:11, name:"Suzuki Ertiga 2023",           location:"Pasig City",       image:"pictures/ertiga.jpg",   price:1900, type:"MPV",      seats:7, transmission:"Automatic", fuel:"Gasoline", features:["Bluetooth","USB Charging","Fold-flat Seats"],          rating:4.4, trips:62,  available:true,  featured:false, owner:"Grace Lim" },
    { id:12, name:"Toyota Hilux 2024",            location:"Mandaluyong", image:"pictures/hilux.jpg",    price:3300, type:"PICKUP",   seats:5, transmission:"Manual",    fuel:"Diesel",   features:["4WD","Tow Hook","Cargo Bed","Snorkel","Bull Bar"],        rating:4.7, trips:58,  available:true,  featured:false, owner:"Roy Mendoza" }
];

const sampleReviews = [
    { name:"Jess M.",   initials:"JM", date:"Apr 2025", stars:5, text:"Absolutely spotless car! The owner was very responsive and the whole process was smooth. Will rent again!" },
    { name:"Cath R.",   initials:"CR", date:"Mar 2025", stars:5, text:"Great experience. Car was exactly as described, clean and well-maintained. Perfect for our Tagaytay trip." },
    { name:"Paolo T.",  initials:"PT", date:"Feb 2025", stars:4, text:"Good car overall. Pick-up was a bit delayed but the owner communicated well. Car drove perfectly." },
    { name:"Mara D.",   initials:"MD", date:"Jan 2025", stars:5, text:"Highly recommended! Easy booking, great car condition. Would definitely rent this again for family trips." }
];

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
let filteredCars    = [...carsData];
let currentFilter   = 'all';
let currentSort     = 'featured';
let currentSeats    = 'all';
let currentZoomIdx  = 0;
let selectedCarId   = null;
let selectedDays    = 1;
let driverOption    = 'with'; // 'with' | 'self'
let selectedAddons  = {}; // { addonName: pricePerDay }

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
function formatPrice(p) { return '\u20B1' + p.toLocaleString('en-PH'); }
function capitalize(s)  { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }
function initials(name) { return name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(); }
function todayStr() { const d = new Date(); return d.toISOString().split('T')[0]; }
function addDays(dateStr, days) { const d = new Date(dateStr); d.setDate(d.getDate()+days); return d.toISOString().split('T')[0]; }
function formatDateDisplay(str) {
    if(!str) return '—';
    const d = new Date(str+'T00:00:00');
    return d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
}
function formatTime(timeStr) {
    if(!timeStr) return '—';
    const [h, m] = timeStr.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const disp = ((hr % 12) || 12) + ':' + m + ' ' + ampm;
    return disp;
}

/* ════════════════════════════════════════
   PAGE NAVIGATION
════════════════════════════════════════ */
function showPage(id) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    document.getElementById('page-'+id).classList.add('active');
    window.scrollTo(0,0);
}

/* ════════════════════════════════════════
   PAGE 1 — RENDER CARS
════════════════════════════════════════ */
const carGrid     = document.getElementById('carGrid');
const noResults   = document.getElementById('noResults');
const resultsCount= document.getElementById('resultsCount');

function renderCars() {
    if (filteredCars.length === 0) {
        carGrid.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = '0';
        return;
    }
    carGrid.style.display = 'grid';
    noResults.style.display = 'none';
    resultsCount.textContent = filteredCars.length;

    carGrid.innerHTML = filteredCars.map((car, idx) => `
        <div class="car-card ${!car.available ? 'car-card--disabled' : ''}"
             onclick="${car.available ? `openZoom(${idx})` : ''}">
            <div class="car-image-wrap">
                <span class="badge-type">${capitalize(car.type)}</span>
                <span class="badge-status ${car.available ? '' : 'unavailable'}">${car.available ? 'Available' : 'Unavailable'}</span>
                <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy"
                     onerror="this.src='https://placehold.co/600x400/1e5a6e/fff?text=${encodeURIComponent(car.name)}'">
            </div>
            <div class="car-body">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-location"><i class="bi bi-geo-alt-fill"></i>${car.location}</p>
                <div class="car-specs">
                    <span class="spec-item"><i class="bi bi-people-fill"></i>${car.seats} seats</span>
                    <span class="spec-item"><i class="bi bi-gear-wide-connected"></i>${car.transmission}</span>
                    <span class="spec-item"><i class="bi bi-fuel-pump-fill"></i>${car.fuel}</span>
                </div>
                <div class="feature-tags">
                    ${car.features.slice(0,3).map(f=>`<span class="feature-tag">${f}</span>`).join('')}
                </div>
                <div class="price-rating-row">
                    <div class="car-price">${formatPrice(car.price)}<span class="day-label">/day</span></div>
                    <div class="car-rating">
                        <i class="bi bi-star-fill"></i>
                        <span class="rating-val">${car.rating}</span>
                        <span>(${car.trips} trips)</span>
                    </div>
                </div>
                <button class="book-btn ${!car.available ? 'book-btn--disabled' : ''}"
                    onclick="event.stopPropagation();${car.available ? `openBookingPage(${car.id})` : ''}"
                    ${!car.available ? 'disabled' : ''}>
                    ${car.available ? 'Book Now' : 'Unavailable'}
                </button>
            </div>
        </div>
    `).join('');
}

/* ════════════════════════════════════════
   ZOOM MODAL
════════════════════════════════════════ */
const zoomOverlay    = document.getElementById('zoomOverlay');
const zoomCard       = document.getElementById('zoomCard');
const zoomClose      = document.getElementById('zoomClose');
const zoomPrev       = document.getElementById('zoomPrev');
const zoomNext       = document.getElementById('zoomNext');
const zoomImage      = document.getElementById('zoomImage');
const zoomName       = document.getElementById('zoomName');
const zoomLocation   = document.getElementById('zoomLocation');
const zoomBadgeType  = document.getElementById('zoomBadgeType');
const zoomBadgeStatus= document.getElementById('zoomBadgeStatus');
const zoomSpecs      = document.getElementById('zoomSpecs');
const zoomTags       = document.getElementById('zoomTags');
const zoomPrice      = document.getElementById('zoomPrice');
const zoomRating     = document.getElementById('zoomRating');
const zoomTrips      = document.getElementById('zoomTrips');
const zoomBookBtn    = document.getElementById('zoomBookBtn');

function populateZoom(idx) {
    const car = filteredCars[idx];
    zoomImage.src = car.image;
    zoomImage.onerror = () => { zoomImage.src = `https://placehold.co/800x400/1e5a6e/fff?text=${encodeURIComponent(car.name)}`; };
    zoomBadgeType.textContent = capitalize(car.type);
    zoomBadgeStatus.textContent = car.available ? 'Available' : 'Unavailable';
    zoomBadgeStatus.className = 'badge-status'+(car.available ? '' : ' unavailable');
    zoomName.textContent = car.name;
    zoomLocation.textContent = car.location;
    zoomSpecs.innerHTML = `
        <span class="spec-item"><i class="bi bi-people-fill"></i>${car.seats} seats</span>
        <span class="spec-item"><i class="bi bi-gear-wide-connected"></i>${car.transmission}</span>
        <span class="spec-item"><i class="bi bi-fuel-pump-fill"></i>${car.fuel}</span>`;
    zoomTags.innerHTML = car.features.slice(0,4).map(f=>`<span class="feature-tag">${f}</span>`).join('');
    zoomPrice.textContent = formatPrice(car.price);
    zoomRating.textContent = car.rating;
    zoomTrips.textContent = `(${car.trips} trips)`;
    zoomBookBtn.onclick = () => { closeZoom(); openBookingPage(car.id); };
}
function openZoom(idx) {
    currentZoomIdx = idx;
    populateZoom(idx);
    zoomOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeZoom() {
    zoomOverlay.classList.remove('show');
    document.body.style.overflow = '';
}
function navigateZoom(dir) {
    let next = currentZoomIdx, tries = 0;
    do {
        next = (next + dir + filteredCars.length) % filteredCars.length;
        tries++;
    } while (!filteredCars[next].available && tries < filteredCars.length);
    if (!filteredCars[next].available) return;
    currentZoomIdx = next;
    zoomCard.style.animation = 'none';
    zoomCard.offsetHeight;
    zoomCard.style.animation = '';
    populateZoom(currentZoomIdx);
}
zoomClose.addEventListener('click', closeZoom);
zoomPrev.addEventListener('click', () => navigateZoom(-1));
zoomNext.addEventListener('click', () => navigateZoom(1));
zoomOverlay.addEventListener('click', e => { if(e.target===zoomOverlay) closeZoom(); });
document.addEventListener('keydown', e => {
    if(!zoomOverlay.classList.contains('show')) return;
    if(e.key==='Escape') closeZoom();
    if(e.key==='ArrowLeft') navigateZoom(-1);
    if(e.key==='ArrowRight') navigateZoom(1);
});

/* ════════════════════════════════════════
   FILTER & SORT — PAGE 1
════════════════════════════════════════ */
const searchForm     = document.getElementById('searchForm');
const nameSearch     = document.getElementById('nameSearch');
const locationSearch = document.getElementById('locationSearch');
const clearBtn       = document.getElementById('clearBtn');
const sortSelect     = document.getElementById('sortSelect');
const seatsFilter    = document.getElementById('seatsFilter');
const filterPills    = document.querySelectorAll('.filter-pill');

function applyFilters() {
    const nameQ = nameSearch.value.toLowerCase().trim();
    const locQ  = locationSearch.value.toLowerCase().trim();
    filteredCars = carsData.filter(car => {
        const matchName  = !nameQ || car.name.toLowerCase().includes(nameQ);
        const matchLoc   = !locQ  || car.location.toLowerCase().includes(locQ);
        const matchType  = currentFilter === 'all' || car.type.toLowerCase() === currentFilter;
        const matchSeats = currentSeats  === 'all' || car.seats === parseInt(currentSeats);
        return matchName && matchLoc && matchType && matchSeats;
    });
    sortCars(); renderCars();
}
function sortCars() {
    switch(currentSort) {
        case 'price-low':  filteredCars.sort((a,b) => a.price - b.price); break;
        case 'price-high': filteredCars.sort((a,b) => b.price - a.price); break;
        case 'rating':     filteredCars.sort((a,b) => b.rating - a.rating); break;
        default:           filteredCars.sort((a,b) => (b.featured?1:0)-(a.featured?1:0));
    }
}
searchForm.addEventListener('submit', e => { e.preventDefault(); applyFilters(); });
clearBtn.addEventListener('click', () => {
    nameSearch.value = ''; locationSearch.value = '';
    currentFilter = 'all'; currentSeats = 'all'; seatsFilter.value = 'all';
    filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter==='all'));
    applyFilters();
});
sortSelect.addEventListener('change', e => { currentSort = e.target.value; sortCars(); renderCars(); });
seatsFilter.addEventListener('change', e => { currentSeats = e.target.value; applyFilters(); });
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.filter;
        applyFilters();
    });
});

/* ════════════════════════════════════════
   PAGE 2 — BOOKING DETAILS LOGIC
════════════════════════════════════════ */

/* ── Driver Option ── */
function selectDriverOpt(opt) {
    driverOption = opt;
    document.getElementById('driverOptWith').classList.toggle('selected', opt==='with');
    document.getElementById('driverOptSelf').classList.toggle('selected', opt==='self');
    document.getElementById('driverInfoCard').style.display = opt==='with' ? 'flex' : 'none';
    document.getElementById('summaryDriverRow').style.display = opt==='with' ? 'flex' : 'none';
    document.getElementById('summaryDriverNameRow').style.display = opt==='with' ? 'flex' : 'none';
    document.getElementById('summaryDriverOpt').textContent = opt==='with' ? 'With Driver' : 'Self-Drive';
    recalcSummary();
}

/* ── Same Location Toggle ── */
function toggleSameLoc() {
    const cb = document.getElementById('bdSameLoc');
    cb.checked = !cb.checked;
    const wrap = document.getElementById('bdDropoffLocWrap');
    wrap.style.display = cb.checked ? 'none' : 'block';
    if(cb.checked) {
        document.getElementById('bdDropoffLoc').value = document.getElementById('bdPickupLoc').value;
    }
    updateSummaryLocations();
    validateBookingFields();
}

/* ── Sync dropoff when pickup changes ── */
document.getElementById('bdPickupLoc').addEventListener('input', () => {
    if(document.getElementById('bdSameLoc').checked) {
        document.getElementById('bdDropoffLoc').value = document.getElementById('bdPickupLoc').value;
    }
    updateSummaryLocations();
});
document.getElementById('bdDropoffLoc').addEventListener('input', updateSummaryLocations);
function updateSummaryLocations() {
    const pu = document.getElementById('bdPickupLoc').value || '—';
    const same = document.getElementById('bdSameLoc').checked;
    const doff = same ? pu : (document.getElementById('bdDropoffLoc').value || '—');
    document.getElementById('summaryPickupLoc').textContent = pu;
    document.getElementById('summaryDropoffLoc').textContent = doff;
}

/* ── Add-ons ── */
function updateAddon(cb) {
    const name  = cb.dataset.addon;
    const price = parseInt(cb.dataset.price);
    const label = cb.closest('.addon-item');
    if(cb.checked) {
        selectedAddons[name] = price;
        label.classList.add('selected');
    } else {
        delete selectedAddons[name];
        label.classList.remove('selected');
    }
    renderAddonsSummary();
    recalcSummary();
}
function renderAddonsSummary() {
    const wrap = document.getElementById('summaryAddonsList');
    const keys = Object.keys(selectedAddons);
    const addonsRow = document.getElementById('summaryAddonsRow');
    if(keys.length === 0) {
        wrap.innerHTML = `<div class="summary-detail-row" style="color:#94a3b8;font-size:0.8rem;"><span>No add-ons selected</span><span></span></div>`;
        addonsRow.style.display = 'none';
    } else {
        wrap.innerHTML = keys.map(k => `
            <div class="summary-detail-row">
                <span class="sdr-label">${k}</span>
                <span class="sdr-val">+${formatPrice(selectedAddons[k])}/day</span>
            </div>`).join('');
        addonsRow.style.display = 'flex';
    }
}

/* ── Date / Time change handlers ── */
['bdStartDate','bdEndDate'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        const s = document.getElementById('bdStartDate').value;
        const e = document.getElementById('bdEndDate').value;
        if(s && e) {
            const diff = Math.max(1, Math.ceil((new Date(e)-new Date(s))/(1000*60*60*24)));
            selectedDays = diff;
            document.getElementById('bdDurationText').textContent =
                `${diff} day${diff>1?'s':''} rental`;
            document.getElementById('summaryStartDate').textContent = formatDateDisplay(s);
            document.getElementById('summaryEndDate').textContent   = formatDateDisplay(e);
            document.getElementById('summaryDuration').textContent  = `${diff} day${diff>1?'s':''}`;
            recalcSummary();
        }
    });
});
['bdPickupTime','bdDropoffTime'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        document.getElementById('summaryPickupTime').textContent  = formatTime(document.getElementById('bdPickupTime').value);
        document.getElementById('summaryDropoffTime').textContent = formatTime(document.getElementById('bdDropoffTime').value);
        recalcSummary();
    });
});

/* ── Main Recalc ── */
function recalcSummary() {
    const car = carsData.find(c => c.id === selectedCarId);
    if(!car) return;

    const days       = selectedDays;
    const carSub     = car.price * days;
    const driverFee  = driverOption === 'with' ? 800 * days : 0;
    const addonTotal = Object.values(selectedAddons).reduce((a,b) => a+b, 0) * days;
    const subtotal   = carSub + driverFee + addonTotal;
    const serviceFee = Math.round(subtotal * 0.08);
    const insurance  = 200;
    const total      = subtotal + serviceFee + insurance;

    document.getElementById('summaryDailyLabel').textContent = `${formatPrice(car.price)} x ${days} day${days>1?'s':''}`;
    document.getElementById('summaryDailySub').textContent   = formatPrice(carSub);
    if(driverOption === 'with') {
        document.getElementById('summaryDriverFeeVal').textContent = `+${formatPrice(driverFee)}`;
    }
    document.getElementById('summaryAddonTotal').textContent = `+${formatPrice(addonTotal)}`;
    document.getElementById('summaryServiceFee').textContent = `+${formatPrice(serviceFee)}`;
    document.getElementById('summaryTotal').textContent      = formatPrice(total);
}

/* ════════════════════════════════════════
   OPEN BOOKING PAGE
════════════════════════════════════════ */
function openBookingPage(carId) {
    const car = carsData.find(c => c.id === carId);
    if(!car) return;
    selectedCarId  = carId;
    selectedDays   = 1;
    driverOption   = 'with';
    selectedAddons = {};

    // Reset addon checkboxes
    document.querySelectorAll('#bdAddonsGrid input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.addon-item').classList.remove('selected');
    });

    // Car image & info
    const img = document.getElementById('bookingCarImage');
    img.src = car.image;
    img.onerror = () => { img.src = `https://placehold.co/900x350/1e5a6e/fff?text=${encodeURIComponent(car.name)}`; };

    document.getElementById('summaryCarThumb').src = car.image;
    document.getElementById('bookingCarName').textContent  = car.name;
    document.getElementById('bookingCarLoc').textContent   = car.location;
    document.getElementById('bookingCarPrice').textContent = formatPrice(car.price);
    document.getElementById('summaryCarName').textContent  = car.name;
    document.getElementById('summaryCarLoc').textContent   = car.location;

    // Specs row
    document.getElementById('bookingSpecsRow').innerHTML = `
        <div class="booking-spec"><i class="bi bi-people-fill"></i><strong>${car.seats}</strong> seats</div>
        <div class="booking-spec"><i class="bi bi-gear-wide-connected"></i><strong>${car.transmission}</strong></div>
        <div class="booking-spec"><i class="bi bi-fuel-pump-fill"></i><strong>${car.fuel}</strong></div>
        <div class="booking-spec"><i class="bi bi-star-fill" style="color:var(--star-color)"></i><strong>${car.rating}</strong> rating</div>
        <div class="booking-spec"><i class="bi bi-calendar2-check"></i><strong>${car.trips}</strong> trips</div>`;

    // Feature tags (hero)
    document.getElementById('bookingFeatures').innerHTML = car.features.slice(0,4).map(f=>`<span class="feature-tag">${f}</span>`).join('');

    // Car features in Booking Details
    const featIcons = { 'Dashcam':'bi-camera-video','Bluetooth':'bi-bluetooth','USB Charging':'bi-usb-symbol',
        'GPS':'bi-map','4WD':'bi-truck','Sunroof':'bi-sun','Spacious':'bi-arrows-fullscreen',
        'Leather Seats':'bi-person-workspace','Rear A/C':'bi-wind','Air Conditioning':'bi-thermometer-snow',
        'Central Lock':'bi-lock','Wireless Charging':'bi-lightning-charge','Cruise Control':'bi-speedometer2',
        'Lane Assist':'bi-signpost','Push Start':'bi-key','Electric Seats':'bi-sliders',
        'Rear Camera':'bi-camera','Fog Lights':'bi-brightness-alt-high','Off-Road Mode':'bi-compass',
        'Captain Seats':'bi-person-badge','Power Doors':'bi-door-open','Fold-flat Seats':'bi-layout-three-columns',
        'Fuel Efficient':'bi-fuel-pump','Premium Sound':'bi-music-note-beamed','Tow Hook':'bi-link-45deg',
        'Cargo Bed':'bi-box','Snorkel':'bi-water','Bull Bar':'bi-shield' };
    document.getElementById('bdCarFeatures').innerHTML = car.features.map(f => `
        <span class="feature-badge">
            <i class="bi ${featIcons[f]||'bi-check-circle'}"></i>${f}
        </span>`).join('');

    // Ratings
    document.getElementById('bookingRatingBig').textContent = car.rating.toFixed(1);
    const starsHtml = [5,4,3,2,1].map(s => `<i class="bi ${car.rating>=s?'bi-star-fill':'bi-star'}" style="color:var(--star-color);font-size:0.85rem;"></i>`).join('');
    document.getElementById('bookingStarRow').innerHTML = starsHtml;
    document.getElementById('bookingTripCount').textContent = `${car.trips} trips`;

    const distribution = [70,18,8,3,1];
    document.getElementById('ratingBarsWrap').innerHTML = [5,4,3,2,1].map((star,i) => `
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;font-size:0.78rem;color:#64748b;">
            <span style="width:20px;text-align:right;">${star}</span>
            <i class="bi bi-star-fill" style="color:var(--star-color);font-size:0.7rem;"></i>
            <div style="flex:1;height:6px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                <div style="height:100%;width:${distribution[i]}%;background:var(--star-color);border-radius:4px;"></div>
            </div>
            <span style="width:28px;">${distribution[i]}%</span>
        </div>`).join('');

    document.getElementById('reviewsList').innerHTML = sampleReviews.map(r => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${r.initials}</div>
                    <div>
                        <div class="reviewer-name">${r.name}</div>
                        <div class="reviewer-date">${r.date}</div>
                    </div>
                </div>
                <div class="review-stars">${Array(r.stars).fill('<i class="bi bi-star-fill"></i>').join('')}${Array(5-r.stars).fill('<i class="bi bi-star"></i>').join('')}</div>
            </div>
            <div class="review-text">${r.text}</div>
        </div>`).join('');

    // Dates
    const today = todayStr();
    const endD  = addDays(today, 1);
    document.getElementById('bdStartDate').value   = '';
    document.getElementById('bdEndDate').value     = '';
    document.getElementById('bdPickupTime').value  = '';
    document.getElementById('bdDropoffTime').value = '';
    document.getElementById('bdPickupLoc').value   = '';
    document.getElementById('bdDropoffLoc').value  = '';
    document.getElementById('bdSameLoc').checked   = false;
    document.getElementById('bdDropoffLocWrap').style.display = 'block';
    document.getElementById('bdDurationText').textContent = 'Select dates to calculate duration';

    // Driver option reset
    selectDriverOpt('with');

    // Summary initial state
    document.getElementById('summaryStartDate').textContent  = '—';
    document.getElementById('summaryEndDate').textContent    = '—';
    document.getElementById('summaryPickupTime').textContent = '—';
    document.getElementById('summaryDropoffTime').textContent= '—';
    document.getElementById('summaryDuration').textContent   = '—';
    document.getElementById('summaryPickupLoc').textContent  = '—';
    document.getElementById('summaryDropoffLoc').textContent = '—';
    renderAddonsSummary();
    recalcSummary();
    validateBookingFields();
    showPage('booking');
    showPage('booking');
}

/* ════════════════════════════════════════
   CONTINUE BUTTON
════════════════════════════════════════ */
/* ── Validate required fields & toggle Continue button ── */
function validateBookingFields() {
    const start   = document.getElementById('bdStartDate').value;
    const end     = document.getElementById('bdEndDate').value;
    const pickupT = document.getElementById('bdPickupTime').value;
    const dropoffT= document.getElementById('bdDropoffTime').value;
    const pickupL = document.getElementById('bdPickupLoc').value.trim();
    const same    = document.getElementById('bdSameLoc').checked;
    const dropoffL= same ? pickupL : document.getElementById('bdDropoffLoc').value.trim();

    const allFilled = start && end && pickupT && dropoffT && pickupL && dropoffL;
    const btn = document.getElementById('continueBtn');
    btn.disabled = !allFilled;
}

function highlightErrors() {
    const fields = [
        { id: 'bdStartDate',   label: 'Start Date' },
        { id: 'bdEndDate',     label: 'End Date' },
        { id: 'bdPickupTime',  label: 'Pick-up Time' },
        { id: 'bdDropoffTime', label: 'Drop-off Time' },
        { id: 'bdPickupLoc',   label: 'Pick-up Location' },
    ];

    const same = document.getElementById('bdSameLoc').checked;
    if (!same) {
        fields.push({ id: 'bdDropoffLoc', label: 'Drop-off Location' });
    }

    let missing = [];
    let firstErrorEl = null;

    fields.forEach(f => {
        const el  = document.getElementById(f.id);
        const val = el.value.trim();
        // Remove old error
        el.classList.remove('field-error');
        const oldMsg = el.parentElement.querySelector('.field-error-msg');
        if (oldMsg) oldMsg.remove();

        if (!val) {
            missing.push(f.label);
            el.classList.add('field-error');
            const msg = document.createElement('div');
            msg.className = 'field-error-msg';
            msg.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${f.label} is required`;
            el.parentElement.appendChild(msg);
            if (!firstErrorEl) firstErrorEl = el;
        }
    });

    if (missing.length > 0) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }
    return true;
}

function clearFieldError(el) {
    el.classList.remove('field-error');
    const msg = el.parentElement.querySelector('.field-error-msg');
    if (msg) msg.remove();
    validateBookingFields();
}
['bdStartDate','bdEndDate','bdPickupTime','bdDropoffTime'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        clearFieldError(document.getElementById(id));
        validateBookingFields();
    });
});
document.getElementById('bdPickupLoc').addEventListener('input', () => {
    clearFieldError(document.getElementById('bdPickupLoc'));
    validateBookingFields();
});
document.getElementById('bdDropoffLoc').addEventListener('input', () => {
    clearFieldError(document.getElementById('bdDropoffLoc'));
    validateBookingFields();
});

document.getElementById('continueBtn').addEventListener('click', () => {
    if (!highlightErrors()) return;

    const car     = carsData.find(c => c.id === selectedCarId);
    const start   = document.getElementById('bdStartDate').value;
    const end     = document.getElementById('bdEndDate').value;
    const pickupT = document.getElementById('bdPickupTime').value;
    const dropoffT= document.getElementById('bdDropoffTime').value;
    const pickupL = document.getElementById('bdPickupLoc').value || car.location;
    const same    = document.getElementById('bdSameLoc').checked;
    const dropoffL= same ? pickupL : (document.getElementById('bdDropoffLoc').value || pickupL);

    if (driverOption === 'with') {
        openBookingSummaryPage({ car, start, end, pickupT, dropoffT, pickupL, dropoffL });
        return;
    }
    if (driverOption === 'self') {
        openSelfDriveVerifyPage();
        return;
    }
});
/* ════════════════════════════════════════
   PAGE 3 — OPEN BOOKING SUMMARY (WITH DRIVER)
════════════════════════════════════════ */
function openBookingSummaryPage({ car, start, end, pickupT, dropoffT, pickupL, dropoffL }) {
    const days       = selectedDays;
    const carSub     = car.price * days;
    const driverFee  = 800 * days;
    const addonTotal = Object.values(selectedAddons).reduce((a,b) => a+b, 0) * days;
    const subtotal   = carSub + driverFee + addonTotal;
    const serviceFee = Math.round(subtotal * 0.08);
    const total      = subtotal + serviceFee + 200;
    const addonKeys  = Object.keys(selectedAddons);

    // Car info
    const p3Thumb = document.getElementById('p3CarThumb');
    p3Thumb.src = car.image;
    p3Thumb.onerror = () => { p3Thumb.src = `https://placehold.co/160x120/1e5a6e/fff?text=${encodeURIComponent(car.name)}`; };
    document.getElementById('p3CarName').textContent = car.name;
    document.getElementById('p3CarLoc').textContent  = car.location;

    // Rental details
    document.getElementById('p3StartDateTime').textContent = `${formatDateDisplay(start)} at ${formatTime(pickupT)}`;
    document.getElementById('p3EndDateTime').textContent   = `${formatDateDisplay(end)} at ${formatTime(dropoffT)}`;
    document.getElementById('p3Duration').textContent      = `${days} day${days>1?'s':''}`;
    document.getElementById('p3PickupLoc').textContent     = pickupL;
    document.getElementById('p3DropoffLoc').textContent    = dropoffL;

    // Driver fee display
    document.getElementById('p3DriverFeeDisplay').textContent = `+${formatPrice(driverFee)}`;

    // Add-ons
    const addonsCard = document.getElementById('p3AddonsCard');
    if (addonKeys.length > 0) {
        addonsCard.style.display = 'block';
        document.getElementById('p3AddonsList').innerHTML = addonKeys.map(k => `
            <div class="p3-row">
                <span class="p3-label">${k}</span>
                <span class="p3-val">+${formatPrice(selectedAddons[k])}/day</span>
            </div>`).join('');
        document.getElementById('p3AddonsRow').style.display = 'flex';
        document.getElementById('p3AddonTotal').textContent = `+${formatPrice(addonTotal)}`;
    } else {
        addonsCard.style.display = 'none';
        document.getElementById('p3AddonsRow').style.display = 'none';
    }

    // Price breakdown
    document.getElementById('p3DailyLabel').textContent = `${formatPrice(car.price)} x ${days} day${days>1?'s':''}`;
    document.getElementById('p3DailySub').textContent   = formatPrice(carSub);
    document.getElementById('p3DriverFee').textContent  = `+${formatPrice(driverFee)}`;
    document.getElementById('p3ServiceFee').textContent = `+${formatPrice(serviceFee)}`;
    document.getElementById('p3Total').textContent      = formatPrice(total);

    showPage('booking-summary');
}

/* ════════════════════════════════════════
   PAGE 4A — SELF-DRIVE VERIFY LOGIC
════════════════════════════════════════ */

/* Tracks whether the renter's account is verified.
   Set to true to simulate a verified account.      */
let isAccountVerified = false;

/* Tracks whether license verification passed */
let isLicenseVerified = false;

/* Tracks who will drive: 'self' | 'other' | null */
let driverRoleChoice = null;

/* Open Page 4a and reset its state */
function openSelfDriveVerifyPage() {
    isLicenseVerified = false;
    driverRoleChoice = null;
    resetVerificationUI();
    // Reset role selection UI
    document.getElementById('p4aRoleSelf').classList.remove('selected');
    document.getElementById('p4aRoleOther').classList.remove('selected');
    document.getElementById('p4aVerifyStatusCard').style.display = 'none';
    document.getElementById('p4aSelfDriverActions').style.display = 'none';
    document.getElementById('p4aAnotherDriverSections').style.display = 'none';
    document.getElementById('p4aAnotherDriverActionBtns').style.display = 'none';
    applyAccountVerifiedState(isAccountVerified);
    showPage('self-drive-verify');
}

/* Handle driver role button selection */
function selectDriverRole(role) {
    driverRoleChoice = role;

    // Update button styles
    document.getElementById('p4aRoleSelf').classList.toggle('selected', role === 'self');
    document.getElementById('p4aRoleOther').classList.toggle('selected', role === 'other');

    // Always show account verification status card
    document.getElementById('p4aVerifyStatusCard').style.display = 'block';
    applyAccountVerifiedState(isAccountVerified);

    if (role === 'self') {
        // Show only verification status + self-driver action buttons (if verified)
        document.getElementById('p4aAnotherDriverSections').style.display = 'none';
        document.getElementById('p4aAnotherDriverActionBtns').style.display = 'none';
        updateSelfDriverActions();
    } else {
        // Show full license/ID form
        document.getElementById('p4aSelfDriverActions').style.display = 'none';
        document.getElementById('p4aAnotherDriverSections').style.display = 'block';
        document.getElementById('p4aAnotherDriverActionBtns').style.display = 'flex';
    }
}

/* Show/hide the self-driver Continue to Payment button based on account verification */
function updateSelfDriverActions() {
    const actionsEl = document.getElementById('p4aSelfDriverActions');
    const payBtn = document.getElementById('p4aSelfPayBtn');
    if (driverRoleChoice === 'self') {
        actionsEl.style.display = 'block';
        payBtn.disabled = !isAccountVerified;
    } else {
        actionsEl.style.display = 'none';
    }
}

/* Apply locked/unlocked state based on account verification */
function applyAccountVerifiedState(verified) {
    const cards = ['p4aLicenseCard', 'p4aIDCard', 'p4aSecondIDCard', 'p4aSelfieCard', 'p4aVerifyActionCard'];
    cards.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.opacity       = verified ? '1'    : '0.45';
            el.style.pointerEvents = verified ? 'auto' : 'none';
        }
    });
    document.getElementById('p4aUnverifiedBox').style.display = verified ? 'none'  : 'flex';
    document.getElementById('p4aVerifiedBox').style.display   = verified ? 'flex'  : 'none';
    // Update the verified message based on role
    const verifiedMsg = document.querySelector('#p4aVerifiedBox .p4a-verify-msg');
    if (verifiedMsg) {
        if (driverRoleChoice === 'self') {
            verifiedMsg.textContent = 'Your account is verified. You may now proceed to payment.';
        } else {
            verifiedMsg.textContent = 'Your account is verified. You may now fill in your driver\'s license details and upload a valid ID below.';
        }
    }
    checkVerifyBtnState();
    // Also update self-driver action button state
    if (driverRoleChoice === 'self') {
        updateSelfDriverActions();
    }
}

/* "Verify My Account" demo button — simulates account becoming verified */
function simulateAccountVerified() {
    isAccountVerified = true;
    applyAccountVerifiedState(true);
}

/* Wire up the self-driver Continue to Payment button */
document.getElementById('p4aSelfPayBtn').addEventListener('click', function() {
    document.getElementById('p4aPayBtn').click();
});

/* Format license input → A00-00-000000 */
function formatLicenseInput(input) {

    let val = input.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    val = val.slice(0, 11);
    let formatted = '';
    
    if (val.length > 0) {
        formatted += val.slice(0, 3);
    }
    if (val.length > 3) {
        formatted += '-' + val.slice(3, 5);
    }
    if (val.length > 5) {
        formatted += '-' + val.slice(5, 11);
    }
    
    input.value = formatted;
}

/* Validate license number field */
function validateLicense() {
    const input    = document.getElementById('p4aLicenseNum');
    const feedback = document.getElementById('p4aLicenseFeedback');
    const val      = input.value.trim();
    /* LTO format: A00-00-000000  (1 letter, dash, 2 digits, dash, 6 digits) */
    const pattern  = /^[A-Z]\d{2}-\d{2}-\d{6}$/;
    if (!val) {
        input.className = 'p4a-input'; feedback.innerHTML = ''; return false;
    }
    if (pattern.test(val)) {
        input.classList.add('valid');   input.classList.remove('invalid');
        feedback.className = 'p4a-input-feedback ok';
        feedback.innerHTML = '<i class="bi bi-check-circle-fill"></i> Valid format';
        checkVerifyBtnState(); return true;
    } else {
        input.classList.add('invalid'); input.classList.remove('valid');
        feedback.className = 'p4a-input-feedback err';
        feedback.innerHTML = '<i class="bi bi-x-circle-fill"></i> Format must be: A00-00-000000';
        checkVerifyBtnState(); return false;
    }
}

/* Validate expiry date */
function validateExpiry() {
    const input    = document.getElementById('p4aLicenseExpiry');
    const feedback = document.getElementById('p4aExpiryFeedback');
    const val      = input.value;
    if (!val) { input.className = 'p4a-input no-icon'; feedback.innerHTML = ''; return false; }
    const expiry = new Date(val);
    const today  = new Date();
    today.setHours(0,0,0,0);
    if (expiry > today) {
        input.classList.add('valid');   input.classList.remove('invalid');
        feedback.className = 'p4a-input-feedback ok';
        feedback.innerHTML = '<i class="bi bi-check-circle-fill"></i> License is still valid';
        checkVerifyBtnState(); return true;
    } else {
        input.classList.add('invalid'); input.classList.remove('valid');
        feedback.className = 'p4a-input-feedback err';
        feedback.innerHTML = '<i class="bi bi-x-circle-fill"></i> License is expired — please renew before renting';
        checkVerifyBtnState(); return false;
    }
}

/* Handle ID image upload */
function handleIDUpload(input, side) {
    const file = input.files[0];
    if (!file) return;
    const isImage   = file.type.startsWith('image/');
    const areaId    = side === 'front' ? 'p4aFrontArea'   : 'p4aBackArea';
    const titleId   = side === 'front' ? 'p4aFrontTitle'  : 'p4aBackTitle';
    const previewId = side === 'front' ? 'p4aFrontPreview': 'p4aBackPreview';
    const area      = document.getElementById(areaId);
    area.classList.add('has-file');
    document.getElementById(titleId).textContent = file.name.length > 22
        ? file.name.slice(0, 20) + '…' : file.name;
    if (isImage) {
        const reader = new FileReader();
        reader.onload = e => {
            const prev = document.getElementById(previewId);
            prev.src   = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    checkVerifyBtnState();
}

/* Enable/disable the Verify button based on filled fields */
function checkVerifyBtnState() {
    if (!isAccountVerified) { return; }
    const licOk         = document.getElementById('p4aLicenseFeedback').classList.contains('ok');
    const expiryOk      = document.getElementById('p4aExpiryFeedback').classList.contains('ok');
    const codeOk        = document.getElementById('p4aLicenseCode').value !== '';
    const frontOk       = document.getElementById('p4aFrontArea').classList.contains('has-file');
    const backOk        = document.getElementById('p4aBackArea').classList.contains('has-file');
    const secTypeOk     = document.getElementById('p4aSecondIDType').value !== '';
    const secFrontOk    = document.getElementById('p4aSecondFrontArea').classList.contains('has-file');
    const secBackOk     = document.getElementById('p4aSecondBackArea').classList.contains('has-file');
    const selfieOk      = document.getElementById('p4aSelfieArea').classList.contains('has-file');
    const btn           = document.getElementById('p4aVerifyBtn');
    btn.disabled = !(licOk && expiryOk && codeOk && frontOk && backOk && secTypeOk && secFrontOk && secBackOk && selfieOk);
}

/* Handle secondary valid ID upload */
function handleSecondIDUpload(input, side) {
    const file = input.files[0];
    if (!file) return;
    const isImage   = file.type.startsWith('image/');
    const areaId    = side === 'front' ? 'p4aSecondFrontArea'    : 'p4aSecondBackArea';
    const titleId   = side === 'front' ? 'p4aSecondFrontTitle'   : 'p4aSecondBackTitle';
    const previewId = side === 'front' ? 'p4aSecondFrontPreview' : 'p4aSecondBackPreview';
    const area      = document.getElementById(areaId);
    area.classList.add('has-file');
    document.getElementById(titleId).textContent = file.name.length > 22
        ? file.name.slice(0, 20) + '…' : file.name;
    if (isImage) {
        const reader = new FileReader();
        reader.onload = e => {
            const prev = document.getElementById(previewId);
            prev.src   = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    checkVerifyBtnState();
}

/* Handle selfie upload */
function handleSelfieUpload(input) {
    const file = input.files[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const area    = document.getElementById('p4aSelfieArea');
    area.classList.add('has-file');
    document.getElementById('p4aSelfieTitle').textContent = file.name.length > 22
        ? file.name.slice(0, 20) + '…' : file.name;
    if (isImage) {
        const reader = new FileReader();
        reader.onload = e => {
            const prev = document.getElementById('p4aSelfiePreview');
            prev.src   = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    checkVerifyBtnState();
}

/* Simulate license verification with a delay */
function runLicenseVerification() {
    const btn = document.getElementById('p4aVerifyBtn');
    btn.disabled   = true;
    btn.innerHTML  = '<span class="p4a-spinner"></span> Submitting...';

    document.getElementById('p4aPendingResult').style.display  = 'block';
    document.getElementById('p4aReviewResult').style.display   = 'none';
    document.getElementById('p4aSuccessResult').style.display  = 'none';
    document.getElementById('p4aFailResult').style.display     = 'none';

    /* Simulate upload (1.8s), then show "under review" state */
    setTimeout(() => {
        document.getElementById('p4aPendingResult').style.display = 'none';
        document.getElementById('p4aReviewResult').style.display  = 'block';

        btn.innerHTML = '<i class="bi bi-clock-history"></i> Under Review';
        btn.disabled  = true;

        /* Keep Continue to Payment disabled while under review */
        document.getElementById('p4aPayBtn').disabled = true;

        /* Advance step bar to show submitted */
        document.getElementById('p4aStep2').classList.remove('active');
        document.getElementById('p4aStep2').classList.add('done');
        document.getElementById('p4aStep2').querySelector('.p4a-step-circle').innerHTML = '<i class="bi bi-check-lg"></i>';

        /* After 4s simulate approval (demo only — in production this waits for email) */
        setTimeout(() => {
            document.getElementById('p4aReviewResult').style.display  = 'none';
            document.getElementById('p4aSuccessResult').style.display = 'block';
            isLicenseVerified = true;

            document.getElementById('p4aPayBtn').disabled = false;
            document.getElementById('p4aStepLine2').classList.add('done');
            document.getElementById('p4aStep3').classList.add('active');
            btn.innerHTML = '<i class="bi bi-patch-check-fill"></i> Verified';
        }, 4000);

    }, 1800);
}

/* Reset all verification UI to initial state */
function resetVerificationUI() {
    isLicenseVerified = false;

    /* Fields */
    ['p4aLicenseNum','p4aLicenseExpiry'].forEach(id => {
        const el = document.getElementById(id);
        el.value = '';
        el.className = id === 'p4aLicenseExpiry' ? 'p4a-input no-icon' : 'p4a-input';
    });
    document.getElementById('p4aLicenseCode').value = '';
    document.getElementById('p4aSecondIDType').value = '';
    document.getElementById('p4aLicenseFeedback').innerHTML = '';
    document.getElementById('p4aExpiryFeedback').innerHTML  = '';

    /* DL Uploads */
    ['Front','Back'].forEach(side => {
        const lo = side.toLowerCase();
        document.getElementById(`p4a${side}Area`).classList.remove('has-file');
        document.getElementById(`p4a${side}Title`).textContent = `Click to upload ${lo}`;
        const prev = document.getElementById(`p4a${side}Preview`);
        prev.src = ''; prev.style.display = 'none';
        document.getElementById(`p4a${side}File`).value = '';
    });

    /* Secondary ID Uploads */
    ['Front','Back'].forEach(side => {
        const lo = side.toLowerCase();
        document.getElementById(`p4aSecond${side}Area`).classList.remove('has-file');
        document.getElementById(`p4aSecond${side}Title`).textContent = `Click to upload ${lo}`;
        const prev = document.getElementById(`p4aSecond${side}Preview`);
        prev.src = ''; prev.style.display = 'none';
        document.getElementById(`p4aSecond${side}File`).value = '';
    });

    /* Selfie */
    document.getElementById('p4aSelfieArea').classList.remove('has-file');
    document.getElementById('p4aSelfieTitle').textContent = 'Click to upload selfie';
    const selfiePrev = document.getElementById('p4aSelfiePreview');
    selfiePrev.src = ''; selfiePrev.style.display = 'none';
    document.getElementById('p4aSelfieFile').value = '';

    /* Result boxes */
    ['p4aPendingResult','p4aReviewResult','p4aSuccessResult','p4aFailResult'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    /* Verify btn */
    const btn = document.getElementById('p4aVerifyBtn');
    btn.disabled  = true;
    btn.innerHTML = '<i class="bi bi-shield-lock-fill"></i> Submit for Verification';

    /* Pay btn */
    document.getElementById('p4aPayBtn').disabled = true;

    /* Step bar reset */
    document.getElementById('p4aStep2').classList.remove('done');
    document.getElementById('p4aStep2').classList.add('active');
    document.getElementById('p4aStep2').querySelector('.p4a-step-circle').textContent = '2';
    document.getElementById('p4aStepLine2').classList.remove('done');
    document.getElementById('p4aStep3').classList.remove('active');
}
/* ── Page 4a Buttons ── */
document.getElementById('p4aBackBtn').addEventListener('click', () => {
    showPage('booking');
});

document.getElementById('p4aPayBtn').addEventListener('click', () => {
    // For "self" driver role: only requires account verification
    if (driverRoleChoice === 'self') {
        if (!isAccountVerified) return;
        openPaymentPage();
        return;
    }
    // For "another driver" role: requires license verification
    if (!isLicenseVerified) return;
    /* Navigate to your payment page here when ready */
   openPaymentPage();
    /* NOTE: replace 'showPage("4b")' with your actual Page 4b call once built */
});

/* ════════════════════════════════════════
   PAGE 4B — PAYMENT METHOD LOGIC
════════════════════════════════════════ */

let p4bDownPayment   = 0;
let p4bRemaining     = 0;
let p4bGrandTotal    = 0;
let p4bRemainMethod  = null;
let p4bDownPaid      = false;
const SECURITY_DEPOSIT = 5000;

/* ── Open Page 4b and populate amounts ── */
function openPaymentPage() {
    const car        = carsData.find(c => c.id === selectedCarId);
    if (!car) return;

    const days       = selectedDays;
    const carSub     = car.price * days;
    const driverFee  = driverOption === 'with' ? 800 * days : 0;
    const addonTotal = Object.values(selectedAddons).reduce((a,b) => a+b, 0) * days;
    const subtotal   = carSub + driverFee + addonTotal;
    const serviceFee = Math.round(subtotal * 0.08);
    const total      = subtotal + serviceFee + 200;

    p4bGrandTotal  = total;
    p4bDownPayment = Math.round(total * 0.30);
    p4bRemaining   = total - p4bDownPayment;

    /* Reset state */
    p4bDownPaid     = false;
    p4bRemainMethod = null;

    /* Amounts display */
    document.getElementById('p4bGrandTotal').textContent    = formatPrice(p4bGrandTotal);
    document.getElementById('p4bDownPayAmt').textContent    = formatPrice(p4bDownPayment);
    document.getElementById('p4bRemainingAmt').textContent  = formatPrice(p4bRemaining);
    document.getElementById('p4bModalAmt').textContent      = formatPrice(p4bDownPayment);
    document.getElementById('p4bFinalTotal').textContent    = formatPrice(p4bGrandTotal);
    document.getElementById('p4bFinalDown').textContent     = formatPrice(p4bDownPayment);
    document.getElementById('p4bFinalRemain').textContent   = formatPrice(p4bRemaining);
    document.getElementById('p4bRemainingBankAmt').textContent  = formatPrice(p4bRemaining);
    document.getElementById('p4bRemainingBankAmt2').textContent = formatPrice(p4bRemaining);
    const pickupDue = p4bRemaining + SECURITY_DEPOSIT;
    document.getElementById('p4bFinalPickup').textContent   = formatPrice(pickupDue);
    document.getElementById('p4bDepositAmt').textContent    = formatPrice(SECURITY_DEPOSIT);

    /* Generate a mock reference number */
    const ref = 'MLB-' + Date.now().toString().slice(-8);
    document.getElementById('p4bModalRef').textContent  = ref;
    document.getElementById('p4bRefDisplay').textContent = ref;

    /* Reset UI */
    document.getElementById('p4bPaidPill').classList.remove('show');
    document.getElementById('p4bPayOnlineBtn').disabled = false;
    document.getElementById('p4bPayOnlineBtn').innerHTML =
        '<i class="bi bi-box-arrow-up-right"></i> Proceed to Online Bank Transfer';
    document.getElementById('p4bRemainingSection').style.opacity       = '0.45';
    document.getElementById('p4bRemainingSection').style.pointerEvents = 'none';
    document.getElementById('p4bContractBtn').disabled = true;
    document.getElementById('p4bCashNote').classList.remove('show');
    document.getElementById('p4bRemainingBank').classList.remove('show');

    /* Reset method cards */
    ['p4bMethodCash','p4bMethodBank'].forEach(id =>
        document.getElementById(id).classList.remove('selected')
    );

    /* Reset proof upload */
    document.getElementById('p4bProofArea').style.borderColor = '#cbd5e1';
    document.getElementById('p4bProofArea').style.background  = '#fafafa';
    document.getElementById('p4bProofIcon').style.color       = '#cbd5e1';
    document.getElementById('p4bProofTitle').textContent      = 'Click to upload receipt / screenshot';
    document.getElementById('p4bProofPreview').style.display  = 'none';
    document.getElementById('p4bProofFile').value = '';

    showPage('payment');
}

/* ── Copy text helper ── */
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
    });
}

/* ── Open simulated payment modal ── */
function openPaymentModal() {
    document.getElementById('p4bPaymentModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

/* ── Close payment modal ── */
function closePaymentModal() {
    document.getElementById('p4bPaymentModal').classList.remove('show');
    document.body.style.overflow = '';
}

/* ── Confirm down payment ── */
function confirmDownPayment() {
    closePaymentModal();
    p4bDownPaid = true;

    /* Show paid pill */
    document.getElementById('p4bPaidPill').classList.add('show');

    /* Disable online pay button */
    const btn = document.getElementById('p4bPayOnlineBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Down Payment Confirmed';
    btn.style.background = 'linear-gradient(135deg, #028a5d 0%, #016b48 100%)';

    /* Unlock remaining balance section */
    document.getElementById('p4bRemainingSection').style.opacity       = '1';
    document.getElementById('p4bRemainingSection').style.pointerEvents = 'auto';

    checkP4bContractBtn();
}

/* ── Proof of payment upload ── */
function handleProofUpload(input) {
    const file = input.files[0];
    if (!file) return;
    const area    = document.getElementById('p4bProofArea');
    const icon    = document.getElementById('p4bProofIcon');
    const title   = document.getElementById('p4bProofTitle');
    const preview = document.getElementById('p4bProofPreview');

    area.style.borderColor = '#028a5d';
    area.style.background  = '#f0fdf9';
    icon.style.color       = '#028a5d';
    title.textContent = file.name.length > 26 ? file.name.slice(0,24) + '...' : file.name;

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block'; };
        reader.readAsDataURL(file);
    }
}

/* ── Select remaining balance method ── */
function selectRemainMethod(method) {
    p4bRemainMethod = method;
    document.getElementById('p4bMethodCash').classList.toggle('selected', method === 'cash');
    document.getElementById('p4bMethodBank').classList.toggle('selected', method === 'bank');
    document.getElementById('p4bCashNote').classList.toggle('show',       method === 'cash');
    document.getElementById('p4bRemainingBank').classList.toggle('show',  method === 'bank');
    checkP4bContractBtn();
}

/* ── Enable contract button only when all conditions met ── */
function checkP4bContractBtn() {
    const ready = p4bDownPaid && p4bRemainMethod !== null;
    document.getElementById('p4bContractBtn').disabled = !ready;
    if (ready) {
        document.getElementById('p4bStepLine3').classList.add('done');
        document.getElementById('p4bStep4').classList.add('active');
    }
}

/* ── Page 4b Buttons ── */
document.getElementById('p4bBackBtn').addEventListener('click', () => {
    /* Go back to Page 3 (with driver) or Page 4a (self-drive) */
    if (driverOption === 'with') {
        showPage('booking-summary');
    } else {
        showPage('self-drive-verify');
    }
});

document.getElementById('p4bContractBtn').addEventListener('click', () => {
    if (document.getElementById('p4bContractBtn').disabled) return;
    openContractPage();
});

/* ════════════════════════════════════════
   PAGE 5 — DIGITAL CONTRACT LOGIC
════════════════════════════════════════ */

let p5HasSigned   = false;
let p5HasAgreed   = false;
let p5SigDrawing  = false;
let p5SigCtx      = null;
let p5LastX       = 0;
let p5LastY       = 0;

function openContractPage() {
    const car = carsData.find(c => c.id === selectedCarId);
    if (!car) return;

    /* Generate contract reference */
    const ref  = 'MLPH-' + Date.now().toString().slice(-8).toUpperCase();
    const now  = new Date();
    const dateStr = now.toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' });

    /* Retrieve booking details from payment page state */
    const start   = document.getElementById('bdStartDate').value;
    const end     = document.getElementById('bdEndDate').value;
    const pickupT = document.getElementById('bdPickupTime').value;
    const dropoffT= document.getElementById('bdDropoffTime').value;
    const pickupL = document.getElementById('bdPickupLoc').value || car.location;
    const same    = document.getElementById('bdSameLoc').checked;
    const dropoffL= same ? pickupL : (document.getElementById('bdDropoffLoc').value || pickupL);

    /* Populate contract fields */
    document.getElementById('p5ContractRef').textContent      = ref;
    document.getElementById('p5ContractDate').textContent     = dateStr;
    document.getElementById('p5OwnerName').textContent        = car.owner;
    document.getElementById('p5ContractCar').textContent      = car.name + ' — ' + car.location;
    document.getElementById('p5ContractDriver').textContent   = driverOption === 'with' ? 'With Driver (Ricardo Cruz)' : 'Self-Drive';
    document.getElementById('p5ContractPeriod').textContent   =
        formatDateDisplay(start) + ' ' + formatTime(pickupT) + ' — ' +
        formatDateDisplay(end)   + ' ' + formatTime(dropoffT);
    document.getElementById('p5ContractDuration').textContent = selectedDays + ' day' + (selectedDays > 1 ? 's' : '');
    document.getElementById('p5ContractPickup').textContent   = pickupL;
    document.getElementById('p5ContractDropoff').textContent  = dropoffL;
    document.getElementById('p5ContractTotal').textContent    = formatPrice(p4bGrandTotal);
    document.getElementById('p5ContractDownPay').textContent  = formatPrice(p4bDownPayment) + ' (paid)';
    const pickupDue = p4bRemaining + SECURITY_DEPOSIT;
    document.getElementById('p5ContractPickupDue').textContent = formatPrice(pickupDue);

    /* Store ref for success modal */
    document.getElementById('p5SuccessRef').textContent  = ref;
    document.getElementById('p5SucCar').textContent      = car.name;
    document.getElementById('p5SucPickup').textContent   = formatDateDisplay(start) + ' at ' + formatTime(pickupT) + ' — ' + pickupL;
    document.getElementById('p5SucDropoff').textContent  = formatDateDisplay(end)   + ' at ' + formatTime(dropoffT) + ' — ' + dropoffL;
    document.getElementById('p5SucDuration').textContent = selectedDays + ' day' + (selectedDays > 1 ? 's' : '');
    document.getElementById('p5SucDriver').textContent   = driverOption === 'with' ? 'Ricardo Cruz (With Driver)' : 'Self-Drive';
    document.getElementById('p5SucTotal').textContent    = formatPrice(p4bGrandTotal);
    document.getElementById('p5SucDown').textContent     = formatPrice(p4bDownPayment);
    document.getElementById('p5SucBalance').textContent  = formatPrice(pickupDue) + ' (incl. deposit)';

    /* Reset state */
    p5HasSigned  = false;
    p5HasAgreed  = false;

    /* Reset agree checkbox */
    document.getElementById('p5AgreeChk').checked = false;
    document.getElementById('p5AgreeRow').classList.remove('checked');

    /* Lock signature card */
    document.getElementById('p5SigCard').style.opacity       = '0.45';
    document.getElementById('p5SigCard').style.pointerEvents = 'none';

    /* Disable sign button */
    document.getElementById('p5SignBtn').disabled = true;

    /* Reset TNC scroll hint */
    document.getElementById('p5TncHint').classList.remove('hidden');

    /* Init canvas */
    initSignatureCanvas();
    clearSignature();

    showPage('contract');
}

/* ── Terms scroll tracking ── */
document.addEventListener('DOMContentLoaded', () => {
    const tncBox = document.getElementById('p5TncBox');
    if (tncBox) {
        tncBox.addEventListener('scroll', () => {
            const scrolled = tncBox.scrollTop + tncBox.clientHeight;
            const total    = tncBox.scrollHeight;
            if (scrolled >= total - 30) {
                document.getElementById('p5TncHint').classList.add('hidden');
            }
        });
    }
});

/* ── Toggle agree checkbox ── */
function toggleP5Agree() {
    const chk = document.getElementById('p5AgreeChk');
    chk.checked = !chk.checked;
    p5HasAgreed = chk.checked;
    document.getElementById('p5AgreeRow').classList.toggle('checked', p5HasAgreed);

    const sigCard = document.getElementById('p5SigCard');
    sigCard.style.opacity       = p5HasAgreed ? '1'    : '0.45';
    sigCard.style.pointerEvents = p5HasAgreed ? 'auto' : 'none';

    checkP5SignBtn();
}

/* ── Signature Canvas ── */
function initSignatureCanvas() {
    const canvas = document.getElementById('p5SigCanvas');
    const dpr    = window.devicePixelRatio || 1;

    /* Remove old listeners to avoid stacking duplicates on re-init */
    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);
    const c = document.getElementById('p5SigCanvas');

    /* Size the backing store to match the CSS display size */
    const displayW = c.offsetWidth  || c.parentElement.clientWidth || 600;
    const displayH = c.offsetHeight || 180;
    c.width  = Math.round(displayW * dpr);
    c.height = Math.round(displayH * dpr);

    p5SigCtx = c.getContext('2d');
    p5SigCtx.setTransform(1, 0, 0, 1, 0, 0);
    p5SigCtx.scale(dpr, dpr);
    p5SigCtx.strokeStyle = '#0f172a';
    p5SigCtx.lineWidth   = 2.5;
    p5SigCtx.lineCap     = 'round';
    p5SigCtx.lineJoin    = 'round';

    /* Mouse events */
    c.addEventListener('mousedown',  p5SigStart);
    c.addEventListener('mousemove',  p5SigDraw);
    c.addEventListener('mouseup',    p5SigEnd);
    c.addEventListener('mouseleave', p5SigEnd);

    /* Touch events */
    c.addEventListener('touchstart',  e => { e.preventDefault(); p5SigStart(e.touches[0]); }, { passive: false });
    c.addEventListener('touchmove',   e => { e.preventDefault(); p5SigDraw(e.touches[0]);  }, { passive: false });
    c.addEventListener('touchend',    e => { p5SigEnd(); },                                    { passive: false });
}

function getCanvasPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    /* Map from screen pixels to CSS pixels (canvas ctx is already DPR-scaled) */
    return {
        x: (e.clientX - rect.left) * (canvas.offsetWidth  / rect.width),
        y: (e.clientY - rect.top)  * (canvas.offsetHeight / rect.height)
    };
}

function p5SigStart(e) {
    p5SigDrawing = true;
    const canvas = document.getElementById('p5SigCanvas');
    const pos    = getCanvasPos(canvas, e);
    p5LastX = pos.x; p5LastY = pos.y;
    p5SigCtx.beginPath();
    p5SigCtx.moveTo(p5LastX, p5LastY);
}

function p5SigDraw(e) {
    if (!p5SigDrawing) return;
    const canvas = document.getElementById('p5SigCanvas');
    const pos    = getCanvasPos(canvas, e);
    p5SigCtx.lineTo(pos.x, pos.y);
    p5SigCtx.stroke();
    p5LastX = pos.x; p5LastY = pos.y;

    /* Mark as has signature */
    if (!p5HasSigned) {
        p5HasSigned = true;
        document.getElementById('p5SigWrap').classList.add('has-sig');
        checkP5SignBtn();
    }
}

function p5SigEnd() {
    p5SigDrawing = false;
}

function clearSignature() {
    const canvas = document.getElementById('p5SigCanvas');
    if (p5SigCtx && canvas) {
        p5SigCtx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
    p5HasSigned = false;
    document.getElementById('p5SigWrap').classList.remove('has-sig');
    checkP5SignBtn();
}

function checkP5SignBtn() {
    document.getElementById('p5SignBtn').disabled = !(p5HasAgreed && p5HasSigned);
}

/* ── Sign & Confirm ── */
document.getElementById('p5SignBtn').addEventListener('click', () => {
    if (!p5HasAgreed || !p5HasSigned) return;
    showSuccessOverlay();
});

function showSuccessOverlay() {
    /* Inject confetti dots */
    const confetti  = document.getElementById('p5Confetti');
    confetti.innerHTML = '';
    const colors = ['#1e5a6e','#028a5d','#d4cb92','#f59e0b','#0ea5e9','#a3e635'];
    for (let i = 0; i < 28; i++) {
        const dot = document.createElement('div');
        dot.className = 'p5-dot';
        dot.style.cssText = [
            'left:'       + Math.random() * 100 + '%;',
            'top:'        + Math.random() * 40  + '%;',
            'background:' + colors[Math.floor(Math.random() * colors.length)] + ';',
            'animation-delay:' + (Math.random() * 0.6).toFixed(2) + 's;',
            'animation-duration:' + (2 + Math.random()).toFixed(2) + 's;',
            'width:'  + (6 + Math.random() * 6).toFixed(0) + 'px;',
            'height:' + (6 + Math.random() * 6).toFixed(0) + 'px;'
        ].join('');
        confetti.appendChild(dot);
    }

    document.getElementById('p5SuccessOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function goToMyBookings() {
    document.getElementById('p5SuccessOverlay').classList.remove('show');
    document.body.style.overflow = '';
    window.location.href = 'booking.html';
}

function goToDashboard() {
    document.getElementById('p5SuccessOverlay').classList.remove('show');
    document.body.style.overflow = '';
    window.location.href = 'dashboard.html';
}

/* ── Page 5 Back Button ── */
document.getElementById('p5BackBtn').addEventListener('click', () => {
    showPage('payment');
});



/* ── Page 3 Buttons ── */
document.getElementById('p3BackBtn').addEventListener('click', () => {
    showPage('booking');
});

document.getElementById('p3ContinuePayBtn').addEventListener('click', () => {
    // Navigates to Page 4b — wire this to your payment page when ready
    openPaymentPage();
    // NOTE: replace 'showPage("4b")' with your actual Page 4b call once built
});


document.getElementById('confirmCloseBtn').addEventListener('click', () => {
    document.getElementById('confirmModal').classList.remove('show');
    document.body.style.overflow = '';
    showPage('browse');
});

document.getElementById('backToBrowse').addEventListener('click', () => showPage('browse'));

/* ════════════════════════════════════════
   MOBILE SIDEBAR
════════════════════════════════════════ */
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
});
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
});

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
sortCars();
renderCars();
/* ════════════════════════════════════════
   DEEP LINK — open booking from dashboard
════════════════════════════════════════ */
(function handleDeepLink() {
    const carId = parseInt(localStorage.getItem('deepLinkCarId'));
    if (!carId) return;
    localStorage.removeItem('deepLinkCarId'); // clean up so it doesn't re-trigger on refresh
    const car = carsData.find(c => c.id === carId);
    if (!car || !car.available) return;
    openBookingPage(carId);
})();