/**
 * Erasmus Mundial - Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when links are clicked (useful if there are page section anchors)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Active Page Navigation Highlight
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    // Get the href attribute (relative path)
    const href = link.getAttribute('href');
    
    if (href) {
      // Determine if this link is the active page
      // E.g. href is "../index.html", "../evolution/index.html", or "livinglanguages/index.html"
      const linkFilename = href.split('/').pop() || 'index.html';
      const pathFilename = currentPath.split('/').pop() || 'index.html';
      
      // Also check directory matches for folder structure
      const isHome = (href.endsWith('index.html') && !href.includes('livinglanguages') && !href.includes('evolution') && !currentPath.includes('livinglanguages') && !currentPath.includes('evolution'));
      const isLivingLanguages = href.includes('livinglanguages') && currentPath.includes('livinglanguages');
      const isEvolution = href.includes('evolution') && currentPath.includes('evolution');
      
      if (isHome || isLivingLanguages || isEvolution) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  // 3. Static Forms Submission Interceptor (e.g. Newsletter, Contact Forms)
  const forms = document.querySelectorAll('.static-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const successMessage = form.querySelector('.success-message');
      const submitBtn = form.querySelector('button[type="submit"]');
      
      if (successMessage) {
        // Change button state
        const originalBtnText = submitBtn ? submitBtn.innerText : 'Gönder';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Gönderiliyor...';
        }
        
        // Simulate network latency
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
          }
          // Reset fields
          form.reset();
          // Show success message
          successMessage.style.display = 'block';
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
        }, 800);
      }
    });
  });
});
