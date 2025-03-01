window.onload = function() {
    window.onscroll = function() {scrollFunction()};
    scrollFunction();

    //näytetään tai piilotetaan skrollauspainike
    function scrollFunction() {
        var heroSection = document.getElementById("hero");
        if (!heroSection) return;

        var heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
        var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollPosition > heroSectionBottom) {
            document.getElementById("scrollToTopBtn").style.display = "block";
        } else {
            document.getElementById("scrollToTopBtn").style.display = "none";
        }
    }

    document.getElementById("scrollToTopBtn").addEventListener("click", function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    //tapahtumakuuntelija scroll-tapahtumalle, jotta navigointipalkin linkkikorostukset menee oikein
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        let sections = document.querySelectorAll('.section'); 
        let navLinks = document.querySelectorAll('.nav-link');

        sections.forEach((section, index) => {
            let top = section.offsetTop - 50; 
            let bottom = top + section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
                
                // Päivitä URL-osoite
                if (history.pushState) {
                    history.pushState(null, null, '#' + section.id);
                } else {
                    location.hash = '#' + section.id;
                }
            }
        });
    });

    //navigointipalkin sulkeminen pienellä näytöllä
    document.addEventListener('click', function(event) {
        let navbarToggler = document.querySelector('.navbar-toggler');
        let navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show') && !event.target.closest('.navbar')) {
            navbarToggler.click();
        }
    });

    //Yhteydenottolomakkeen lähetyspainike
    document.querySelector('.btn.pull-right').addEventListener('click', function(event) {
        event.preventDefault();

        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var subject = document.getElementById('subject');
        var message = document.getElementById('message');

        // Tarkista, onko kentät tyhjiä
        if (!name.value || !email.value || !subject.value || !message.value) {
            alert('Täytä kaikki kentät ennen lähettämistä.');

            //korostetaan puuttuvat tiedot
            if (!name.value) name.style.borderColor = 'red';
            if (!email.value) email.style.borderColor = 'red';
            if (!subject.value) subject.style.borderColor = 'red';
            if (!message.value) message.style.borderColor = 'red';

            return; 
        }

        //tarkistetaan sähköpostin kelvollisuus (yksinkertainen)
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Anna kelvollinen sähköpostiosoite.');
            email.style.borderColor = 'red';
            return;
        }

        alert('Viestin lähettäminen ei ole vielä käytössä.');

        //tyhjennetään lomakkeen kentät
        name.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';

        //poistetaan korostukset
        name.style.borderColor = '';
        email.style.borderColor = '';
        subject.style.borderColor = '';
        message.style.borderColor = '';
    });

    //kielenvalintapainike
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            langOptions.forEach(opt => opt.classList.remove('active'));

            this.classList.add('active');

            const selectedLang = this.classList.contains('en') ? 'en' : 'fi';

            if (selectedLang === 'en') {
                window.location.href = 'index-en.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    });
    
    //typed.js
    var typeSpeed = 150;
    var typed = new Typed('#typed-text', {
        strings: ['Tulevaisuuden osaaja'],
        typeSpeed: typeSpeed,
        startDelay: 0,
        loop: false,
        onComplete: function(self) {
            self.cursor.classList.add('blink-cursor');
            setTimeout(function() {
                self.cursor.style.display = 'none';
            }, 2000);
        }
    });

    
    //animaation ääni vain kun ollaan "hero" osiossa
    var heroSection = document.getElementById("hero");
    if (heroSection && (window.scrollY === 0 || window.pageYOffset === 0)) {
        var typingSound = new Audio('/media/typing.mp3');
        typingSound.preload = 'auto';
        typingSound.play();
    }
        
}