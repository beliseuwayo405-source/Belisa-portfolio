// PART D - FINAL SCRIPT.JS FOR YOUR REAL INDEX.HTML
// Matches all your IDs: theme-btn, gallery-img, search-input, calc-btn, etc.

document.addEventListener('DOMContentLoaded', function() {

  // === FEATURE 1 (COMPULSORY): CONTACT FORM VALIDATION + LIVE PREVIEW ===
  const form = document.getElementById('contact-form');
  const previewDiv = document.getElementById('form-preview');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function updatePreview() {
    if (nameInput.value || emailInput.value || messageInput.value) {
      previewDiv.classList.remove('hidden');
      previewDiv.innerHTML = `
        <h3>Form Preview (Live)</h3>
        <p><strong>Name:</strong> ${nameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>Message:</strong> ${messageInput.value}</p>
        <p><em>Browser demo only - no message is sent.</em></p>
      `;
    } else {
      previewDiv.classList.add('hidden');
    }
  }

  if (nameInput) nameInput.addEventListener('input', updatePreview);
  if (emailInput) emailInput.addEventListener('input', updatePreview);
  if (messageInput) messageInput.addEventListener('input', updatePreview);

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      if (nameInput.value.trim().length < 3) {
        nameError.textContent = 'Name must be at least 3 characters.';
        valid = false;
      }
      if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        emailError.textContent = 'Enter a valid email address.';
        valid = false;
      }
      if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        valid = false;
      }

      if (valid) {
        alert('Success! Thank you ' + nameInput.value + '. Form is valid - preview shown below.');
        updatePreview();
      }
    });
  }

  // === FEATURE 2: GALLERY VIEWER NEXT/PREVIOUS - ID = gallery-img ===
  const galleryImages = [
    { src: 'images/photo1.jpg', caption: 'Figure 1: Belisa Uwayo at Mulungushi University campus.' },
    { src: 'images/photo2.jpg', caption: 'Figure 2: Belisa at the parking lot taking pictures.' },
    { src: 'images/photo3.jpg', caption: 'Figure 3: Belisa after combing my hair - inside the room.' }
  ];
  let current = 0;
  const galleryImg = document.getElementById('gallery-img');
  const galleryCaption = document.getElementById('gallery-caption');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (galleryImg && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', function() {
      current = (current + 1) % galleryImages.length;
      galleryImg.src = galleryImages[current].src;
      galleryCaption.textContent = galleryImages[current].caption;
    });
    prevBtn.addEventListener('click', function() {
      current = (current - 1 + galleryImages.length) % galleryImages.length;
      galleryImg.src = galleryImages[current].src;
      galleryCaption.textContent = galleryImages[current].caption;
    });
  }

  // === FEATURE 3: DARK MODE TOGGLE - ID = theme-btn ===
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = 'Switch to Light Mode';
      } else {
        themeBtn.textContent = 'Switch to Dark Mode';
      }
    });
  }

  // === FEATURE 4: PROJECT SEARCH FILTER + EXPAND DETAILS ===
  const searchInput = document.getElementById('search-input');
  const resetFilter = document.getElementById('reset-filter');
  const filterMessage = document.getElementById('filter-message');
  const projectCards = document.querySelectorAll('.project-card');

  function filterProjects() {
    const term = searchInput.value.toLowerCase();
    let visibleCount = 0;
    projectCards.forEach(card => {
      const name = card.getAttribute('data-name').toLowerCase();
      if (name.includes(term)) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    if (filterMessage) {
      filterMessage.textContent = visibleCount === 0 ? 'No projects found.' : `${visibleCount} project(s) found.`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener