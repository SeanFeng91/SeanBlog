document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
  
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const navItem = document.querySelector(`a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    // 观察所有的标题
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      observer.observe(heading);
    });
  });
  