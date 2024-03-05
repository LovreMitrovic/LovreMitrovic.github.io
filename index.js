window.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId[0] != '#'){
          window.location.href = targetId;
        }
        else {
          const targetElement = document.querySelector(targetId);
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        };
      });
    });
});