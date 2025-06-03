/**
 * Firebase Booking Integration Script
 * Integrates Firebase booking system into existing salon website
 * Compatible with existing theme and language systems
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        bookingURL: '/booking/',
        buttonText: {
            hr: 'Rezerviraj Online',
            en: 'Book Online'
        },
        modal: {
            closeOnOutsideClick: true,
            escapeKey: true
        }
    };

    // State management
    let currentLanguage = 'hr';
    let currentTheme = 'light';
    let modal = null;
    let floatingButton = null;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    function initialize() {
        console.log('🎯 Initializing Firebase Booking Integration...');
        
        // Detect current theme and language from existing page
        detectCurrentSettings();
        
        // Create floating button
        createFloatingButton();
        
        // Create modal container
        createModal();
        
        // Listen for theme/language changes on main page
        setupEventListeners();
        
        console.log('✅ Firebase Booking Integration initialized successfully');
    }

    function detectCurrentSettings() {
        // Detect theme from existing page
        const themeAttribute = document.documentElement.getAttribute('data-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (themeAttribute) {
            currentTheme = themeAttribute;
        } else if (prefersDark) {
            currentTheme = 'dark';
        }

        // Detect language from existing page
        const langAttribute = document.documentElement.getAttribute('lang');
        const currentLangElement = document.getElementById('current-lang');
        
        if (langAttribute) {
            currentLanguage = langAttribute;
        } else if (currentLangElement) {
            currentLanguage = currentLangElement.textContent.toLowerCase() === 'hr' ? 'hr' : 'en';
        }

        console.log(`🌐 Detected settings: Theme=${currentTheme}, Language=${currentLanguage}`);
    }

    function createFloatingButton() {
        // Create floating button element
        floatingButton = document.createElement('button');
        floatingButton.id = 'booking-float-btn';
        floatingButton.className = 'booking-float-btn';
        
        // Set initial text based on detected language
        updateButtonText();
        
        // Add emoji icon
        const icon = document.createElement('span');
        icon.textContent = '📅 ';
        icon.className = 'booking-icon';
        
        floatingButton.insertBefore(icon, floatingButton.firstChild);
        
        // Add click event
        floatingButton.addEventListener('click', openBookingModal);
        
        // Add CSS styles
        addFloatingButtonStyles();
        
        // Append to body
        document.body.appendChild(floatingButton);
        
        console.log('🔘 Floating button created');
    }

    function addFloatingButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .booking-float-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
                padding: 15px 25px;
                border-radius: 30px;
                background: linear-gradient(135deg, var(--color-primary, #21808d), var(--color-primary-hover, #32b8c6));
                color: var(--color-btn-primary-text, white);
                border: none;
                box-shadow: 0 5px 15px rgba(33,128,141,0.4);
                cursor: pointer;
                font-size: var(--font-size-sm, 14px);
                font-weight: var(--font-weight-medium, 500);
                font-family: var(--font-family-base, inherit);
                transition: all var(--duration-normal, 250ms) var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .booking-float-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(33,128,141,0.6);
                background: var(--color-primary-hover, #1d7480);
            }
            
            .booking-float-btn:active {
                transform: translateY(-1px);
            }
            
            .booking-icon {
                font-size: 1.2em;
            }
            
            /* Dark theme support */
            [data-theme="dark"] .booking-float-btn {
                background: linear-gradient(135deg, var(--color-primary, #32b8c6), #2ba6b4);
                color: var(--color-btn-primary-text, #134252);
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .booking-float-btn {
                    bottom: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    font-size: 13px;
                }
            }
            
            @media (max-width: 480px) {
                .booking-float-btn {
                    bottom: 15px;
                    right: 15px;
                    padding: 10px 16px;
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createModal() {
        // Create modal container
        modal = document.createElement('div');
        modal.id = 'booking-modal';
        modal.className = 'booking-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'booking-modal-content';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'booking-modal-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', closeBookingModal);
        
        // Create iframe for booking application
        const iframe = document.createElement('iframe');
        iframe.src = CONFIG.bookingURL;
        iframe.className = 'booking-iframe';
        iframe.title = 'Booking System';
        iframe.setAttribute('allow', 'geolocation; microphone; camera');
        
        // Assemble modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(iframe);
        modal.appendChild(modalContent);
        
        // Add modal styles
        addModalStyles();
        
        // Append to body
        document.body.appendChild(modal);
        
        console.log('🪟 Modal created');
    }

    function addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all var(--duration-normal, 250ms) var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
                backdrop-filter: blur(5px);
            }
            
            .booking-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .booking-modal-content {
                position: relative;
                width: 95%;
                height: 90%;
                max-width: 1200px;
                max-height: 800px;
                background: var(--color-surface, white);
                border-radius: var(--radius-lg, 12px);
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                transition: transform var(--duration-normal, 250ms) var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
            }
            
            .booking-modal.active .booking-modal-content {
                transform: scale(1);
            }
            
            .booking-modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.1);
                border: none;
                border-radius: 50%;
                font-size: 24px;
                color: var(--color-text, #333);
                cursor: pointer;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all var(--duration-fast, 150ms);
            }
            
            .booking-modal-close:hover {
                background: rgba(0, 0, 0, 0.2);
                transform: scale(1.1);
            }
            
            .booking-iframe {
                width: 100%;
                height: 100%;
                border: none;
                display: block;
            }
            
            /* Dark theme support */
            [data-theme="dark"] .booking-modal-content {
                background: var(--color-surface, #262828);
            }
            
            [data-theme="dark"] .booking-modal-close {
                background: rgba(255, 255, 255, 0.1);
                color: var(--color-text, #f5f5f5);
            }
            
            [data-theme="dark"] .booking-modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .booking-modal-content {
                    width: 98%;
                    height: 95%;
                }
                
                .booking-modal-close {
                    top: 10px;
                    right: 10px;
                    width: 35px;
                    height: 35px;
                    font-size: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function setupEventListeners() {
        // Listen for ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && CONFIG.modal.escapeKey) {
                closeBookingModal();
            }
        });
        
        // Listen for outside click
        if (CONFIG.modal.closeOnOutsideClick) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeBookingModal();
                }
            });
        }
        
        // Listen for theme changes on main page
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                    console.log('🎨 Theme changed to:', currentTheme);
                }
                
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    currentLanguage = document.documentElement.getAttribute('lang') || 'hr';
                    updateButtonText();
                    console.log('🌐 Language changed to:', currentLanguage);
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'lang']
        });
        
        // Listen for language toggle changes
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', function() {
                setTimeout(() => {
                    detectCurrentSettings();
                    updateButtonText();
                }, 100);
            });
        }
    }

    function updateButtonText() {
        if (floatingButton) {
            const icon = floatingButton.querySelector('.booking-icon');
            const iconText = icon ? icon.textContent : '📅 ';
            floatingButton.textContent = CONFIG.buttonText[currentLanguage] || CONFIG.buttonText.hr;
            
            // Re-add icon
            if (icon) {
                floatingButton.insertBefore(icon, floatingButton.firstChild);
            }
        }
    }

    function openBookingModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Update iframe src with current language and theme
            const iframe = modal.querySelector('.booking-iframe');
            const url = new URL(CONFIG.bookingURL, window.location.origin);
            url.searchParams.set('lang', currentLanguage);
            url.searchParams.set('theme', currentTheme);
            iframe.src = url.toString();
            
            console.log('📅 Booking modal opened');
        }
    }

    function closeBookingModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('❌ Booking modal closed');
        }
    }

    // Global methods for external access
    window.BookingIntegration = {
        open: openBookingModal,
        close: closeBookingModal,
        isOpen: () => modal && modal.classList.contains('active'),
        updateLanguage: (lang) => {
            currentLanguage = lang;
            updateButtonText();
        },
        updateTheme: (theme) => {
            currentTheme = theme;
        }
    };

})();