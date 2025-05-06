// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Responsive menu behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Thank you for your message! We will contact you soon.');
            form.reset();
        });
    });
});

// Main JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });

        // Responsive menu behavior
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    });

    // Pricing switcher functionality
    if (document.querySelector('.switcher-button')) {
        document.querySelectorAll('.switcher-button').forEach(button => {
            button.addEventListener('click', function() {
                // Toggle active class
                document.querySelectorAll('.switcher-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');

                // Show/hide prices
                const showAnnual = this.dataset.tier === 'annual';
                document.querySelectorAll('.monthly-price').forEach(el => {
                    el.classList.toggle('hidden', showAnnual);
                });
                document.querySelectorAll('.annual-price').forEach(el => {
                    el.classList.toggle('hidden', !showAnnual);
                });

                // Update billing cycle text
                document.querySelectorAll('.billing-cycle').forEach(el => {
                    el.textContent = showAnnual ? 'annually' : 'monthly';
                });
            });
        });
    }

    // Booking consultation button
    const bookConsultation = document.getElementById('bookConsultation');
    if (bookConsultation) {
        bookConsultation.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Booking system would open here. For now, please use the contact form.');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cyberContactForm');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
    let currentStep = 0;

    // Initialize form
    initForm();

    // Form navigation
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                goToStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            goToStep(currentStep - 1);
        });
    });

    // Service selection shows "other" field
    document.getElementById('service').addEventListener('change', function() {
        document.getElementById('otherServiceContainer').style.display =
            this.value === 'other' ? 'block' : 'none';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            submitForm();
        }
    });

    // New inquiry button
    document.querySelector('.new-inquiry')?.addEventListener('click', initForm);

    function initForm() {
        currentStep = 0;
        steps.forEach((step, index) => {
            step.style.display = index === 0 ? 'block' : 'none';
            step.classList.toggle('active', index === 0);
        });
        updateProgress();
        form.style.display = 'block';
        document.querySelector('.confirmation-message').style.display = 'none';
        form.reset();
    }

    function goToStep(step) {
        if (step >= 0 && step < steps.length) {
            steps[currentStep].style.display = 'none';
            steps[currentStep].classList.remove('active');
            currentStep = step;
            steps[currentStep].style.display = 'block';
            steps[currentStep].classList.add('active');
            updateProgress();

            // Update response time estimate
            const urgency = document.querySelector('input[name="urgency"]:checked')?.value;
            const responseTime = urgency === 'urgent' ? '24 hours' :
                               urgency === 'critical' ? '4 hours' : '48 hours';
            document.querySelector('.response-time').textContent = responseTime;
        }
    }

    function updateProgress() {
        progressSteps.forEach((stepE1, index) => {
            stepE1.classList.toggle('active', index <= currentStep);
        });
    }

function validateStep(stepIndex) {
    const currentFields = steps[stepIndex].querySelectorAll('input, select, textarea');
    let valid = true;

    currentFields.forEach(field => {
        if (!field.checkValidity()) {
            field.classList.add('invalid');
            const errorDiv = field.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('error-message')) {
                errorDiv.textContent = field.validationMessage;
            }
            valid = false;
        } else {
            field.classList.remove('invalid');
            const errorDiv = field.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('error-message')) {
                errorDiv.textContent = '';
            }
        }
    });

    return valid;
}


    function validateForm() {
        // Validate all steps first
        for (let i = 0; i <= currentStep; i++) {
            if (!validateStep(i)) {
                goToStep(i);
                return false;
            }
        }

        // Check honeypot
        if (document.getElementById('website').value) {
            console.log('Bot detected');
            return false;
        }

        return true;
    }

    function markInvalid(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('invalid');
        formGroup.querySelector('.error-message').textContent = message;
        field.focus();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[0-9]{10,15}$/.test(phone);
    }

    function submitForm() {
        const submitButton = form.querySelector('button[type="submit"]');
        const submitText = submitButton.querySelector('.submit-text');
        const spinner = submitButton.querySelector('.loading-spinner');

        // Show loading state
        submitText.textContent = 'Sending...';
        spinner.style.display = 'inline-block';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Hide form and show confirmation
            form.style.display = 'none';
            document.querySelector('.confirmation-message').style.display = 'block';

            // Reset button state
            submitText.textContent = 'Send Message';
            spinner.style.display = 'none';
            submitButton.disabled = false;

            // Here you would normally submit the form data
            const formData = new FormData(form);
            console.log('Form data:', Object.fromEntries(formData));

            // Example AJAX call:
            /*
            fetch('/submit-form', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                form.style.display = 'none';
                document.querySelector('.confirmation-message').style.display = 'block';
            })
            .catch(error => {
                alert('Error submitting form. Please try again.');
                submitText.textContent = 'Send Message';
                spinner.style.display = 'none';
                submitButton.disabled = false;
            });
            */
        }, 1500);
    }
});