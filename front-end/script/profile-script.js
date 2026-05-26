/* ════════════════════════════════════════
   PROFILE PAGE — JAVASCRIPT
   MobiLeasePH | profile-script.js
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
'use strict';

/* ════════════════════════════════════════
   MOBILE SIDEBAR
════════════════════════════════════════ */
const mobileMenuBtn   = document.getElementById('mobileMenuBtn');
const sidebar         = document.getElementById('sidebar');
const sidebarOverlay  = document.getElementById('sidebarOverlay');

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

/* ════════════════════════════════════════
   TAB SWITCHING
════════════════════════════════════════ */
document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = document.getElementById(`tab-${target}`);
        if (panel) panel.classList.add('active');
    });
});

/* ════════════════════════════════════════
   EDIT / CANCEL TOGGLE
════════════════════════════════════════ */

// Store original values for cancel
const originalValues = {};

function toggleEdit(section) {
    const form    = document.getElementById(`${section}Form`);
    const btn     = document.getElementById(`edit${capitalize(section)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs  = form.querySelectorAll('.form-input');

    const isEditing = btn.classList.contains('editing');

    if (!isEditing) {
        // Save original values before editing
        originalValues[section] = {};
        inputs.forEach(input => {
            originalValues[section][input.id] = input.value;
        });

        // Enable inputs
        inputs.forEach(input => {
            input.disabled = false;
        });

        btn.classList.add('editing');
        btn.innerHTML = '<i class="bi bi-x-lg"></i> Cancel';
        if (actions) actions.style.display = 'flex';

    } else {
        cancelEdit(section);
    }
}

function cancelEdit(section) {
    const form    = document.getElementById(`${section}Form`);
    const btn     = document.getElementById(`edit${capitalize(section)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs  = form.querySelectorAll('.form-input');

    // Restore original values
    if (originalValues[section]) {
        inputs.forEach(input => {
            if (originalValues[section][input.id] !== undefined) {
                input.value = originalValues[section][input.id];
            }
        });
    }

    // Disable inputs
    inputs.forEach(input => { input.disabled = true; });

    btn.classList.remove('editing');
    btn.innerHTML = '<i class="bi bi-pencil-fill"></i> Edit';
    if (actions) actions.style.display = 'none';

    // Reset bio counter
    updateBioCounter();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ════════════════════════════════════════
   FORM SUBMISSIONS
════════════════════════════════════════ */

document.getElementById('personalForm').addEventListener('submit', e => {
    e.preventDefault();
    saveSection('personal');
});

document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    saveSection('contact');
});

function saveSection(section) {
    const form    = document.getElementById(`${section}Form`);
    const btn     = document.getElementById(`edit${capitalize(section)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs  = form.querySelectorAll('.form-input');

    // Update avatar sidebar display if personal form
    if (section === 'personal') {
        const first = document.getElementById('firstName').value.trim();
        const last  = document.getElementById('lastName').value.trim();
        const full  = `${first} ${last}`.trim();

        if (full) {
            document.getElementById('avatarName').textContent = full;
            const initials = `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
            document.getElementById('avatarInitials').textContent = initials;
            document.querySelector('.user-name').textContent = full;
            document.querySelector('.user-avatar').textContent = initials;
        }
    }

    if (section === 'contact') {
        const email = document.getElementById('email').value.trim();
        if (email) {
            document.getElementById('avatarEmail').textContent = email;
        }
    }

    // Lock inputs
    inputs.forEach(input => { input.disabled = true; });

    btn.classList.remove('editing');
    btn.innerHTML = '<i class="bi bi-pencil-fill"></i> Edit';
    if (actions) actions.style.display = 'none';

    showToast('Changes saved successfully.', 'success');
}

/* ════════════════════════════════════════
   BIO CHARACTER COUNTER
════════════════════════════════════════ */
function updateBioCounter() {
    const bio       = document.getElementById('bio');
    const bioCount  = document.getElementById('bioCharCount');
    if (bio && bioCount) {
        bioCount.textContent = bio.value.length;
    }
}

const bioTextarea = document.getElementById('bio');
if (bioTextarea) {
    bioTextarea.addEventListener('input', updateBioCounter);
    updateBioCounter(); // init
}

/* ════════════════════════════════════════
   AVATAR UPLOAD
════════════════════════════════════════ */
const avatarUpload = document.getElementById('avatarUpload');

if (avatarUpload) {
    avatarUpload.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Please upload a valid image file.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = ev => {
            const img = document.getElementById('avatarImg');
            img.src = ev.target.result;
            img.classList.add('loaded');
            document.getElementById('avatarInitials').style.display = 'none';
        };
        reader.readAsDataURL(file);
        showToast('Profile photo updated.', 'success');
    });
}

/* ════════════════════════════════════════
   PASSWORD TOGGLE VISIBILITY
════════════════════════════════════════ */
document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input    = document.getElementById(targetId);
        if (!input) return;

        if (input.type === 'password') {
            input.type = 'text';
            btn.querySelector('i').classList.replace('bi-eye', 'bi-eye-slash');
        } else {
            input.type = 'password';
            btn.querySelector('i').classList.replace('bi-eye-slash', 'bi-eye');
        }
    });
});

/* ════════════════════════════════════════
   PASSWORD STRENGTH & RULES
════════════════════════════════════════ */
const newPasswordInput    = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const changePasswordBtn   = document.getElementById('changePasswordBtn');

const rules = {
    length:  { el: document.getElementById('rule-length'),  test: v => v.length >= 8 },
    upper:   { el: document.getElementById('rule-upper'),   test: v => /[A-Z]/.test(v) },
    number:  { el: document.getElementById('rule-number'),  test: v => /[0-9]/.test(v) },
    special: { el: document.getElementById('rule-special'), test: v => /[^A-Za-z0-9]/.test(v) }
};

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const strengthColors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#028a5d', '#028a5d'];

function checkPasswordStrength(val) {
    if (!val) return 0;
    let score = 0;
    Object.values(rules).forEach(rule => { if (rule.test(val)) score++; });
    return score;
}

if (newPasswordInput) {
    newPasswordInput.addEventListener('input', () => {
        const val       = newPasswordInput.value;
        const strengthEl = document.getElementById('pwStrengthWrap');
        const fill      = document.getElementById('pwStrengthFill');
        const label     = document.getElementById('pwStrengthLabel');

        if (val.length > 0) {
            strengthEl.style.display = 'flex';
            const score = checkPasswordStrength(val);
            const pct   = (score / 4) * 100;
            fill.style.width      = `${pct}%`;
            fill.style.background = strengthColors[score] || '#ef4444';
            label.textContent     = strengthLabels[score] || 'Weak';
            label.style.color     = strengthColors[score] || '#ef4444';
        } else {
            strengthEl.style.display = 'none';
        }

        // Rule checks
        Object.entries(rules).forEach(([key, rule]) => {
            const passes = rule.test(val);
            if (rule.el) {
                rule.el.classList.toggle('pass', passes);
                const icon = rule.el.querySelector('i');
                if (icon) {
                    icon.className = passes ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
                }
            }
        });

        validatePasswordForm();
    });
}

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
        const hint = document.getElementById('confirmHint');
        const newVal  = newPasswordInput ? newPasswordInput.value : '';
        const confVal = confirmPasswordInput.value;

        if (confVal.length > 0) {
            hint.style.display = 'block';
            if (newVal === confVal) {
                hint.textContent  = 'Passwords match.';
                hint.className    = 'input-hint confirm-hint-match';
            } else {
                hint.textContent  = 'Passwords do not match.';
                hint.className    = 'input-hint confirm-hint-mismatch';
            }
        } else {
            hint.style.display = 'none';
        }

        validatePasswordForm();
    });
}

function validatePasswordForm() {
    const currentVal = document.getElementById('currentPassword').value.trim();
    const newVal     = newPasswordInput     ? newPasswordInput.value     : '';
    const confVal    = confirmPasswordInput ? confirmPasswordInput.value : '';

    const allRules   = Object.values(rules).every(r => r.test(newVal));
    const matches    = newVal === confVal && confVal.length > 0;
    const hasOld     = currentVal.length > 0;

    if (changePasswordBtn) {
        changePasswordBtn.disabled = !(hasOld && allRules && matches);
    }
}

document.getElementById('currentPassword').addEventListener('input', validatePasswordForm);

/* ════════════════════════════════════════
   SECURITY FORM SUBMISSION
════════════════════════════════════════ */
document.getElementById('securityForm').addEventListener('submit', e => {
    e.preventDefault();

    // Simulate save
    document.getElementById('currentPassword').value  = '';
    document.getElementById('newPassword').value      = '';
    document.getElementById('confirmPassword').value  = '';

    document.getElementById('pwStrengthWrap').style.display = 'none';
    document.getElementById('confirmHint').style.display    = 'none';
    if (changePasswordBtn) changePasswordBtn.disabled = true;

    // Reset rules UI
    Object.values(rules).forEach(rule => {
        if (rule.el) {
            rule.el.classList.remove('pass');
            const icon = rule.el.querySelector('i');
            if (icon) icon.className = 'bi bi-x-circle-fill';
        }
    });

    showToast('Password updated successfully.', 'success');
});

/* ════════════════════════════════════════
   DELETE ACCOUNT MODAL
════════════════════════════════════════ */
const deleteAccountBtn  = document.getElementById('deleteAccountBtn');
const deleteModal       = document.getElementById('deleteModal');
const confirmDeleteBtn  = document.getElementById('confirmDeleteBtn');

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
        deleteModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
        // Simulate delete — in production, call your API
        closeDeleteModal();
        showToast('Account deletion request submitted.', 'error');
    });
}

function closeDeleteModal() {
    deleteModal.classList.remove('show');
    document.body.style.overflow = '';
}

deleteModal.addEventListener('click', e => {
    if (e.target === deleteModal) closeDeleteModal();
});

/* ════════════════════════════════════════
   TOAST NOTIFICATION
════════════════════════════════════════ */
let toastTimer = null;

function showToast(message, type = 'success') {
    const wrap  = document.getElementById('toastWrap');
    const inner = document.getElementById('toastInner');
    const msg   = document.getElementById('toastMsg');
    const icon  = inner.querySelector('.toast-icon');

    msg.textContent = message;

    inner.classList.remove('error');
    icon.className  = 'toast-icon';

    if (type === 'error') {
        inner.classList.add('error');
        icon.className = 'bi bi-exclamation-circle-fill toast-icon';
    } else {
        icon.className = 'bi bi-check-circle-fill toast-icon';
    }

    wrap.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        wrap.classList.remove('show');
    }, 3200);
}

/* ════════════════════════════════════════
   KEYBOARD ACCESSIBILITY
════════════════════════════════════════ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (deleteModal.classList.contains('show')) {
            closeDeleteModal();
        }
    }
});
