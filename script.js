$(document).ready(function() {
    // Smooth scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 500);
    });

    // Scroll to top
    $('.scroll-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });
});

// This part ensures that the preloader is hidden after everything is loaded
$(window).on('load', function() {
    console.log('The load event is firing!');
    $('.preloader').fadeOut('slow', function() {
        console.log('The preloader has faded out!');
    });
});

// Highlight active menu item on scroll and navbar show/hide
var lastScrollTop = 0; // Moved outside to remember the value on each scroll event
$(window).on('scroll', function() {
    var navbarHeight = $('.navbar').outerHeight();
    var currentScroll = $(this).scrollTop();
    var navbarIsHidden = $('header .navbar').hasClass('hide-navbar');

    // Check for scrolling direction
    if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
        $('header .navbar').addClass('hide-navbar');
    } else {
        $('header .navbar').removeClass('hide-navbar');
    }

    // Check if we are at the bottom of the page
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        $('nav ul li a').removeClass('active');
        $('nav ul li a[href="#contact"]').addClass('active');
    } else {
        // Apply 'active' class to the navbar items based on section
        $('section').each(function() {
            var sectionTop = $(this).offset().top - (navbarIsHidden ? 0 : navbarHeight);
            var sectionBottom = sectionTop + $(this).outerHeight();

            if (currentScroll >= sectionTop && currentScroll <= sectionBottom) {
                var id = $(this).attr('id');
                $('nav ul li a').removeClass('active');
                $('nav ul li a[href="#' + id + '"]').addClass('active');
            }
        });
    }
    
    lastScrollTop = currentScroll; // Update the last scroll position

    // Show/hide scroll-to-top button
    if (currentScroll > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});
