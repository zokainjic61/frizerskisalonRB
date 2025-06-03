/**
 * Firebase Booking System for Hair Salon
 * Main JavaScript file
 */

// Immediately invoked function expression to avoid global scope pollution
(function() {
    'use strict';
    
    // Application state
    const APP_STATE = {
        currentStep: 1,
        totalSteps: 6,
        booking: {
            date: null,
            time: null,
            service: null,
            stylist: null,
            client: {
                name: '',
                phone: '',
                email: '',
                notes: ''
            }
        },
        language: 'hr',
        theme: 'light',
        adminLoggedIn: false,
        adminUser: null,
        filterDate: null,
        filterStylist: ''
    };
    
    // Application data
    const APP_DATA = {
        services: [
            {id: 1, name: "Žensko šišanje i styling", nameEN: "Women's cut & styling", duration: 60, price: 35, description: "Kreativno šišanje i styling prilagođen vašoj osobnosti", descriptionEN: "Creative cut & styling tailored to your personality"},
            {id: 2, name: "Muško šišanje", nameEN: "Men's haircut", duration: 30, price: 20, description: "Moderna muška frizura i precizno oblikovanje brade", descriptionEN: "Modern men's haircut and precise beard styling"},
            {id: 3, name: "Profesionalno farbanje kose", nameEN: "Professional hair coloring", duration: 120, price: 80, description: "Kvalitetni proizvodi za dugotrajnu boju", descriptionEN: "Quality products for long-lasting color"},
            {id: 4, name: "Pranje i feniranje", nameEN: "Wash and blow-dry", duration: 45, price: 25, description: "Profesionalno oblikovanje za savršen volumen", descriptionEN: "Professional styling for perfect volume"},
            {id: 5, name: "Svečane frizure", nameEN: "Special occasion hairstyles", duration: 90, price: 50, description: "Elegantne frizure za posebne prilike", descriptionEN: "Elegant hairstyles for special occasions"},
            {id: 6, name: "Balayage i moderne tehnike", nameEN: "Balayage & modern techniques", duration: 150, price: 100, description: "Najnovije tehnike bojenja za prirodan izgled", descriptionEN: "Latest coloring techniques for a natural look"}
        ],
        stylists: [
            {id: 1, name: "Ružica", role: "Vlasnica i master frizer", roleEN: "Owner and master stylist", description: "Kreativna frizerka koja prati najnovije trendove u frizerstvu", descriptionEN: "Creative stylist who follows the latest trends in hairdressing", specialties: ["Kreativno šišanje", "Svečane frizure", "Color specialist"]},
            {id: 2, name: "Branka", role: "Vlasnica i color specialist", roleEN: "Owner and color specialist", description: "Iskusna profesionalka s dugogodišnjim iskustvom u frizerstvu", descriptionEN: "Experienced professional with years of experience in hairdressing", specialties: ["Balayage tehnike", "Profesionalno farbanje", "Hair treatments"]}
        ],
        workingHours: {
            monday: {start: "08:00", end: "19:00"},
            tuesday: {start: "08:00", end: "19:00"},
            wednesday: {start: "08:00", end: "19:00"},
            thursday: {start: "08:00", end: "19:00"},
            friday: {start: "08:00", end: "19:00"},
            saturday: {start: "08:00", end: "16:00"},
            sunday: "closed"
        },
        adminUsers: [
            {email: "ruzica@salon.hr", password: "demo123", name: "Ružica", role: "owner"},
            {email: "branka@salon.hr", password: "demo123", name: "Branka", role: "owner"}
        ],
        demoBookings: [
            {id: 1, date: "2025-06-04", time: "10:00", service: "Žensko šišanje", stylist: "Ružica", client: "Ana Marić", phone: "060123456", status: "confirmed"},
            {id: 2, date: "2025-06-04", time: "14:30", service: "Farbanje kose", stylist: "Branka", client: "Petra Kovač", phone: "060987654", status: "pending"},
            {id: 3, date: "2025-06-05", time: "09:00", service: "Muško šišanje", stylist: "Ružica", client: "Marko Tomić", phone: "060555333", status: "confirmed"}
        ],
        translations: {
            hr: {
                nav_home: "Početna",
                nav_about: "O nama",
                nav_services: "Usluge",
                nav_stylists: "Naše frizerke",
                nav_contact: "Kontakt",
                hero_title: "Frizerski salon Ružica & Branka",
                hero_subtitle: "Dvije profesionalne frizerke u srcu Čapljine",
                hero_description: "Otkrijte savršenu kombinaciju stila i iskustva u našem salonu koji djeluje već preko 20 godina",
                hero_cta: "Rezervirajte termin",
                float_btn: "📅 Rezerviraj Online",
                book_title: "Online Rezervacija",
                admin_title: "Administracija",
                step_date: "Datum",
                step_time: "Vrijeme",
                step_service: "Usluga",
                step_stylist: "Frizerka",
                step_details: "Podaci",
                step_confirm: "Potvrda",
                select_date: "Odaberite datum",
                select_time: "Odaberite vrijeme",
                select_service: "Odaberite uslugu",
                select_stylist: "Odaberite frizerku",
                enter_details: "Unesite svoje podatke",
                confirm_booking: "Potvrda rezervacije",
                previous: "Nazad",
                next: "Dalje",
                confirm: "Potvrdi rezervaciju",
                name_label: "Ime i prezime",
                phone_label: "Broj telefona",
                email_label: "Email adresa",
                notes_label: "Napomene (opcionalno)",
                booking_success: "Rezervacija uspješna!",
                booking_success_message: "Vaša rezervacija je uspješno kreirana. Dostat ćete potvrdu na email.",
                new_booking: "Nova rezervacija",
                loading: "Učitavanje...",
                monday: "Pon",
                tuesday: "Uto",
                wednesday: "Sri",
                thursday: "Čet",
                friday: "Pet",
                saturday: "Sub",
                sunday: "Ned",
                close: "Zatvori",
                login: "Prijava",
                logout: "Odjava",
                dashboard_title: "Dashboard",
                todays_appointments: "Današnji termini",
                all_appointments: "Svi termini",
                all_stylists: "Sve frizerke",
                about_title: "O nama",
                about_description: "Frizerski salon Ružica & Branka posluje od 2001. godine, pružajući vrhunske frizerske usluge u Čapljini. Naš tim iskusnih frizerki osigurava personalizirani pristup svakom klijentu.",
                services_title: "Naše usluge",
                stylists_title: "Naše frizerke",
                contact_title: "Kontakt",
                address_title: "Adresa",
                hours_title: "Radno vrijeme",
                stat_established: "Godina osnivanja",
                stat_experience: "Godina iskustva",
                stat_stylists: "Profesionalne frizerke",
                error_title: "Greška",
                error_required_fields: "Molimo popunite sva obavezna polja",
                approve: "Odobri",
                reject: "Otkaži",
                status_confirmed: "Potvrđeno",
                status_pending: "Na čekanju",
                status_cancelled: "Otkazano",
                login_error: "Pogrešan email ili lozinka",
                booking_id: "ID rezervacije",
                booking_date: "Datum",
                booking_time: "Vrijeme",
                booking_service: "Usluga",
                booking_stylist: "Frizerka",
                booking_client: "Klijent",
                booking_phone: "Telefon",
                booking_status: "Status",
                duration_min: "min",
                price_currency: "€",
                no_appointments: "Nema rezervacija za danas",
                admin_login_title: "Admin prijava",
                salon_name: "Salon Ružica & Branka",
                password_label: "Lozinka"
            },
            en: {
                nav_home: "Home",
                nav_about: "About",
                nav_services: "Services",
                nav_stylists: "Our Stylists",
                nav_contact: "Contact",
                hero_title: "Hair Salon Ružica & Branka",
                hero_subtitle: "Two professional hairstylists in the heart of Čapljina",
                hero_description: "Discover the perfect combination of style and experience in our salon operating for over 20 years",
                hero_cta: "Book Appointment",
                float_btn: "📅 Book Online",
                book_title: "Online Booking",
                admin_title: "Administration",
                step_date: "Date",
                step_time: "Time",
                step_service: "Service",
                step_stylist: "Stylist",
                step_details: "Details",
                step_confirm: "Confirm",
                select_date: "Select a date",
                select_time: "Select a time",
                select_service: "Select a service",
                select_stylist: "Select a stylist",
                enter_details: "Enter your details",
                confirm_booking: "Confirm booking",
                previous: "Previous",
                next: "Next",
                confirm: "Confirm booking",
                name_label: "Full name",
                phone_label: "Phone number",
                email_label: "Email address",
                notes_label: "Notes (optional)",
                booking_success: "Booking successful!",
                booking_success_message: "Your booking has been successfully created. You will receive a confirmation email.",
                new_booking: "New booking",
                loading: "Loading...",
                monday: "Mon",
                tuesday: "Tue",
                wednesday: "Wed",
                thursday: "Thu",
                friday: "Fri",
                saturday: "Sat",
                sunday: "Sun",
                close: "Close",
                login: "Login",
                logout: "Logout",
                dashboard_title: "Dashboard",
                todays_appointments: "Today's appointments",
                all_appointments: "All appointments",
                all_stylists: "All stylists",
                about_title: "About Us",
                about_description: "Hair Salon Ružica & Branka has been operating since 2001, providing top-quality hairdressing services in Čapljina. Our team of experienced hairstylists ensures a personalized approach to each client.",
                services_title: "Our Services",
                stylists_title: "Our Stylists",
                contact_title: "Contact",
                address_title: "Address",
                hours_title: "Working Hours",
                stat_established: "Year established",
                stat_experience: "Years of experience",
                stat_stylists: "Professional stylists",
                error_title: "Error",
                error_required_fields: "Please fill in all required fields",
                approve: "Approve",
                reject: "Cancel",
                status_confirmed: "Confirmed",
                status_pending: "Pending",
                status_cancelled: "Cancelled",
                login_error: "Incorrect email or password",
                booking_id: "Booking ID",
                booking_date: "Date",
                booking_time: "Time",
                booking_service: "Service",
                booking_stylist: "Stylist",
                booking_client: "Client",
                booking_phone: "Phone",
                booking_status: "Status",
                duration_min: "min",
                price_currency: "€",
                no_appointments: "No appointments for today",
                admin_login_title: "Admin Login",
                salon_name: "Salon Ružica & Branka",
                password_label: "Password"
            }
        }
    };

    // DOM Elements
    let DOM = {};
    
    // Initialize application
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Initializing Booking System...');
        
        // Get DOM elements
        getDOMElements();
        
        // Hide loading spinner immediately
        hideLoadingSpinner();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize booking form
        initializeBookingForm();
        
        // Initialize language and theme
        initializeLanguageAndTheme();
        
        // Render salon data
        renderSalonData();
        
        console.log('✅ Booking System initialized');
    });
    
    function hideLoadingSpinner() {
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }
    
    function showLoadingSpinner() {
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'flex';
        }
    }
    
    function getDOMElements() {
        // Main elements
        DOM.loadingSpinner = document.getElementById('loading-spinner');
        DOM.floatingBookingBtn = document.getElementById('floating-booking-btn');
        
        // Booking Modal elements
        DOM.bookingModal = document.getElementById('booking-modal');
        DOM.closeBookingBtn = document.getElementById('close-booking');
        DOM.prevStepBtn = document.getElementById('prev-step');
        DOM.nextStepBtn = document.getElementById('next-step');
        DOM.confirmBookingBtn = document.getElementById('confirm-booking');
        DOM.steps = document.querySelectorAll('.step');
        DOM.bookingSteps = document.querySelectorAll('.booking-step');
        
        // Calendar elements
        DOM.calendarMonth = document.getElementById('calendar-month');
        DOM.calendarDays = document.getElementById('calendar-days');
        DOM.prevMonthBtn = document.getElementById('prev-month');
        DOM.nextMonthBtn = document.getElementById('next-month');
        
        // Admin elements
        DOM.adminToggleBtn = document.getElementById('admin-toggle');
        DOM.adminModal = document.getElementById('admin-modal');
        DOM.closeAdminBtn = document.getElementById('close-admin');
        DOM.loginForm = document.getElementById('login-form');
        DOM.adminEmail = document.getElementById('admin-email');
        DOM.adminPassword = document.getElementById('admin-password');
        DOM.adminLogin = document.getElementById('admin-login');
        DOM.adminDashboard = document.getElementById('admin-dashboard');
        DOM.logoutBtn = document.getElementById('admin-logout');
        DOM.todaysAppointments = document.getElementById('todays-appointments');
        DOM.allAppointments = document.getElementById('all-appointments');
        DOM.filterDate = document.getElementById('filter-date');
        DOM.filterStylist = document.getElementById('filter-stylist');
        
        // Success modal
        DOM.successModal = document.getElementById('success-modal');
        DOM.closeSuccessBtn = document.getElementById('close-success');
        DOM.bookingDetails = document.getElementById('booking-details');
        DOM.newBookingBtn = document.getElementById('new-booking');
        
        // Theme and language
        DOM.themeToggleBtn = document.getElementById('theme-toggle');
        DOM.currentTheme = document.getElementById('current-theme');
        DOM.languageToggleBtn = document.getElementById('language-toggle');
        DOM.currentLang = document.getElementById('current-lang');
        DOM.otherLang = document.getElementById('other-lang');
        
        // Forms
        DOM.bookingForm = document.getElementById('booking-form');
        DOM.clientName = document.getElementById('client-name');
        DOM.clientPhone = document.getElementById('client-phone');
        DOM.clientEmail = document.getElementById('client-email');
        DOM.bookingNotes = document.getElementById('booking-notes');
        
        // Booking summary
        DOM.bookingSummary = document.querySelector('.booking-summary');
        
        // Toast container
        DOM.toastContainer = document.getElementById('toast-container');
        
        // Main content sections
        DOM.servicesGrid = document.querySelector('.services-grid');
        DOM.stylistsGrid = document.querySelector('.stylists-grid');
        DOM.heroCta = document.querySelector('.hero-cta');
    }
    
    function setupEventListeners() {
        // Floating booking button
        if (DOM.floatingBookingBtn) {
            DOM.floatingBookingBtn.addEventListener('click', openBookingModal);
        }
        
        // Hero CTA button
        if (DOM.heroCta) {
            DOM.heroCta.addEventListener('click', openBookingModal);
        }
        
        // Close booking modal
        if (DOM.closeBookingBtn) {
            DOM.closeBookingBtn.addEventListener('click', closeBookingModal);
        }
        
        // Step navigation
        if (DOM.prevStepBtn) {
            DOM.prevStepBtn.addEventListener('click', goToPreviousStep);
        }
        
        if (DOM.nextStepBtn) {
            DOM.nextStepBtn.addEventListener('click', goToNextStep);
        }
        
        if (DOM.confirmBookingBtn) {
            DOM.confirmBookingBtn.addEventListener('click', submitBooking);
        }
        
        // Calendar navigation
        if (DOM.prevMonthBtn) {
            DOM.prevMonthBtn.addEventListener('click', function() {
                changeMonth(-1);
            });
        }
        
        if (DOM.nextMonthBtn) {
            DOM.nextMonthBtn.addEventListener('click', function() {
                changeMonth(1);
            });
        }
        
        // Admin toggle
        if (DOM.adminToggleBtn) {
            DOM.adminToggleBtn.addEventListener('click', openAdminModal);
        }
        
        // Close admin modal
        if (DOM.closeAdminBtn) {
            DOM.closeAdminBtn.addEventListener('click', closeAdminModal);
        }
        
        // Admin login
        if (DOM.loginForm) {
            DOM.loginForm.addEventListener('submit', handleAdminLogin);
        }
        
        // Admin logout
        if (DOM.logoutBtn) {
            DOM.logoutBtn.addEventListener('click', handleAdminLogout);
        }
        
        // Theme toggle
        if (DOM.themeToggleBtn) {
            DOM.themeToggleBtn.addEventListener('click', toggleTheme);
        }
        
        // Language toggle
        if (DOM.languageToggleBtn) {
            DOM.languageToggleBtn.addEventListener('click', toggleLanguage);
        }
        
        // Admin filters
        if (DOM.filterDate) {
            DOM.filterDate.addEventListener('change', filterAppointments);
        }
        
        if (DOM.filterStylist) {
            DOM.filterStylist.addEventListener('change', filterAppointments);
        }
        
        // Success modal
        if (DOM.closeSuccessBtn) {
            DOM.closeSuccessBtn.addEventListener('click', closeSuccessModal);
        }
        
        if (DOM.newBookingBtn) {
            DOM.newBookingBtn.addEventListener('click', function() {
                closeSuccessModal();
                resetBookingForm();
                openBookingModal();
            });
        }
        
        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === DOM.bookingModal) {
                closeBookingModal();
            }
            
            if (e.target === DOM.adminModal) {
                closeAdminModal();
            }
            
            if (e.target === DOM.successModal) {
                closeSuccessModal();
            }
        });
        
        // ESC key to close modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeBookingModal();
                closeAdminModal();
                closeSuccessModal();
            }
        });
    }
    
    function initializeBookingForm() {
        // Initialize calendar
        renderCalendar(new Date());
        
        // Hide previous button on first step
        if (DOM.prevStepBtn) {
            DOM.prevStepBtn.style.visibility = 'hidden';
        }
    }
    
    function initializeLanguageAndTheme() {
        // Get preferred language from browser
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en') {
            APP_STATE.language = 'en';
        }
        
        // Get preferred theme from system
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            APP_STATE.theme = 'dark';
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            if (DOM.currentTheme) {
                DOM.currentTheme.textContent = '🌙';
            }
        }
        
        // Apply initial translations
        applyTranslations();
        
        // Set language display
        if (DOM.currentLang && DOM.otherLang) {
            DOM.currentLang.textContent = APP_STATE.language.toUpperCase();
            DOM.otherLang.textContent = APP_STATE.language === 'hr' ? 'EN' : 'HR';
        }
    }
    
    function renderSalonData() {
        // Render services
        if (DOM.servicesGrid) {
            renderServices();
        }
        
        // Render stylists
        if (DOM.stylistsGrid) {
            renderStylists();
        }
    }
    
    function renderServices() {
        DOM.servicesGrid.innerHTML = '';
        
        APP_DATA.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            
            const serviceName = APP_STATE.language === 'hr' ? service.name : service.nameEN;
            const serviceDescription = APP_STATE.language === 'hr' ? service.description : service.descriptionEN;
            
            serviceCard.innerHTML = `
                <h3>${serviceName}</h3>
                <p>${serviceDescription}</p>
                <div class="service-meta">
                    <div class="service-duration">${service.duration} ${getTranslation('duration_min')}</div>
                    <div class="service-price">${service.price} ${getTranslation('price_currency')}</div>
                </div>
            `;
            
            DOM.servicesGrid.appendChild(serviceCard);
        });
    }
    
    function renderStylists() {
        DOM.stylistsGrid.innerHTML = '';
        
        APP_DATA.stylists.forEach(stylist => {
            const stylistCard = document.createElement('div');
            stylistCard.className = 'stylist-card';
            
            const stylistRole = APP_STATE.language === 'hr' ? stylist.role : stylist.roleEN;
            const stylistDescription = APP_STATE.language === 'hr' ? stylist.description : stylist.descriptionEN;
            
            const specialtiesList = stylist.specialties.map(spec => 
                `<div class="specialty-tag">${spec}</div>`
            ).join('');
            
            stylistCard.innerHTML = `
                <div class="stylist-avatar">${stylist.name.charAt(0)}</div>
                <h3>${stylist.name}</h3>
                <div class="stylist-role">${stylistRole}</div>
                <p class="stylist-description">${stylistDescription}</p>
                <div class="specialties">
                    ${specialtiesList}
                </div>
            `;
            
            DOM.stylistsGrid.appendChild(stylistCard);
        });
    }
    
    // Calendar functions
    function renderCalendar(date) {
        const currentDate = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Set month header
        const monthNames = [
            'Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 
            'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'
        ];
        
        const monthNamesEN = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        if (DOM.calendarMonth) {
            DOM.calendarMonth.textContent = `${APP_STATE.language === 'hr' ? monthNames[month] : monthNamesEN[month]} ${year}`;
        }
        
        // Clear calendar days
        if (DOM.calendarDays) {
            DOM.calendarDays.innerHTML = '';
            
            // Get first day of month
            const firstDay = new Date(year, month, 1);
            let firstDayIndex = firstDay.getDay() - 1; // Monday is 0
            if (firstDayIndex < 0) firstDayIndex = 6; // Sunday is 6
            
            // Get days in month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Get days in previous month
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            
            // Add days from previous month
            for (let i = firstDayIndex - 1; i >= 0; i--) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day other-month';
                dayEl.textContent = daysInPrevMonth - i;
                DOM.calendarDays.appendChild(dayEl);
            }
            
            // Add days of current month
            for (let i = 1; i <= daysInMonth; i++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day';
                dayEl.textContent = i;
                
                // Disable days in the past
                const dayDate = new Date(year, month, i);
                if (dayDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
                    dayEl.classList.add('disabled');
                } else {
                    // Check if this is the selected date
                    if (APP_STATE.booking.date) {
                        const selectedDate = new Date(APP_STATE.booking.date);
                        if (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                            dayEl.classList.add('selected');
                        }
                    }
                    
                    // Make day selectable
                    dayEl.dataset.date = formatDate(new Date(year, month, i));
                    dayEl.addEventListener('click', selectDate);
                }
                
                DOM.calendarDays.appendChild(dayEl);
            }
            
            // Add days from next month if needed
            const totalDaysDisplayed = firstDayIndex + daysInMonth;
            const nextMonthDays = 42 - totalDaysDisplayed; // 6 rows of 7 days
            
            for (let i = 1; i <= nextMonthDays; i++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day other-month';
                dayEl.textContent = i;
                DOM.calendarDays.appendChild(dayEl);
            }
        }
    }
    
    function changeMonth(delta) {
        const currentDate = DOM.calendarMonth ? 
            parseMonthHeader(DOM.calendarMonth.textContent) : new Date();
        
        currentDate.setMonth(currentDate.getMonth() + delta);
        renderCalendar(currentDate);
    }
    
    function parseMonthHeader(headerText) {
        const [month, year] = headerText.split(' ');
        
        const monthNames = [
            'Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 
            'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'
        ];
        
        const monthNamesEN = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        let monthIndex = monthNames.indexOf(month);
        if (monthIndex === -1) {
            monthIndex = monthNamesEN.indexOf(month);
        }
        
        return new Date(parseInt(year), monthIndex, 1);
    }
    
    function selectDate(e) {
        // Remove selected class from all days
        const selectedDays = document.querySelectorAll('.calendar-day.selected');
        selectedDays.forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selected class to clicked day
        e.target.classList.add('selected');
        
        // Update state
        APP_STATE.booking.date = e.target.dataset.date;
        
        // Enable next button
        if (DOM.nextStepBtn) {
            DOM.nextStepBtn.disabled = false;
        }
    }
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    
    // Step Navigation
    function goToPreviousStep() {
        if (APP_STATE.currentStep > 1) {
            // Hide current step
            DOM.bookingSteps[APP_STATE.currentStep - 1].classList.remove('active');
            
            // Show previous step
            APP_STATE.currentStep--;
            DOM.bookingSteps[APP_STATE.currentStep - 1].classList.add('active');
            
            // Update progress bar
            updateStepProgress();
            
            // Hide previous button on first step
            if (APP_STATE.currentStep === 1) {
                DOM.prevStepBtn.style.visibility = 'hidden';
            }
            
            // Show next button, hide confirm button
            DOM.nextStepBtn.classList.remove('hidden');
            DOM.confirmBookingBtn.classList.add('hidden');
        }
    }
    
    function goToNextStep() {
        // Validate current step
        if (!validateCurrentStep()) {
            return;
        }
        
        if (APP_STATE.currentStep < APP_STATE.totalSteps) {
            // Hide current step
            DOM.bookingSteps[APP_STATE.currentStep - 1].classList.remove('active');
            
            // Show next step
            APP_STATE.currentStep++;
            DOM.bookingSteps[APP_STATE.currentStep - 1].classList.add('active');
            
            // Update progress bar
            updateStepProgress();
            
            // Show previous button
            DOM.prevStepBtn.style.visibility = 'visible';
            
            // Show confirm button on last step, hide next button
            if (APP_STATE.currentStep === APP_STATE.totalSteps) {
                DOM.nextStepBtn.classList.add('hidden');
                DOM.confirmBookingBtn.classList.remove('hidden');
                
                // Render booking summary
                renderBookingSummary();
            }
            
            // Render step content
            renderStepContent();
        }
    }
    
    function updateStepProgress() {
        // Update active step in progress bar
        DOM.steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === APP_STATE.currentStep) {
                step.classList.add('active');
            } else if (index + 1 < APP_STATE.currentStep) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
    }
    
    function validateCurrentStep() {
        switch (APP_STATE.currentStep) {
            case 1: // Date
                if (!APP_STATE.booking.date) {
                    showToast(getTranslation('error_required_fields'), 'error');
                    return false;
                }
                return true;
                
            case 2: // Time
                if (!APP_STATE.booking.time) {
                    showToast(getTranslation('error_required_fields'), 'error');
                    return false;
                }
                return true;
                
            case 3: // Service
                if (!APP_STATE.booking.service) {
                    showToast(getTranslation('error_required_fields'), 'error');
                    return false;
                }
                return true;
                
            case 4: // Stylist
                if (!APP_STATE.booking.stylist) {
                    showToast(getTranslation('error_required_fields'), 'error');
                    return false;
                }
                return true;
                
            case 5: // Client details
                if (!DOM.clientName.value || !DOM.clientPhone.value) {
                    showToast(getTranslation('error_required_fields'), 'error');
                    return false;
                }
                // Update client details in state
                APP_STATE.booking.client.name = DOM.clientName.value;
                APP_STATE.booking.client.phone = DOM.clientPhone.value;
                APP_STATE.booking.client.email = DOM.clientEmail.value;
                APP_STATE.booking.client.notes = DOM.bookingNotes.value;
                return true;
                
            default:
                return true;
        }
    }
    
    function renderStepContent() {
        switch (APP_STATE.currentStep) {
            case 2: // Time
                renderTimeSlots();
                break;
                
            case 3: // Service
                renderServiceOptions();
                break;
                
            case 4: // Stylist
                renderStylistOptions();
                break;
        }
    }
    
    function renderTimeSlots() {
        const timeSlots = document.querySelector('.time-slots');
        if (!timeSlots) return;
        
        timeSlots.innerHTML = '';
        
        // Generate time slots between working hours
        const date = new Date(APP_STATE.booking.date);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ...
        
        let workingHours;
        if (dayOfWeek === 0) { // Sunday
            // Sunday is closed
            timeSlots.innerHTML = '<p class="no-slots">Salon ne radi nedjeljom.</p>';
            return;
        } else if (dayOfWeek === 6) { // Saturday
            workingHours = APP_DATA.workingHours.saturday;
        } else { // Monday - Friday
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            workingHours = APP_DATA.workingHours[days[dayOfWeek]];
        }
        
        // Parse start and end hours
        const [startHour, startMinute] = workingHours.start.split(':').map(Number);
        const [endHour, endMinute] = workingHours.end.split(':').map(Number);
        
        // Generate 30-minute slots
        const slots = [];
        let currentHour = startHour;
        let currentMinute = startMinute;
        
        while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
            slots.push(
                `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`
            );
            
            currentMinute += 30;
            if (currentMinute >= 60) {
                currentHour++;
                currentMinute = 0;
            }
        }
        
        // Render slots
        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot;
            
            // Check if this is the selected time
            if (APP_STATE.booking.time === slot) {
                slotElement.classList.add('selected');
            }
            
            // Randomly disable some slots to simulate booked slots
            if (Math.random() < 0.3) {
                slotElement.classList.add('disabled');
            } else {
                slotElement.addEventListener('click', () => {
                    // Remove selected class from all slots
                    document.querySelectorAll('.time-slot.selected').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked slot
                    slotElement.classList.add('selected');
                    
                    // Update state
                    APP_STATE.booking.time = slot;
                    
                    // Enable next button
                    if (DOM.nextStepBtn) {
                        DOM.nextStepBtn.disabled = false;
                    }
                });
            }
            
            timeSlots.appendChild(slotElement);
        });
    }
    
    function renderServiceOptions() {
        const servicesList = document.querySelector('.services-list');
        if (!servicesList) return;
        
        servicesList.innerHTML = '';
        
        APP_DATA.services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service-option';
            
            // Check if this is the selected service
            if (APP_STATE.booking.service && APP_STATE.booking.service.id === service.id) {
                serviceElement.classList.add('selected');
            }
            
            const serviceName = APP_STATE.language === 'hr' ? service.name : service.nameEN;
            const serviceDescription = APP_STATE.language === 'hr' ? service.description : service.descriptionEN;
            
            serviceElement.innerHTML = `
                <h4>${serviceName}</h4>
                <p>${serviceDescription}</p>
                <div class="service-details">
                    <span>${service.duration} ${getTranslation('duration_min')}</span>
                    <span>${service.price} ${getTranslation('price_currency')}</span>
                </div>
            `;
            
            serviceElement.addEventListener('click', () => {
                // Remove selected class from all services
                document.querySelectorAll('.service-option.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Add selected class to clicked service
                serviceElement.classList.add('selected');
                
                // Update state
                APP_STATE.booking.service = service;
                
                // Enable next button
                if (DOM.nextStepBtn) {
                    DOM.nextStepBtn.disabled = false;
                }
            });
            
            servicesList.appendChild(serviceElement);
        });
    }
    
    function renderStylistOptions() {
        const stylistsList = document.querySelector('.stylists-list');
        if (!stylistsList) return;
        
        stylistsList.innerHTML = '';
        
        APP_DATA.stylists.forEach(stylist => {
            const stylistElement = document.createElement('div');
            stylistElement.className = 'stylist-option';
            
            // Check if this is the selected stylist
            if (APP_STATE.booking.stylist && APP_STATE.booking.stylist.id === stylist.id) {
                stylistElement.classList.add('selected');
            }
            
            const stylistRole = APP_STATE.language === 'hr' ? stylist.role : stylist.roleEN;
            
            stylistElement.innerHTML = `
                <div class="stylist-avatar">${stylist.name.charAt(0)}</div>
                <h4>${stylist.name}</h4>
                <p>${stylistRole}</p>
            `;
            
            stylistElement.addEventListener('click', () => {
                // Remove selected class from all stylists
                document.querySelectorAll('.stylist-option.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Add selected class to clicked stylist
                stylistElement.classList.add('selected');
                
                // Update state
                APP_STATE.booking.stylist = stylist;
                
                // Enable next button
                if (DOM.nextStepBtn) {
                    DOM.nextStepBtn.disabled = false;
                }
            });
            
            stylistsList.appendChild(stylistElement);
        });
    }
    
    function renderBookingSummary() {
        if (!DOM.bookingSummary) return;
        
        // Get service and stylist names
        const serviceName = APP_STATE.booking.service ? 
            (APP_STATE.language === 'hr' ? APP_STATE.booking.service.name : APP_STATE.booking.service.nameEN) : '';
        const servicePrice = APP_STATE.booking.service ? APP_STATE.booking.service.price : '';
        const stylistName = APP_STATE.booking.stylist ? APP_STATE.booking.stylist.name : '';
        
        // Format date
        const bookingDate = APP_STATE.booking.date ? formatDateForDisplay(APP_STATE.booking.date) : '';
        
        DOM.bookingSummary.innerHTML = `
            <div class="summary-item">
                <div class="summary-label">${getTranslation('booking_date')}</div>
                <div class="summary-value">${bookingDate}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${getTranslation('booking_time')}</div>
                <div class="summary-value">${APP_STATE.booking.time || ''}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${getTranslation('booking_service')}</div>
                <div class="summary-value">${serviceName}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${getTranslation('booking_stylist')}</div>
                <div class="summary-value">${stylistName}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${getTranslation('booking_client')}</div>
                <div class="summary-value">${APP_STATE.booking.client.name}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">${getTranslation('booking_phone')}</div>
                <div class="summary-value">${APP_STATE.booking.client.phone}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Ukupno</div>
                <div class="summary-value">${servicePrice} ${getTranslation('price_currency')}</div>
            </div>
        `;
    }
    
    function formatDateForDisplay(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(APP_STATE.language === 'hr' ? 'hr-HR' : 'en-US', options);
    }
    
    // Booking Submission
    function submitBooking() {
        // Show loading spinner
        showLoadingSpinner();
        
        // Simulate API call
        setTimeout(() => {
            // Generate booking ID
            const bookingId = Math.floor(100000 + Math.random() * 900000);
            
            // Add booking to demo bookings
            const newBooking = {
                id: bookingId,
                date: APP_STATE.booking.date,
                time: APP_STATE.booking.time,
                service: APP_STATE.booking.service.name,
                stylist: APP_STATE.booking.stylist.name,
                client: APP_STATE.booking.client.name,
                phone: APP_STATE.booking.client.phone,
                status: 'pending'
            };
            
            APP_DATA.demoBookings.push(newBooking);
            
            // Show success message
            if (DOM.bookingDetails) {
                const serviceName = APP_STATE.language === 'hr' ? APP_STATE.booking.service.name : APP_STATE.booking.service.nameEN;
                
                DOM.bookingDetails.innerHTML = `
                    <div class="summary-item">
                        <div class="summary-label">${getTranslation('booking_id')}</div>
                        <div class="summary-value">#${bookingId}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">${getTranslation('booking_date')}</div>
                        <div class="summary-value">${formatDateForDisplay(APP_STATE.booking.date)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">${getTranslation('booking_time')}</div>
                        <div class="summary-value">${APP_STATE.booking.time}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">${getTranslation('booking_service')}</div>
                        <div class="summary-value">${serviceName}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">${getTranslation('booking_stylist')}</div>
                        <div class="summary-value">${APP_STATE.booking.stylist.name}</div>
                    </div>
                `;
            }
            
            // Hide loading spinner
            hideLoadingSpinner();
            
            // Close booking modal and show success modal
            closeBookingModal();
            openSuccessModal();
            
            // Show notification for admin
            if (APP_STATE.adminLoggedIn) {
                showToast('Nova rezervacija primljena!', 'info');
                renderAppointments();
            }
        }, 1500);
    }
    
    // Modal functions
    function openBookingModal() {
        if (DOM.bookingModal) {
            DOM.bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeBookingModal() {
        if (DOM.bookingModal) {
            DOM.bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function openAdminModal() {
        if (DOM.adminModal) {
            DOM.adminModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Show login form if not logged in
            if (!APP_STATE.adminLoggedIn) {
                DOM.adminLogin.classList.add('active');
                DOM.adminDashboard.classList.remove('active');
            } else {
                DOM.adminLogin.classList.remove('active');
                DOM.adminDashboard.classList.add('active');
                renderAppointments();
            }
        }
    }
    
    function closeAdminModal() {
        if (DOM.adminModal) {
            DOM.adminModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function openSuccessModal() {
        if (DOM.successModal) {
            DOM.successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeSuccessModal() {
        if (DOM.successModal) {
            DOM.successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Admin functions
    function handleAdminLogin(e) {
        e.preventDefault();
        
        const email = DOM.adminEmail.value;
        const password = DOM.adminPassword.value;
        
        // Check credentials
        const user = APP_DATA.adminUsers.find(user => 
            user.email === email && user.password === password
        );
        
        if (user) {
            APP_STATE.adminLoggedIn = true;
            APP_STATE.adminUser = user;
            
            // Show dashboard
            DOM.adminLogin.classList.remove('active');
            DOM.adminDashboard.classList.add('active');
            
            // Render appointments
            renderAppointments();
            
            // Show welcome message
            showToast(`Dobrodošli, ${user.name}!`, 'success');
        } else {
            // Show error
            showToast(getTranslation('login_error'), 'error');
        }
    }
    
    function handleAdminLogout() {
        APP_STATE.adminLoggedIn = false;
        APP_STATE.adminUser = null;
        
        // Show login form
        DOM.adminLogin.classList.add('active');
        DOM.adminDashboard.classList.remove('active');
        
        // Clear form
        DOM.loginForm.reset();
        
        // Show message
        showToast('Uspješno ste se odjavili', 'success');
    }
    
    function renderAppointments() {
        renderTodaysAppointments();
        renderAllAppointments();
    }
    
    function renderTodaysAppointments() {
        if (!DOM.todaysAppointments) return;
        
        // Get today's date
        const today = formatDate(new Date());
        
        // Filter bookings for today
        const todaysBookings = APP_DATA.demoBookings.filter(booking => 
            booking.date === today
        );
        
        if (todaysBookings.length === 0) {
            DOM.todaysAppointments.innerHTML = `<p class="no-appointments">${getTranslation('no_appointments')}</p>`;
            return;
        }
        
        DOM.todaysAppointments.innerHTML = '';
        
        // Sort by time
        todaysBookings.sort((a, b) => {
            return a.time.localeCompare(b.time);
        });
        
        // Render bookings
        todaysBookings.forEach(booking => {
            renderAppointmentItem(booking, DOM.todaysAppointments);
        });
    }
    
    function renderAllAppointments() {
        if (!DOM.allAppointments) return;
        
        // Get filter values
        const filterDate = APP_STATE.filterDate || '';
        const filterStylist = APP_STATE.filterStylist || '';
        
        // Filter bookings
        let filteredBookings = [...APP_DATA.demoBookings];
        
        if (filterDate) {
            filteredBookings = filteredBookings.filter(booking => 
                booking.date === filterDate
            );
        }
        
        if (filterStylist) {
            filteredBookings = filteredBookings.filter(booking => 
                booking.stylist === filterStylist
            );
        }
        
        if (filteredBookings.length === 0) {
            DOM.allAppointments.innerHTML = `<p class="no-appointments">Nema pronađenih rezervacija</p>`;
            return;
        }
        
        DOM.allAppointments.innerHTML = '';
        
        // Sort by date and time
        filteredBookings.sort((a, b) => {
            if (a.date !== b.date) {
                return a.date.localeCompare(b.date);
            }
            return a.time.localeCompare(b.time);
        });
        
        // Render bookings
        filteredBookings.forEach(booking => {
            renderAppointmentItem(booking, DOM.allAppointments);
        });
    }
    
    function renderAppointmentItem(booking, container) {
        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'appointment-item';
        appointmentItem.dataset.id = booking.id;
        
        const formattedDate = formatDateForDisplay(booking.date);
        
        appointmentItem.innerHTML = `
            <div class="appointment-info">
                <h5>${booking.client}</h5>
                <p>${formattedDate}, ${booking.time} - ${booking.service}</p>
                <p>${booking.stylist} | ${getStatusText(booking.status)}</p>
            </div>
            <div class="appointment-actions">
                ${booking.status === 'pending' ? `
                    <button class="btn btn--primary approve-btn">${getTranslation('approve')}</button>
                    <button class="btn btn--secondary reject-btn">${getTranslation('reject')}</button>
                ` : ''}
            </div>
        `;
        
        // Add event listeners for buttons
        const approveBtn = appointmentItem.querySelector('.approve-btn');
        const rejectBtn = appointmentItem.querySelector('.reject-btn');
        
        if (approveBtn) {
            approveBtn.addEventListener('click', () => {
                updateBookingStatus(booking.id, 'confirmed');
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                updateBookingStatus(booking.id, 'cancelled');
            });
        }
        
        container.appendChild(appointmentItem);
    }
    
    function getStatusText(status) {
        switch (status) {
            case 'confirmed':
                return `<span class="status status--success">${getTranslation('status_confirmed')}</span>`;
            case 'pending':
                return `<span class="status status--warning">${getTranslation('status_pending')}</span>`;
            case 'cancelled':
                return `<span class="status status--error">${getTranslation('status_cancelled')}</span>`;
            default:
                return status;
        }
    }
    
    function updateBookingStatus(id, status) {
        // Find booking in demo bookings
        const bookingIndex = APP_DATA.demoBookings.findIndex(booking => booking.id === parseInt(id));
        
        if (bookingIndex !== -1) {
            // Update status
            APP_DATA.demoBookings[bookingIndex].status = status;
            
            // Re-render appointments
            renderAppointments();
            
            // Show notification
            const statusText = status === 'confirmed' ? 'potvrđena' : 'otkazana';
            showToast(`Rezervacija uspješno ${statusText}`, 'success');
        }
    }
    
    function filterAppointments() {
        APP_STATE.filterDate = DOM.filterDate ? DOM.filterDate.value : '';
        APP_STATE.filterStylist = DOM.filterStylist ? DOM.filterStylist.value : '';
        renderAllAppointments();
    }
    
    // Utility functions
    function showToast(message, type = 'info') {
        if (!DOM.toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        DOM.toastContainer.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (DOM.toastContainer.contains(toast)) {
                    DOM.toastContainer.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    function resetBookingForm() {
        // Reset state
        APP_STATE.currentStep = 1;
        APP_STATE.booking = {
            date: null,
            time: null,
            service: null,
            stylist: null,
            client: {
                name: '',
                phone: '',
                email: '',
                notes: ''
            }
        };
        
        // Reset form
        if (DOM.bookingForm) {
            DOM.bookingForm.reset();
        }
        
        // Reset step progress
        updateStepProgress();
        
        // Show step 1, hide others
        DOM.bookingSteps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Hide previous button
        if (DOM.prevStepBtn) {
            DOM.prevStepBtn.style.visibility = 'hidden';
        }
        
        // Show next button, hide confirm button
        if (DOM.nextStepBtn && DOM.confirmBookingBtn) {
            DOM.nextStepBtn.classList.remove('hidden');
            DOM.confirmBookingBtn.classList.add('hidden');
        }
        
        // Reset calendar
        renderCalendar(new Date());
    }
    
    // Theme and Language functions
    function toggleTheme() {
        APP_STATE.theme = APP_STATE.theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-color-scheme', APP_STATE.theme);
        
        if (DOM.currentTheme) {
            DOM.currentTheme.textContent = APP_STATE.theme === 'light' ? '☀️' : '🌙';
        }
    }
    
    function toggleLanguage() {
        APP_STATE.language = APP_STATE.language === 'hr' ? 'en' : 'hr';
        
        document.documentElement.setAttribute('lang', APP_STATE.language);
        
        if (DOM.currentLang && DOM.otherLang) {
            DOM.currentLang.textContent = APP_STATE.language.toUpperCase();
            DOM.otherLang.textContent = APP_STATE.language === 'hr' ? 'EN' : 'HR';
        }
        
        applyTranslations();
        
        // Update calendar if visible
        if (DOM.calendarMonth && DOM.calendarMonth.parentElement && DOM.calendarMonth.parentElement.offsetParent !== null) {
            renderCalendar(parseMonthHeader(DOM.calendarMonth.textContent));
        }
        
        // Update services
        renderServices();
        
        // Update stylists
        renderStylists();
        
        // Update booking summary if on confirmation step
        if (APP_STATE.currentStep === APP_STATE.totalSteps) {
            renderBookingSummary();
        }
    }
    
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
    
    function getTranslation(key) {
        return APP_DATA.translations[APP_STATE.language][key] || key;
    }
})();