// scrollSpy.js
export default function setupScrollSpy() {
    document.addEventListener('DOMContentLoaded', () => {
      const generateId = (text) => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      };
  
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      console.log('headings:', headings);

      const nav = document.querySelector('li');
      console.log('nav:', nav);
      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id = generateId(heading.textContent);
        }
        const navItem = document.createElement('a');
        navItem.href = `#${heading.id}`;
        navItem.textContent = heading.textContent;
        nav.appendChild(navItem);
      });
  
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };
  
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const navItem = document.querySelector(`nav a[href="#${id}"]`);
          if (entry.isIntersecting) {
            navItem.classList.add('active');
          } else {
            navItem.classList.remove('active');
          }
        });
      };
  
      const observer = new IntersectionObserver(observerCallback, observerOptions);
  
      headings.forEach((heading) => {
        observer.observe(heading);
      });
    });
  }