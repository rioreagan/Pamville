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
  const applyForm = document.getElementById('apply-form');
  const formSteps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.modal-step-indicator');
  const applyPrevBtn = document.getElementById('apply-prev-btn');
  const applyNextBtn = document.getElementById('apply-next-btn');
  
  let currentStep = 1;

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
      document.getElementById('review-parent-name').textContent = document.getElementById('parent-name').value;
      document.getElementById('review-parent-email').textContent = document.getElementById('parent-email').value;
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
        input.style.borderColor = 'red';
        input.addEventListener('input', function removeBorder() {
          input.style.borderColor = '';
          input.removeEventListener('input', removeBorder);
        });
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
    const pName = document.getElementById('parent-name')?.value || '';
    const pPhone = document.getElementById('parent-phone')?.value || '';
    const pEmail = document.getElementById('parent-email')?.value || '';

    // Generate mailto link
    const emailSubject = encodeURIComponent(`Admissions Application: ${sName} (${sGrade})`);
    const emailBody = encodeURIComponent(
      `PAMVILLE SCHOOLS NSANGI - ADMISSION APPLICATION\n\n` +
      `Student Details:\n` +
      `- Student's Full Name: ${sName}\n` +
      `- Date of Birth: ${sDob}\n` +
      `- Desired Level: ${sGrade}\n\n` +
      `Parent/Guardian Details:\n` +
      `- Parent's Full Name: ${pName}\n` +
      `- Contact Phone: ${pPhone}\n` +
      `- Email Address: ${pEmail}\n`
    );
    const mailtoLink = `mailto:pamvilleschoolsnsangi@gmail.com,info@pamville.ac.ug,rioreagan13212@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // Generate WhatsApp link
    const waText = encodeURIComponent(
      `*PAMVILLE SCHOOLS NSANGI - ADMISSION APPLICATION*\n\n` +
      `*Student Details:*\n` +
      `• Student's Full Name: ${sName}\n` +
      `• Date of Birth: ${sDob}\n` +
      `• Desired Level: ${sGrade}\n\n` +
      `*Parent/Guardian Details:*\n` +
      `• Parent's Full Name: ${pName}\n` +
      `• Contact Phone: ${pPhone}\n` +
      `• Email Address: ${pEmail}`
    );
    const waLink = `https://wa.me/256708880086?text=${waText}`;

    // Automatically dispatch messages on both sides
    window.open(waLink, '_blank');
    window.location.href = mailtoLink;

    const modalBody = applyModal.querySelector('.modal-body');
    const modalFooter = applyModal.querySelector('.modal-footer');
    
    modalBody.innerHTML = `
      <div class="success-screen" style="text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div class="success-icon" style="color: var(--secondary); font-size: 3rem;"><i class="fa-solid fa-circle-check"></i></div>
        <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 700;">Application Submitted!</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 400px; margin: 0 auto;">We have automatically opened WhatsApp and your default Email client to send the details. If they did not launch, please click below to send them manually:</p>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; width: 100%;">
          <a href="${waLink}" target="_blank" class="btn btn-secondary" style="background-color: #25d366; border-color: #25d366; color: white; display: flex; align-items: center; gap: 0.5rem; justify-content: center; flex: 1; min-width: 160px; font-weight: 600; padding: 0.75rem 1rem;">
            <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
          </a>
          <a href="${mailtoLink}" target="_blank" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; flex: 1; min-width: 160px; font-weight: 600; padding: 0.75rem 1rem;">
            <i class="fa-regular fa-envelope"></i> Send via Email
          </a>
        </div>
        
        <button class="btn btn-outline" id="btn-close-apply-success" style="margin-top: 1rem; width: 100%;">Close & Return</button>
      </div>
    `;
    
    modalFooter.style.display = 'none';
    
    document.getElementById('btn-close-apply-success').addEventListener('click', () => {
      closeModal(applyModal);
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
              <label class="form-label" for="student-grade">Desired Level</label>
              <select class="form-input" id="student-grade" required>
                <option value="" disabled selected>Select Level/Grade</option>
                <option value="daycare">Daycare (Babies)</option>
                <option value="nursery">Nursery & Pre-School</option>
                <option value="primary-lower">Primary Lower (P1 - P3)</option>
                <option value="primary-upper">Primary Upper (P4 - P7)</option>
              </select>
            </div>
          </div>
          
          <div class="form-step" id="step-2">
            <h4 style="font-family:'Plus Jakarta Sans'; font-size:1.15rem; font-weight:700;">Parent / Guardian Details</h4>
            <div class="form-group">
              <label class="form-label" for="parent-name">Parent's Full Name</label>
              <input class="form-input" type="text" id="parent-name" required placeholder="John Doe">
            </div>
            <div class="form-group">
              <label class="form-label" for="parent-phone">Contact Phone Number</label>
              <input class="form-input" type="tel" id="parent-phone" required placeholder="+256 708 880 086">
            </div>
            <div class="form-group">
              <label class="form-label" for="parent-email">Email Address</label>
              <input class="form-input" type="email" id="parent-email" required placeholder="john@example.com">
            </div>
          </div>
          
          <div class="form-step" id="step-3">
            <h4 style="font-family:'Plus Jakarta Sans'; font-size:1.15rem; font-weight:700;">Review Application</h4>
            <p style="font-size:0.95rem; color:var(--text-muted);">Please review the provided information before finalizing your enrollment application. Admissions committee will review submissions and contact you within 3 business days.</p>
            <div style="background-color:var(--bg-primary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-light); font-size:0.9rem; display:flex; flex-direction:column; gap:0.5rem;">
              <div><strong>Student Name:</strong> <span id="review-student-name">-</span></div>
              <div><strong>Desired Level:</strong> <span id="review-student-level">-</span></div>
              <div><strong>Parent Name:</strong> <span id="review-parent-name">-</span></div>
              <div><strong>Parent Email:</strong> <span id="review-parent-email">-</span></div>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
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
        document.getElementById('review-parent-name').textContent = document.getElementById('parent-name').value;
        document.getElementById('review-parent-email').textContent = document.getElementById('parent-email').value;
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
    const emailSubject = encodeURIComponent(`School Tour Booking: ${visitorName}`);
    const emailBody = encodeURIComponent(
      `PAMVILLE SCHOOLS NSANGI - CAMPUS TOUR BOOKING\n\n` +
      `Visitor Details:\n` +
      `- Full Name: ${visitorName}\n` +
      `- Email Address: ${visitorEmail}\n\n` +
      `Tour Schedule:\n` +
      `- Date: ${date}\n` +
      `- Time Slot: ${time}\n`
    );
    const mailtoLink = `mailto:pamvilleschoolsnsangi@gmail.com,info@pamville.ac.ug,rioreagan13212@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    const waText = encodeURIComponent(
      `*PAMVILLE SCHOOLS NSANGI - CAMPUS TOUR BOOKING*\n\n` +
      `*Visitor Details:*\n` +
      `• Full Name: ${visitorName}\n` +
      `• Email Address: ${visitorEmail}\n\n` +
      `*Tour Schedule:*\n` +
      `• Date: ${date}\n` +
      `• Time Slot: ${time}`
    );
    const waLink = `https://wa.me/256708880086?text=${waText}`;

    // Automatically dispatch messages on both sides
    window.open(waLink, '_blank');
    window.location.href = mailtoLink;

    const modalBody = visitModal.querySelector('.modal-body');
    const modalFooter = visitModal.querySelector('.modal-footer');

    modalBody.innerHTML = `
      <div class="success-screen" style="text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <div class="success-icon" style="color: var(--secondary); font-size: 3rem;"><i class="fa-solid fa-calendar-check"></i></div>
        <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 700;">Tour Booking Submitted!</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 400px; margin: 0 auto;">We have automatically opened WhatsApp and your default Email client to send the booking details. If they did not launch, please click below to send them manually:</p>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; width: 100%;">
          <a href="${waLink}" target="_blank" class="btn btn-secondary" style="background-color: #25d366; border-color: #25d366; color: white; display: flex; align-items: center; gap: 0.5rem; justify-content: center; flex: 1; min-width: 160px; font-weight: 600; padding: 0.75rem 1rem;">
            <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
          </a>
          <a href="${mailtoLink}" target="_blank" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; flex: 1; min-width: 160px; font-weight: 600; padding: 0.75rem 1rem;">
            <i class="fa-regular fa-envelope"></i> Send via Email
          </a>
        </div>
        
        <button class="btn btn-outline" id="btn-close-visit-success" style="margin-top: 1rem; width: 100%;">Close & Return</button>
      </div>
    `;

    modalFooter.style.display = 'none';

    document.getElementById('btn-close-visit-success').addEventListener('click', () => {
      closeModal(visitModal);
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

      // Generate mailto link
      const emailSubject = encodeURIComponent(`Inquiry from Website: ${subject}`);
      const emailBody = encodeURIComponent(
        `PAMVILLE SCHOOLS NSANGI - WEBSITE CONTACT INQUIRY\n\n` +
        `Sender Details:\n` +
        `- Name: ${visitorName}\n` +
        `- Email Address: ${visitorEmail}\n\n` +
        `Inquiry Details:\n` +
        `- Subject: ${subject}\n` +
        `- Message:\n${message}\n`
      );
      const mailtoLink = `mailto:pamvilleschoolsnsangi@gmail.com,info@pamville.ac.ug,rioreagan13212@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Generate WhatsApp link
      const waText = encodeURIComponent(
        `*PAMVILLE SCHOOLS NSANGI - WEBSITE CONTACT INQUIRY*\n\n` +
        `*Sender Details:*\n` +
        `• Name: ${visitorName}\n` +
        `• Email Address: ${visitorEmail}\n\n` +
        `*Inquiry Details:*\n` +
        `• Subject: ${subject}\n` +
        `• Message: ${message}`
      );
      const waLink = `https://wa.me/256708880086?text=${waText}`;

      // Automatically dispatch messages on both sides
      window.open(waLink, '_blank');
      window.location.href = mailtoLink;

      // Highlight success and give action options in place of form
      const contactCard = contactForm.closest('.contact-card');
      contactCard.innerHTML = `
        <div class="success-screen" style="padding: 1rem 0; text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
          <div class="success-icon" style="width: 60px; height: 60px; font-size: 2.2rem; display: flex; align-items: center; justify-content: center; color: var(--secondary); background-color: rgba(37, 99, 235, 0.1); border-radius: 50%;"><i class="fa-solid fa-circle-check"></i></div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">Inquiry Submitted!</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 400px; margin: 0 auto 0.5rem auto;">We have automatically opened WhatsApp and your default Email client to send your message. If they did not launch, please click below to send them manually:</p>
          
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; width: 100%;">
            <a href="${waLink}" target="_blank" class="btn btn-secondary" style="background-color: #25d366; border-color: #25d366; color: white; display: flex; align-items: center; gap: 0.5rem; justify-content: center; flex: 1; min-width: 150px; font-weight: 600; padding: 0.65rem 1rem; font-size: 0.9rem;">
              <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
            </a>
            <a href="${mailtoLink}" target="_blank" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; flex: 1; min-width: 150px; font-weight: 600; padding: 0.65rem 1rem; font-size: 0.9rem;">
              <i class="fa-regular fa-envelope"></i> Send via Email
            </a>
          </div>
        </div>
      `;
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
