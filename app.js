/* JavaScript for Pamville Junior School Nsangi Promotional Platform */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Sticky Navbar & Shrink on Scroll
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 2. Active Link on Scroll (Navbar Navigation)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-item a');

  const highlightNav = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset for sticky navbar
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}` || (link.getAttribute('href') === '#' && sectionId === 'home')) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // ==========================================
  // 3. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    mobileNavToggle.classList.toggle('open', isOpen);
    navMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  mobileNavToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking a nav item
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu if window is resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // ==========================================
  // 4. Scroll-Driven Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================
  // 5. About Section Value Tabs
  // ==========================================
  const valueTabBtns = document.querySelectorAll('.value-tab-btn');
  const valueTabContents = document.querySelectorAll('.value-tab-content');

  valueTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      valueTabBtns.forEach(b => b.classList.remove('active'));
      valueTabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // ==========================================
  // 6. Extracurricular Accordion and Image Swap
  // ==========================================
  const accordionItems = document.querySelectorAll('.activity-accordion-item');
  const showcaseImage = document.getElementById('activity-showcase-image');
  const showcaseTitle = document.getElementById('activity-showcase-title');
  const showcaseDesc = document.getElementById('activity-showcase-desc');

  const activityData = {
    0: {
      image: 'assets/swimming.jpg',
      title: 'Swimming & Athletics',
      desc: 'Active swimming and water safety lessons in our custom-designed pool.',
      alt: 'Pupils splashing water in the swimming pool'
    },
    1: {
      image: 'assets/computer_lab.jpg',
      title: 'Clubs & Creative Pursuits',
      desc: 'Equipping children with essential computer skills and early digital literacy in our modern ICT lab.',
      alt: 'Pupils learning in the computer lab'
    },
    2: {
      image: 'assets/tailoring.jpg',
      title: 'Tailoring & Handcrafts',
      desc: 'Developing hands-on vocational capabilities, sewing, and creative design skills.',
      alt: 'Pupils practicing tailoring on sewing machines'
    }
  };

  accordionItems.forEach((item, index) => {
    const headerElement = item.querySelector('.activity-header');
    headerElement.addEventListener('click', () => {
      // Toggle current panel
      const isActive = item.classList.contains('active');
      
      // Close all accordions
      accordionItems.forEach(ai => {
        ai.classList.remove('active');
        ai.querySelector('.activity-panel').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        const panel = item.querySelector('.activity-panel');
        panel.style.maxHeight = panel.scrollHeight + "px";
        
        // Swap media showcase content
        showcaseImage.style.opacity = 0;
        setTimeout(() => {
          showcaseImage.src = activityData[index].image;
          showcaseImage.alt = activityData[index].alt;
          showcaseTitle.textContent = activityData[index].title;
          showcaseDesc.textContent = activityData[index].desc;
          showcaseImage.style.opacity = 1;
        }, 300);
      }
    });
  });

  // ==========================================
  // 7. School Activities Gallery Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterBtns.forEach(fb => fb.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ==========================================
  // 8. Testimonials Carousel Slider
  // ==========================================
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  let currentSlideIndex = 0;
  let autoplayTimer;

  // Create dot indicators
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');

  const moveToSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentSlideIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    // Reset autoplay timers
    resetAutoplay();
  };

  prevBtn.addEventListener('click', () => moveToSlide(currentSlideIndex - 1));
  nextBtn.addEventListener('click', () => moveToSlide(currentSlideIndex + 1));

  // Autoplay function
  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      moveToSlide(currentSlideIndex + 1);
    }, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();

  // ==========================================
  // 9. Modal Control Utilities (Apply & Visit)
  // ==========================================
  const applyModal = document.getElementById('apply-modal');
  const visitModal = document.getElementById('visit-modal');
  
  const openModal = (modal) => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = (modal) => {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto'; // Re-enable background scroll
  };

  // Attach show modal buttons
  document.querySelectorAll('.show-apply-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resetApplyForm();
      openModal(applyModal);
    });
  });

  document.querySelectorAll('.show-visit-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resetVisitModal();
      openModal(visitModal);
    });
  });

  // Attach close buttons
  document.getElementById('close-apply-modal').addEventListener('click', () => closeModal(applyModal));
  document.getElementById('close-visit-modal').addEventListener('click', () => closeModal(visitModal));

  // Close modal clicking outside the container
  [applyModal, visitModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ==========================================
  // 10. Multi-step Admissions Apply Form
  // ==========================================
  // ==========================================
  // Image Upload Helper
  // ==========================================
  const initImageUpload = (modalContainer) => {
    const fileInput = modalContainer.querySelector('#student-image');
    const dropzone = modalContainer.querySelector('#student-image-dropzone');
    const previewWrapper = modalContainer.querySelector('#student-image-preview-wrapper');
    const previewImg = modalContainer.querySelector('#student-image-preview');

    if (!fileInput || !dropzone || !previewWrapper || !previewImg) return;

    // Click to trigger file input
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    // Handle file select
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    // Drag-and-drop events
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        fileInput.files = files; // Assign files to input
        handleFiles(files);
      }
    }, false);

    function handleFiles(files) {
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewWrapper.style.display = 'block';
            dropzone.style.display = 'none';
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select an image file (PNG, JPG, JPEG).');
          fileInput.value = '';
        }
      }
    }

    // Remove button
    const removeBtn = modalContainer.querySelector('#btn-remove-student-image');
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = '';
        previewImg.src = '';
        previewWrapper.style.display = 'none';
        dropzone.style.display = 'flex';
      });
    }
  };

  // ==========================================
  // 10. Multi-step Admissions Apply Form
  // ==========================================
  const applyForm = document.getElementById('apply-form');
  const formSteps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.modal-step-indicator');
  const applyPrevBtn = document.getElementById('apply-prev-btn');
  const applyNextBtn = document.getElementById('apply-next-btn');
  
  let currentStep = 1;

  // Initialize image upload for initial modal HTML
  initImageUpload(applyModal);

  const updateStepUI = () => {
    const currentFormSteps = applyModal.querySelectorAll('.form-step');
    const currentStepIndicators = applyModal.querySelectorAll('.modal-step-indicator');
    const currentApplyPrevBtn = applyModal.querySelector('#apply-prev-btn');
    const currentApplyNextBtn = applyModal.querySelector('#apply-next-btn');

    currentFormSteps.forEach((step, index) => {
      if (index + 1 === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    currentStepIndicators.forEach((indicator, index) => {
      const idx = index + 1;
      indicator.classList.remove('active', 'completed');
      if (idx === currentStep) {
        indicator.classList.add('active');
      } else if (idx < currentStep) {
        indicator.classList.add('completed');
      }
    });

    // Handle back button visibility
    if (currentStep === 1) {
      if (currentApplyPrevBtn) currentApplyPrevBtn.style.visibility = 'hidden';
    } else {
      if (currentApplyPrevBtn) currentApplyPrevBtn.style.visibility = 'visible';
    }

    // Handle next button text
    if (currentStep === 3) {
      if (currentApplyNextBtn) currentApplyNextBtn.textContent = 'Submit Application';
      
      // Populate review values
      document.getElementById('review-student-name').textContent = document.getElementById('student-name').value;
      const gradeSelect = document.getElementById('student-grade');
      document.getElementById('review-student-level').textContent = gradeSelect.options[gradeSelect.selectedIndex].text;
      
      const classSelect = document.getElementById('student-class');
      document.getElementById('review-student-class').textContent = classSelect.options[classSelect.selectedIndex].text;
      const statusSelect = document.getElementById('student-status');
      document.getElementById('review-student-status').textContent = statusSelect.options[statusSelect.selectedIndex].text;
      document.getElementById('review-student-location').textContent = document.getElementById('student-location').value;
      
      document.getElementById('review-parent-name').textContent = document.getElementById('parent-name').value;
      const relSelect = document.getElementById('parent-relationship');
      document.getElementById('review-parent-relationship').textContent = relSelect.options[relSelect.selectedIndex].text;
      document.getElementById('review-parent-email').textContent = document.getElementById('parent-email').value;

      // Referral
      const referralSelect = document.getElementById('referral-source');
      document.getElementById('review-referral-source').textContent = referralSelect ? referralSelect.options[referralSelect.selectedIndex].text : '';

      // Photo
      const photoInput = document.getElementById('student-image');
      if (photoInput && photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        document.getElementById('review-student-image-name').textContent = file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgPreview = document.getElementById('review-student-image-preview');
          imgPreview.src = e.target.result;
          imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        document.getElementById('review-student-image-name').textContent = 'None';
        document.getElementById('review-student-image-preview').style.display = 'none';
      }
    } else {
      if (currentApplyNextBtn) currentApplyNextBtn.textContent = 'Next Step';
    }
  };

  const validateStep = (stepNum) => {
    const currentFormSteps = applyModal.querySelectorAll('.form-step');
    const activeInputs = currentFormSteps[stepNum - 1].querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    activeInputs.forEach(input => {
      if (!input.value) {
        isValid = false;
        if (input.type === 'file') {
          const dropzone = applyModal.querySelector('#student-image-dropzone');
          if (dropzone) {
            dropzone.style.borderColor = 'red';
            const clearDropzoneBorder = () => {
              dropzone.style.borderColor = '';
              input.removeEventListener('change', clearDropzoneBorder);
            };
            input.addEventListener('change', clearDropzoneBorder);
          }
        } else {
          input.style.borderColor = 'red';
          const removeBorder = () => {
            input.style.borderColor = '';
            input.removeEventListener('input', removeBorder);
          };
          input.addEventListener('input', removeBorder);
          if (input.tagName === 'SELECT') {
            input.addEventListener('change', removeBorder);
          }
        }
      }
    });
    
    return isValid;
  };

  applyNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      if (validateStep(currentStep)) {
        currentStep++;
        updateStepUI();
      }
    } else {
      // Final submission check
      if (validateStep(3)) {
        submitApplication();
      }
    }
  });

  applyPrevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      currentStep--;
      updateStepUI();
    }
  });

  const submitApplication = () => {
    const sName = document.getElementById('student-name')?.value || '';
    const sDob = document.getElementById('student-dob')?.value || '';
    const sGradeEl = document.getElementById('student-grade');
    const sGrade = sGradeEl ? sGradeEl.options[sGradeEl.selectedIndex].text : '';
    
    const sClassEl = document.getElementById('student-class');
    const sClass = sClassEl ? sClassEl.options[sClassEl.selectedIndex].text : '';
    const sStatusEl = document.getElementById('student-status');
    const sStatus = sStatusEl ? sStatusEl.options[sStatusEl.selectedIndex].text : '';
    const sLocation = document.getElementById('student-location')?.value || '';

    const pName = document.getElementById('parent-name')?.value || '';
    const pRelEl = document.getElementById('parent-relationship');
    const pRel = pRelEl ? pRelEl.options[pRelEl.selectedIndex].text : '';
    const pPhone = document.getElementById('parent-phone')?.value || '';
    const pEmail = document.getElementById('parent-email')?.value || '';

    // Get referral
    const referralSelect = document.getElementById('referral-source');
    const referral = referralSelect ? referralSelect.options[referralSelect.selectedIndex].text : 'Not provided';

    // Get photo filename
    const photoInput = document.getElementById('student-image');
    const photoName = photoInput && photoInput.files && photoInput.files[0] ? photoInput.files[0].name : 'Not provided';

    const rawSubject = `Admissions Application: ${sName} (${sClass} - ${sStatus})`;
    const rawBody = `PAMVILLE SCHOOLS NSANGI - ADMISSION APPLICATION\n\n` +
      `Student Details:\n` +
      `- Student's Full Name: ${sName}\n` +
      `- Date of Birth: ${sDob}\n` +
      `- Desired Grade Level: ${sGrade}\n` +
      `- Specific Class: ${sClass}\n` +
      `- Day or Boarding: ${sStatus}\n` +
      `- Exact Residential Location: ${sLocation}\n` +
      `- Student Photo File Name: ${photoName}\n` +
      `  (IMPORTANT: Please attach the photo file "${photoName}" to this email draft before sending.)\n\n` +
      `Parent/Guardian Details:\n` +
      `- Parent/Guardian Full Name: ${pName}\n` +
      `- Relationship to Student: ${pRel}\n` +
      `- Contact Phone: ${pPhone}\n` +
      `- Email Address: ${pEmail}\n` +
      `- Referral Source (How they found website): ${referral}\n\n` +
      `Note: Reassurance banner displayed: "Pamville is staffed with highly qualified, certified educators. All staff undergo rigorous screening, background verification, and routine safety trainings including Child Protection and First Aid to deliver care of the highest professional standard."`;

    const emailSubject = encodeURIComponent(rawSubject);
    const emailBody = encodeURIComponent(rawBody);
    const recipients = "pamvilleschoolsnsangi@gmail.com,info@pamville.ac.ug,rioreagan13212@gmail.com";

    const mailtoLink = `mailto:${recipients}?subject=${emailSubject}&body=${emailBody}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&su=${emailSubject}&body=${emailBody}`;
    const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${recipients}&subject=${emailSubject}&body=${emailBody}`;
    const yahooLink = `https://compose.mail.yahoo.com/?to=${recipients}&subj=${emailSubject}&body=${emailBody}`;

    const modalBody = applyModal.querySelector('.modal-body');
    const modalFooter = applyModal.querySelector('.modal-footer');
    
    modalBody.innerHTML = `
      <div class="success-screen" style="text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div class="success-icon" style="color: var(--secondary); font-size: 3rem;"><i class="fa-solid fa-circle-check"></i></div>
        <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 700;">Application Details Ready!</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 450px; margin: 0 auto;">Select your preferred email provider below to open the draft. (Remember to attach the student's photo file to the email before sending!)</p>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; width: 100%; margin-top: 0.5rem;">
          <a href="${gmailLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #ea4335; color: #ea4335;">
            <i class="fa-brands fa-google"></i> Gmail (Web)
          </a>
          <a href="${outlookLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #0078d4; color: #0078d4;">
            <i class="fa-regular fa-envelope"></i> Outlook (Web)
          </a>
          <a href="${yahooLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #6001d2; color: #6001d2;">
            <i class="fa-brands fa-yahoo"></i> Yahoo Mail (Web)
          </a>
          <a href="${mailtoLink}" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem;">
            <i class="fa-solid fa-desktop"></i> Default Mail App
          </a>
        </div>
        
        <div style="width: 100%; border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: 0.5rem;">
          <button class="btn btn-outline" id="btn-copy-application-data" style="width: 100%; display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 1rem; font-size: 0.9rem;">
            <i class="fa-solid fa-copy"></i> Copy Email Details to Clipboard
          </button>
          <div id="copy-feedback" style="display: none; font-size: 0.85rem; color: var(--accent); font-weight: 700; margin-top: 0.25rem;">Copied successfully! You can paste this in your email.</div>
        </div>
        
        <button class="btn btn-outline" id="btn-close-apply-success" style="margin-top: 0.5rem; width: 100%;">Close & Return</button>
      </div>
    `;
    
    modalFooter.style.display = 'none';
    
    document.getElementById('btn-close-apply-success').addEventListener('click', () => {
      closeModal(applyModal);
    });

    document.getElementById('btn-copy-application-data').addEventListener('click', () => {
      const copyText = `To: ${recipients}\nSubject: ${rawSubject}\n\n${rawBody}`;
      navigator.clipboard.writeText(copyText).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
          feedback.style.display = 'block';
          setTimeout(() => { feedback.style.display = 'none'; }, 3000);
        }
      }).catch(err => {
        alert('Failed to copy text. Please select and copy manually.');
      });
    });
  };

  const resetApplyForm = () => {
    const modalContainer = applyModal.querySelector('.modal-container');
    
    // Restore original HTML
    modalContainer.innerHTML = `
      <div class="modal-header">
        <h3>Admission Application</h3>
        <button class="modal-close-btn" id="close-apply-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-steps">
          <div class="modal-step-indicator active" id="indicator-1">1</div>
          <div class="modal-step-indicator" id="indicator-2">2</div>
          <div class="modal-step-indicator" id="indicator-3">3</div>
        </div>
        
        <form id="apply-form">
          <div class="form-step active" id="step-1">
            <h4 style="font-family:'Plus Jakarta Sans'; font-size:1.15rem; font-weight:700;">Student Information</h4>
            <div class="form-group">
              <label class="form-label" for="student-name">Student's Full Name</label>
              <input class="form-input" type="text" id="student-name" required placeholder="Alex Doe">
            </div>
            <div class="form-group">
              <label class="form-label" for="student-dob">Date of Birth</label>
              <input class="form-input" type="date" id="student-dob" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="student-grade">Desired Grade Level</label>
              <select class="form-input" id="student-grade" required>
                <option value="" disabled selected>Select Level/Grade</option>
                <option value="daycare">Daycare (Babies)</option>
                <option value="nursery">Nursery & Pre-School</option>
                <option value="primary-lower">Primary Lower (P1 - P3)</option>
                <option value="primary-upper">Primary Upper (P4 - P7)</option>
              </select>
            </div>
            <!-- Specific Class Dropdown -->
            <div class="form-group">
              <label class="form-label" for="student-class">Specific Class</label>
              <select class="form-input" id="student-class" required>
                <option value="" disabled selected>Select Specific Class</option>
                <option value="baby-class">Baby Class (Daycare)</option>
                <option value="middle-class">Middle Class (Nursery)</option>
                <option value="top-class">Top Class (Pre-School)</option>
                <option value="p1">Primary One (P.1)</option>
                <option value="p2">Primary Two (P.2)</option>
                <option value="p3">Primary Three (P.3)</option>
                <option value="p4">Primary Four (P.4)</option>
                <option value="p5">Primary Five (P.5)</option>
                <option value="p6">Primary Six (P.6)</option>
                <option value="p7">Primary Seven (P.7)</option>
              </select>
            </div>
            <!-- Enrollment Type (Day/Boarding) -->
            <div class="form-group">
              <label class="form-label" for="student-status">Enrollment Type</label>
              <select class="form-input" id="student-status" required>
                <option value="" disabled selected>Select Day or Boarding</option>
                <option value="day">Day Scholar</option>
                <option value="boarding">Boarding Section</option>
              </select>
            </div>
            <!-- Student Residence Location -->
            <div class="form-group">
              <label class="form-label" for="student-location">Exact Residential Location (Town/Village)</label>
              <input class="form-input" type="text" id="student-location" required placeholder="e.g. Nsangi Town, Kyengera, Maya">
            </div>
            <!-- Student Photo Upload -->
            <div class="form-group">
              <label class="form-label" for="student-image">Student's Photo</label>
              <div class="image-upload-container">
                <input type="file" id="student-image" accept="image/*" style="display: none;" required>
                <div class="image-upload-dropzone" id="student-image-dropzone">
                  <i class="fa-solid fa-cloud-arrow-up dropzone-icon"></i>
                  <span class="dropzone-text">Click or drag photo here to upload</span>
                  <span class="dropzone-subtext">Supports PNG, JPG, JPEG (Max 5MB)</span>
                </div>
                <div class="image-preview-wrapper" id="student-image-preview-wrapper" style="display: none;">
                  <img id="student-image-preview" src="" alt="Student Preview">
                  <button type="button" class="btn-remove-image" id="btn-remove-student-image">&times;</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-step" id="step-2">
            <h4 style="font-family:'Plus Jakarta Sans'; font-size:1.15rem; font-weight:700;">Parent / Guardian Details</h4>
            <div class="form-group">
              <label class="form-label" for="parent-name">Parent's / Immediate Guardian's Full Name</label>
              <input class="form-input" type="text" id="parent-name" required placeholder="John Doe">
            </div>
            <!-- Relationship to Student -->
            <div class="form-group">
              <label class="form-label" for="parent-relationship">Relationship to Student</label>
              <select class="form-input" id="parent-relationship" required>
                <option value="" disabled selected>Select Relationship</option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="guardian-male">Guardian (Male)</option>
                <option value="guardian-female">Guardian (Female)</option>
                <option value="other">Other Relative</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="parent-phone">Contact Phone Number</label>
              <input class="form-input" type="tel" id="parent-phone" required placeholder="+256 708 880 086">
            </div>
            <div class="form-group">
              <label class="form-label" for="parent-email">Email Address</label>
              <input class="form-input" type="email" id="parent-email" required placeholder="john@example.com">
            </div>
            <!-- Referral Source -->
            <div class="form-group">
              <label class="form-label" for="referral-source">How did you find our website?</label>
              <select class="form-input" id="referral-source" required>
                <option value="" disabled selected>Select an option</option>
                <option value="google">Google / Search Engine</option>
                <option value="social-media">Social Media (Facebook, Instagram, TikTok, etc.)</option>
                <option value="friends-family">Recommended by Friends / Family</option>
                <option value="flyer-brochure">Flyer / Brochure</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div class="form-step" id="step-3">
            <h4 style="font-family:'Plus Jakarta Sans'; font-size:1.15rem; font-weight:700;">Review Application</h4>
            <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom: 0.75rem;">Please review the provided information before finalizing your enrollment application. Admissions committee will review submissions and contact you within 3 business days.</p>
            
            <!-- Reassurance about Professional Staff -->
            <div class="staff-reassurance-card" style="background: rgba(13, 148, 136, 0.05); border-left: 4px solid var(--accent); padding: 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 1rem; font-size: 0.85rem;">
              <h5 style="color: var(--primary); font-weight: 700; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem; font-family:'Plus Jakarta Sans';">
                <i class="fa-solid fa-user-shield"></i> Safe, Professional & Responsible Staff
              </h5>
              <p style="color: var(--text-muted); margin: 0; line-height: 1.4;">
                Pamville is staffed with highly qualified, certified educators. All staff undergo rigorous screening, background verification, and routine safety trainings including Child Protection and First Aid to deliver care of the highest professional standard.
              </p>
            </div>

            <div style="background-color:var(--bg-primary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-light); font-size:0.9rem; display:flex; flex-direction:column; gap:0.5rem;">
              <div><strong>Student Name:</strong> <span id="review-student-name">-</span></div>
              <div><strong>Desired Level:</strong> <span id="review-student-level">-</span></div>
              <div><strong>Specific Class:</strong> <span id="review-student-class">-</span></div>
              <div><strong>Enrollment Type:</strong> <span id="review-student-status">-</span></div>
              <div><strong>Student Location:</strong> <span id="review-student-location">-</span></div>
              <div><strong>Student Photo:</strong> <span id="review-student-image-name">None</span></div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
                <img id="review-student-image-preview" src="" alt="Photo Preview" style="display: none; width: 60px; height: 60px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-light);">
              </div>
              <div><strong>Parent/Guardian:</strong> <span id="review-parent-name">-</span></div>
              <div><strong>Relationship:</strong> <span id="review-parent-relationship">-</span></div>
              <div><strong>Parent Email:</strong> <span id="review-parent-email">-</span></div>
              <div><strong>Referral Source:</strong> <span id="review-referral-source">-</span></div>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.75rem;">
              <input type="checkbox" id="terms-agree" required>
              <label for="terms-agree" style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">I certify that the information provided is accurate and correct.</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="apply-prev-btn" style="visibility: hidden;">Back</button>
        <button class="btn btn-primary" id="apply-next-btn">Next Step</button>
      </div>
    `;

    // Re-bind listeners
    document.getElementById('close-apply-modal').addEventListener('click', () => closeModal(applyModal));
    
    // Initialize image upload for this newly reset modal
    initImageUpload(applyModal);

    // Re-assign form DOM variables
    const newApplyForm = document.getElementById('apply-form');
    const newFormSteps = document.querySelectorAll('.form-step');
    const newStepIndicators = document.querySelectorAll('.modal-step-indicator');
    const newApplyPrevBtn = document.getElementById('apply-prev-btn');
    const newApplyNextBtn = document.getElementById('apply-next-btn');

    // Update scoping variables
    currentStep = 1;
    
    // Wire up events again
    newApplyNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep < 3) {
        if (validateStep(currentStep)) {
          currentStep++;
          updateStepUI();
        }
      } else {
        if (validateStep(3)) {
          submitApplication();
        }
      }
    });

    newApplyPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateStepUI();
      }
    });

    // Reference scoping replacements
    applyForm.id = newApplyForm.id;
    
    // Bind functions again
    const updateLocalStepUI = () => {
      newFormSteps.forEach((step, index) => {
        if (index + 1 === currentStep) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });

      newStepIndicators.forEach((indicator, index) => {
        const idx = index + 1;
        indicator.classList.remove('active', 'completed');
        if (idx === currentStep) {
          indicator.classList.add('active');
        } else if (idx < currentStep) {
          indicator.classList.add('completed');
        }
      });

      if (currentStep === 1) {
        newApplyPrevBtn.style.visibility = 'hidden';
      } else {
        newApplyPrevBtn.style.visibility = 'visible';
      }

      if (currentStep === 3) {
        newApplyNextBtn.textContent = 'Submit Application';
        document.getElementById('review-student-name').textContent = document.getElementById('student-name').value;
        const gradeSelect = document.getElementById('student-grade');
        document.getElementById('review-student-level').textContent = gradeSelect.options[gradeSelect.selectedIndex].text;
        
        const classSelect = document.getElementById('student-class');
        document.getElementById('review-student-class').textContent = classSelect.options[classSelect.selectedIndex].text;
        const statusSelect = document.getElementById('student-status');
        document.getElementById('review-student-status').textContent = statusSelect.options[statusSelect.selectedIndex].text;
        document.getElementById('review-student-location').textContent = document.getElementById('student-location').value;

        document.getElementById('review-parent-name').textContent = document.getElementById('parent-name').value;
        const relSelect = document.getElementById('parent-relationship');
        document.getElementById('review-parent-relationship').textContent = relSelect.options[relSelect.selectedIndex].text;
        document.getElementById('review-parent-email').textContent = document.getElementById('parent-email').value;

        // Referral
        const referralSelect = document.getElementById('referral-source');
        document.getElementById('review-referral-source').textContent = referralSelect ? referralSelect.options[referralSelect.selectedIndex].text : '';

        // Photo
        const photoInput = document.getElementById('student-image');
        if (photoInput && photoInput.files && photoInput.files[0]) {
          const file = photoInput.files[0];
          document.getElementById('review-student-image-name').textContent = file.name;
          const reader = new FileReader();
          reader.onload = function(e) {
            const imgPreview = document.getElementById('review-student-image-preview');
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
          };
          reader.readAsDataURL(file);
        } else {
          document.getElementById('review-student-image-name').textContent = 'None';
          document.getElementById('review-student-image-preview').style.display = 'none';
        }
      } else {
        newApplyNextBtn.textContent = 'Next Step';
      }
    };
    
    // Wire up scope updates
    newApplyNextBtn.addEventListener('click', () => updateLocalStepUI());
    newApplyPrevBtn.addEventListener('click', () => updateLocalStepUI());
  };

  // ==========================================
  // 11. Visit Modal (Calendar Scheduler)
  // ==========================================
  const visitForm = document.getElementById('visit-form');
  const calendarDays = document.querySelectorAll('.calendar-day:not(.disabled)');
  const timeSlots = document.querySelectorAll('.time-slot:not(.disabled)');
  const visitSubmitBtn = document.getElementById('visit-submit-btn');

  let selectedDate = '';
  let selectedTime = '';

  calendarDays.forEach(day => {
    day.addEventListener('click', () => {
      calendarDays.forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
      selectedDate = day.getAttribute('data-date');
    });
  });

  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      selectedTime = slot.getAttribute('data-time');
    });
  });

  const handleVisitSubmit = (visitorName, visitorEmail, date, time) => {
    const rawSubject = `School Tour Booking: ${visitorName}`;
    const rawBody = `PAMVILLE SCHOOLS NSANGI - CAMPUS TOUR BOOKING\n\n` +
      `Visitor Details:\n` +
      `- Full Name: ${visitorName}\n` +
      `- Email Address: ${visitorEmail}\n\n` +
      `Tour Schedule:\n` +
      `- Date: ${date}\n` +
      `- Time Slot: ${time}\n`;

    const emailSubject = encodeURIComponent(rawSubject);
    const emailBody = encodeURIComponent(rawBody);
    const recipients = "pamvilleschoolsnsangi@gmail.com,info@pamville.ac.ug,rioreagan13212@gmail.com";

    const mailtoLink = `mailto:${recipients}?subject=${emailSubject}&body=${emailBody}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&su=${emailSubject}&body=${emailBody}`;
    const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${recipients}&subject=${emailSubject}&body=${emailBody}`;
    const yahooLink = `https://compose.mail.yahoo.com/?to=${recipients}&subj=${emailSubject}&body=${emailBody}`;

    const modalBody = visitModal.querySelector('.modal-body');
    const modalFooter = visitModal.querySelector('.modal-footer');

    modalBody.innerHTML = `
      <div class="success-screen" style="text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div class="success-icon" style="color: var(--secondary); font-size: 3rem;"><i class="fa-solid fa-calendar-check"></i></div>
        <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 700;">Tour Booking Details Ready!</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 450px; margin: 0 auto;">Select your preferred email provider below to open the draft:</p>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; width: 100%; margin-top: 0.5rem;">
          <a href="${gmailLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #ea4335; color: #ea4335;">
            <i class="fa-brands fa-google"></i> Gmail (Web)
          </a>
          <a href="${outlookLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #0078d4; color: #0078d4;">
            <i class="fa-regular fa-envelope"></i> Outlook (Web)
          </a>
          <a href="${yahooLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #6001d2; color: #6001d2;">
            <i class="fa-brands fa-yahoo"></i> Yahoo Mail (Web)
          </a>
          <a href="${mailtoLink}" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem;">
            <i class="fa-solid fa-desktop"></i> Default Mail App
          </a>
        </div>
        
        <div style="width: 100%; border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: 0.5rem;">
          <button class="btn btn-outline" id="btn-copy-visit-data" style="width: 100%; display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 1rem; font-size: 0.9rem;">
            <i class="fa-solid fa-copy"></i> Copy Booking Details to Clipboard
          </button>
          <div id="copy-visit-feedback" style="display: none; font-size: 0.85rem; color: var(--accent); font-weight: 700; margin-top: 0.25rem;">Copied successfully! You can paste this in your email.</div>
        </div>
        
        <button class="btn btn-outline" id="btn-close-visit-success" style="margin-top: 0.5rem; width: 100%;">Close & Return</button>
      </div>
    `;

    modalFooter.style.display = 'none';

    document.getElementById('btn-close-visit-success').addEventListener('click', () => {
      closeModal(visitModal);
    });

    document.getElementById('btn-copy-visit-data').addEventListener('click', () => {
      const copyText = `To: ${recipients}\nSubject: ${rawSubject}\n\n${rawBody}`;
      navigator.clipboard.writeText(copyText).then(() => {
        const feedback = document.getElementById('copy-visit-feedback');
        if (feedback) {
          feedback.style.display = 'block';
          setTimeout(() => { feedback.style.display = 'none'; }, 3000);
        }
      }).catch(err => {
        alert('Failed to copy text. Please select and copy manually.');
      });
    });
  };

  visitSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check selections
    if (!selectedDate) {
      alert('Please select a date from the calendar.');
      return;
    }
    if (!selectedTime) {
      alert('Please select an available time slot.');
      return;
    }

    const visitorName = document.getElementById('visitor-name').value;
    const visitorEmail = document.getElementById('visitor-email').value;

    if (!visitorName || !visitorEmail) {
      alert('Please fill out your name and email address.');
      return;
    }

    handleVisitSubmit(visitorName, visitorEmail, selectedDate, selectedTime);

    modalFooter.style.display = 'none';

    document.getElementById('btn-close-visit-success').addEventListener('click', () => {
      closeModal(visitModal);
    });
  });

  const resetVisitModal = () => {
    const modalContainer = visitModal.querySelector('.modal-container');
    modalContainer.innerHTML = `
      <div class="modal-header">
        <h3>Book a School Tour</h3>
        <button class="modal-close-btn" id="close-visit-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="visit-form">
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem;">Select an available date and morning/afternoon time slot for your parent-guided tour of the Pamville campus.</p>
          
          <label class="form-label" style="font-size:0.8rem;">Select Date (June/July 2026)</label>
          <div class="calendar-grid">
            <div class="calendar-header-day">M</div>
            <div class="calendar-header-day">T</div>
            <div class="calendar-header-day">W</div>
            <div class="calendar-header-day">T</div>
            <div class="calendar-header-day">F</div>
            <div class="calendar-header-day">S</div>
            <div class="calendar-header-day">S</div>
            
            <div class="calendar-day disabled"></div>
            <div class="calendar-day disabled"></div>
            <div class="calendar-day disabled"></div>
            <div class="calendar-day disabled"></div>
            <div class="calendar-day" data-date="2026-06-19">19</div>
            <div class="calendar-day disabled">20</div>
            <div class="calendar-day disabled">21</div>
            
            <div class="calendar-day" data-date="2026-06-22">22</div>
            <div class="calendar-day" data-date="2026-06-23">23</div>
            <div class="calendar-day" data-date="2026-06-24">24</div>
            <div class="calendar-day" data-date="2026-06-25">25</div>
            <div class="calendar-day" data-date="2026-06-26">26</div>
            <div class="calendar-day disabled">27</div>
            <div class="calendar-day disabled">28</div>
            
            <div class="calendar-day" data-date="2026-06-29">29</div>
            <div class="calendar-day" data-date="2026-06-30">30</div>
            <div class="calendar-day" data-date="2026-07-01">1</div>
            <div class="calendar-day" data-date="2026-07-02">2</div>
            <div class="calendar-day" data-date="2026-07-03">3</div>
            <div class="calendar-day disabled">4</div>
            <div class="calendar-day disabled">5</div>
          </div>
          
          <label class="form-label" style="font-size:0.8rem; margin-top:1rem;">Select Tour Time</label>
          <div class="time-slots">
            <div class="time-slot" data-time="09:00 AM">09:00 AM</div>
            <div class="time-slot" data-time="11:30 AM">11:30 AM</div>
            <div class="time-slot" data-time="02:00 PM">02:00 PM</div>
          </div>
          
          <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:1rem;">
            <div class="form-group">
              <label class="form-label" for="visitor-name">Your Full Name</label>
              <input class="form-input" type="text" id="visitor-name" required placeholder="John Doe">
            </div>
            <div class="form-group">
              <label class="form-label" for="visitor-email">Email Address</label>
              <input class="form-input" type="email" id="visitor-email" required placeholder="john@example.com">
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="justify-content: flex-end;">
        <button class="btn btn-primary" id="visit-submit-btn">Schedule Tour</button>
      </div>
    `;

    // Re-bind click event
    document.getElementById('close-visit-modal').addEventListener('click', () => closeModal(visitModal));

    // Reset scoping selections
    selectedDate = '';
    selectedTime = '';

    const newCalendarDays = modalContainer.querySelectorAll('.calendar-day:not(.disabled)');
    const newTimeSlots = modalContainer.querySelectorAll('.time-slot:not(.disabled)');
    const newVisitSubmitBtn = modalContainer.querySelector('#visit-submit-btn');

    newCalendarDays.forEach(day => {
      day.addEventListener('click', () => {
        newCalendarDays.forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
        selectedDate = day.getAttribute('data-date');
      });
    });

    newTimeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        newTimeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        selectedTime = slot.getAttribute('data-time');
      });
    });

    newVisitSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!selectedDate) {
        alert('Please select a date from the calendar.');
        return;
      }
      if (!selectedTime) {
        alert('Please select an available time slot.');
        return;
      }
      const visitorName = document.getElementById('visitor-name').value;
      const visitorEmail = document.getElementById('visitor-email').value;

      if (!visitorName || !visitorEmail) {
        alert('Please fill out your name and email address.');
        return;
      }

      handleVisitSubmit(visitorName, visitorEmail, selectedDate, selectedTime);
    });
  };

  // ==========================================
  // 12. Contact Form & Newsletter Actions
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const visitorName = document.getElementById('contact-name').value;
      const visitorEmail = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const rawSubject = `Inquiry from Website: ${subject}`;
      const rawBody = `PAMVILLE SCHOOLS NSANGI - WEBSITE CONTACT INQUIRY\n\n` +
        `Sender Details:\n` +
        `- Name: ${visitorName}\n` +
        `- Email Address: ${visitorEmail}\n\n` +
        `Inquiry Details:\n` +
        `- Subject: ${subject}\n` +
        `- Message:\n${message}\n`;

      const emailSubject = encodeURIComponent(rawSubject);
      const emailBody = encodeURIComponent(rawBody);
      const recipients = "pamvilleschoolsnsangi@gmail.com,info@pamville.ac.ug,rioreagan13212@gmail.com";

      const mailtoLink = `mailto:${recipients}?subject=${emailSubject}&body=${emailBody}`;
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&su=${emailSubject}&body=${emailBody}`;
      const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${recipients}&subject=${emailSubject}&body=${emailBody}`;
      const yahooLink = `https://compose.mail.yahoo.com/?to=${recipients}&subj=${emailSubject}&body=${emailBody}`;

      // Highlight success and give action options in place of form
      const contactCard = contactForm.closest('.contact-card');
      contactCard.innerHTML = `
        <div class="success-screen" style="padding: 1rem 0; text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
          <div class="success-icon" style="width: 60px; height: 60px; font-size: 2.2rem; display: flex; align-items: center; justify-content: center; color: var(--secondary); background-color: rgba(37, 99, 235, 0.1); border-radius: 50%;"><i class="fa-solid fa-circle-check"></i></div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">Inquiry Details Ready!</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 450px; margin: 0 auto 0.5rem auto;">Select your preferred email provider below to open the draft:</p>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; width: 100%; margin-top: 0.5rem;">
            <a href="${gmailLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #ea4335; color: #ea4335;">
              <i class="fa-brands fa-google"></i> Gmail (Web)
            </a>
            <a href="${outlookLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #0078d4; color: #0078d4;">
              <i class="fa-regular fa-envelope"></i> Outlook (Web)
            </a>
            <a href="${yahooLink}" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem; border-color: #6001d2; color: #6001d2;">
              <i class="fa-brands fa-yahoo"></i> Yahoo Mail (Web)
            </a>
            <a href="${mailtoLink}" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 0.5rem; font-size: 0.85rem;">
              <i class="fa-solid fa-desktop"></i> Default Mail App
            </a>
          </div>
          
          <div style="width: 100%; border-top: 1px solid var(--border-light); padding-top: 1rem; margin-top: 0.5rem;">
            <button class="btn btn-outline" id="btn-copy-contact-data" style="width: 100%; display: flex; align-items: center; gap: 0.5rem; justify-content: center; font-weight: 600; padding: 0.65rem 1rem; font-size: 0.9rem;">
              <i class="fa-solid fa-copy"></i> Copy Inquiry Details to Clipboard
            </button>
            <div id="copy-contact-feedback" style="display: none; font-size: 0.85rem; color: var(--accent); font-weight: 700; margin-top: 0.25rem;">Copied successfully! You can paste this in your email.</div>
          </div>
        </div>
      `;

      document.getElementById('btn-copy-contact-data').addEventListener('click', () => {
        const copyText = `To: ${recipients}\nSubject: ${rawSubject}\n\n${rawBody}`;
        navigator.clipboard.writeText(copyText).then(() => {
          const feedback = document.getElementById('copy-contact-feedback');
          if (feedback) {
            feedback.style.display = 'block';
            setTimeout(() => { feedback.style.display = 'none'; }, 3000);
          }
        }).catch(err => {
          alert('Failed to copy text. Please select and copy manually.');
        });
      });
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      
      alert(`Thank you for subscribing! Updates will be sent to: ${emailInput.value}`);
      emailInput.value = '';
    });
  }

  // ==========================================
  // 13. Admissions Media Tabs switcher
  // ==========================================
  const admissionsTabBtns = document.querySelectorAll('.admissions-tab-btn');
  const admissionsTabContents = document.querySelectorAll('.admissions-tab-content');

  admissionsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-admissions-tab');
      
      admissionsTabBtns.forEach(b => b.classList.remove('active'));
      admissionsTabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`admissions-${targetTab}`).classList.add('active');
    });
  });

});
