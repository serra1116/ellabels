/* ════════════════════════════════════════
   BROWSE PAGE — COMPLETE JAVASCRIPT
   MobiLeasePH | browse-script.js
════════════════════════════════════════ */
const carsData = [
    { id: 1, name: "Toyota Vios 2024", location: "Makati City", image: "pictures/vios.jpg", price: 1800, type: "SEDAN", seats: 5, transmission: "Automatic", fuel: "Gasoline", features: ["Dashcam", "Bluetooth", "USB Charging"], rating: 4.7, trips: 48, available: true, featured: true },
    { id: 2, name: "Honda CR-V 2023", location: "Quezon City", image: "pictures/crv.jpg", price: 3500, type: "SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", features: ["GPS", "Dashcam", "4WD"], rating: 4.9, trips: 102, available: true, featured: true },
    { id: 3, name: "Toyota Innova 2024", location: "Cebu City", image: "pictures/innova.png", price: 2800, type: "MPV", seats: 8, transmission: "Automatic", fuel: "Diesel", features: ["Spacious", "Bluetooth", "Dashcam"], rating: 4.8, trips: 76, available: true },
    { id: 4, name: "Honda Civic RS 2023", location: "Taguig City", image: "pictures/civic.jpg", price: 2200, type: "SEDAN", seats: 5, transmission: "Automatic", fuel: "Gasoline", features: ["Bluetooth", "USB Charging", "Sunroof"], rating: 4.6, trips: 39, available: true },
    { id: 5, name: "Mitsubishi Montero Sport 2024", location: "Davao City", image: "pictures/montero.jpg", price: 3800, type: "SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", features: ["4WD", "GPS", "Dashcam"], rating: 4.7, trips: 55, available: true, featured: true },
    { id: 6, name: "Toyota Fortuner 2023", location: "Pasig City", image: "pictures/fortuner.jpg", price: 4200, type: "SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", features: ["4WD", "Bluetooth", "GPS"], rating: 4.9, trips: 88, available: true },
    { id: 7, name: "Suzuki Swift 2023", location: "Mandaluyong", image: "pictures/swift.jpeg", price: 1400, type: "HATCHBACK", seats: 5, transmission: "Manual", fuel: "Gasoline", features: ["Bluetooth", "Fuel Efficient"], rating: 4.5, trips: 27, available: true },
    { id: 8, name: "Ford Ranger Wildtrak 2024", location: "Cagayan de Oro", image: "pictures/ranger.jpeg", price: 3600, type: "PICKUP", seats: 5, transmission: "Automatic", fuel: "Diesel", features: ["4WD", "Tow Hook", "Dashcam"], rating: 4.8, trips: 41, available: false },
    { id: 9, name: "Hyundai Tucson 2023", location: "Pasay City", image: "pictures/tucson.jfif", price: 3200, type: "SUV", seats: 5, transmission: "Automatic", fuel: "Gasoline", features: ["Sunroof", "GPS", "Bluetooth"], rating: 4.6, trips: 33, available: true },
    { id: 10, name: "Kia Carnival 2024", location: "Paranaque City", image: "pictures/carnival.jpg", price: 4500, type: "MPV", seats: 8, transmission: "Automatic", fuel: "Diesel", features: ["Premium Sound", "USB Charging", "GPS"], rating: 4.9, trips: 19, available: true, featured: true },
    { id: 11, name: "Suzuki Ertiga 2023", location: "Antipolo City", image: "pictures/ertiga.jpg", price: 1900, type: "MPV", seats: 7, transmission: "Automatic", fuel: "Gasoline", features: ["Bluetooth", "USB Charging"], rating: 4.4, trips: 62, available: true },
    { id: 12, name: "Toyota Hilux 2024", location: "General Santos City", image: "pictures/hilux.jpg", price: 3300, type: "PICKUP", seats: 5, transmission: "Manual", fuel: "Diesel", features: ["4WD", "Tow Hook", "Cargo Bed"], rating: 4.7, trips: 58, available: true }
];

// ── State ──
let filteredCars = [...carsData];
let currentFilter = 'all';
let currentSort = 'featured';
let currentZoomIndex = 0;

// ── DOM Elements ──
const carGrid = document.getElementById('carGrid');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const searchForm = document.getElementById('searchForm');
const nameSearch = document.getElementById('nameSearch');
const locationSearch = document.getElementById('locationSearch');
const clearBtn = document.getElementById('clearBtn');
const sortSelect = document.getElementById('sortSelect');
const filterPills = document.querySelectorAll('.filter-pill');

// Zoom Elements
const zoomOverlay = document.getElementById('zoomOverlay');
const zoomCard = document.getElementById('zoomCard');
const zoomClose = document.getElementById('zoomClose');
const zoomPrev = document.getElementById('zoomPrev');
const zoomNext = document.getElementById('zoomNext');
const zoomImage = document.getElementById('zoomImage');
const zoomName = document.getElementById('zoomName');
const zoomLocation = document.getElementById('zoomLocation');
const zoomBadgeType = document.getElementById('zoomBadgeType');
const zoomBadgeStatus = document.getElementById('zoomBadgeStatus');
const zoomSpecs = document.getElementById('zoomSpecs');
const zoomTags = document.getElementById('zoomTags');
const zoomPrice = document.getElementById('zoomPrice');
const zoomRating = document.getElementById('zoomRating');
const zoomTrips = document.getElementById('zoomTrips');

// Sidebar Elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// ── Helpers ──
function formatPrice(p) { return '₱' + p.toLocaleString('en-PH'); }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }

// ── Render Cards ──
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
        <div class="car-card ${!car.available ? 'car-card--disabled' : ''}"     onclick="${car.available ? `openZoom(${idx})` : ''}">
            <div class="car-image-wrap">
                <span class="badge-type">${capitalize(car.type)}</span>
                <span class="badge-status ${car.available ? '' : 'unavailable'}">${car.available ? 'Available' : 'Unavailable'}</span>
                <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
                <div class="car-image-overlay"></div>
            </div>
            <div class="car-body">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-location"><i class="bi bi-geo-alt-fill"></i>${car.location}</p>
                <div class="car-specs">
                    <span class="spec-item"><i class="bi bi-people-fill"></i>${car.seats}</span>
                    <span class="spec-item"><i class="bi bi-gear-wide-connected"></i>${car.transmission}</span>
                    <span class="spec-item"><i class="bi bi-fuel-pump-fill"></i>${car.fuel}</span>
                </div>
                <div class="feature-tags">
                    ${car.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                </div>
                <div class="price-rating-row">
                    <div class="car-price">${formatPrice(car.price)}<span class="day-label">/day</span></div>
                    <div class="car-rating">
                        <i class="bi bi-star-fill"></i>
                        <span class="rating-val">${car.rating}</span>
                        <span>(${car.trips} trips)</span>
                    </div>
                </div>
                <button class="book-btn ${!car.available ? 'book-btn--disabled' : ''}"    onclick="event.stopPropagation()"    ${!car.available ? 'disabled' : ''}>    ${car.available ? 'Book Now' : 'Unavailable'}</button>
            </div>
        </div>
    `).join('');
}

// ── Zoom Modal Logic ──
function populateZoom(idx) {
    const car = filteredCars[idx];
    zoomImage.src = car.image;
    zoomBadgeType.textContent = capitalize(car.type);
    zoomBadgeStatus.textContent = car.available ? 'Available' : 'Unavailable';
    zoomBadgeStatus.className = 'badge-status' + (car.available ? '' : ' unavailable');
    zoomName.textContent = car.name;
    zoomLocation.textContent = car.location;
    zoomSpecs.innerHTML = `
        <span class="spec-item"><i class="bi bi-people-fill"></i>${car.seats} seats</span>
        <span class="spec-item"><i class="bi bi-gear-wide-connected"></i>${car.transmission}</span>
        <span class="spec-item"><i class="bi bi-fuel-pump-fill"></i>${car.fuel}</span>
    `;
    zoomTags.innerHTML = car.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
    zoomPrice.textContent = formatPrice(car.price);
    zoomRating.textContent = car.rating;
    zoomTrips.textContent = `(${car.trips} trips)`;
}

function openZoom(idx) {
    currentZoomIndex = idx;
    populateZoom(idx);
    zoomOverlay.classList.add('show');
    document.body.classList.add('zoom-active');
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    zoomOverlay.classList.remove('show');
    document.body.classList.remove('zoom-active');
    document.body.style.overflow = '';
}

function navigateZoom(dir) {
    do {
        currentZoomIndex = (currentZoomIndex + dir + filteredCars.length) % filteredCars.length;
    } while (!filteredCars[currentZoomIndex].available);

    // Reset animation
    zoomCard.style.animation = 'none';
    zoomCard.offsetHeight; // trigger reflow
    zoomCard.style.animation = '';
    
    populateZoom(currentZoomIndex);
}

// ── Filter & Sort Logic ──
function applyFilters() {
    const nameQ = nameSearch.value.toLowerCase().trim();
    const locQ = locationSearch.value.toLowerCase().trim();
    
    filteredCars = carsData.filter(car => {
        return (!nameQ || car.name.toLowerCase().includes(nameQ))
            && (!locQ || car.location.toLowerCase().includes(locQ))
            && (currentFilter === 'all' || car.type.toLowerCase() === currentFilter.toLowerCase());
    });
    sortCars();
    renderCars();
}

function sortCars() {
    switch (currentSort) {
        case 'price-low': filteredCars.sort((a, b) => a.price - b.price); break;
        case 'price-high': filteredCars.sort((a, b) => b.price - a.price); break;
        case 'rating': filteredCars.sort((a, b) => b.rating - a.rating); break;
        default: filteredCars.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
}

// ── Event Listeners ──
searchForm.addEventListener('submit', (e) => { e.preventDefault(); applyFilters(); });

clearBtn.addEventListener('click', () => {
    nameSearch.value = ''; 
    locationSearch.value = '';
    currentFilter = 'all';
    filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
    applyFilters();
});

sortSelect.addEventListener('change', (e) => { 
    currentSort = e.target.value; 
    sortCars(); 
    renderCars(); 
});

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.filter;
        applyFilters();
    });
});

// Zoom Controls
zoomClose.addEventListener('click', closeZoom);
zoomPrev.addEventListener('click', () => navigateZoom(-1));
zoomNext.addEventListener('click', () => navigateZoom(1));
zoomOverlay.addEventListener('click', (e) => { if (e.target === zoomOverlay) closeZoom(); });

document.addEventListener('keydown', (e) => {
    if (!zoomOverlay.classList.contains('show')) return;
    if (e.key === 'Escape') closeZoom();
    if (e.key === 'ArrowLeft') navigateZoom(-1);
    if (e.key === 'ArrowRight') navigateZoom(1);
});

// ── Init ──
sortCars();
renderCars();