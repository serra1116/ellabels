/* ── Mobile Sidebar Toggle ── */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  /* ── Filter Logic ── */
  function applyFilters() {
    const typeVal   = document.getElementById('filterType').value;
    const statusVal = document.getElementById('filterStatus').value;
    const cards     = document.querySelectorAll('.user-card');
    let visible = 0;

    cards.forEach(card => {
      const role   = card.getAttribute('data-role');
      const status = card.getAttribute('data-status');

      const typeMatch   = (typeVal   === 'all') || (role   === typeVal);
      const statusMatch = (statusVal === 'all') || (status === statusVal);

      if (typeMatch && statusMatch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
  }