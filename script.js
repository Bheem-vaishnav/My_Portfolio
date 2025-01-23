// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Offset for sticky header
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky header functionality
  const header = document.querySelector("header");
  const stickyOffset = header.offsetTop;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > stickyOffset) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Back-to-top button functionality
  const backToTopBtn = document.createElement("button");
  backToTopBtn.textContent = "↑";
  backToTopBtn.id = "back-to-top";
  document.body.appendChild(backToTopBtn);

  backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      background-color: #2980b9;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: all 0.3s ease;
   `;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Highlight active section in the navigation
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const navLink = document.querySelector(
          `nav a[href="#${entry.target.id}"]`
        );
        if (entry.isIntersecting) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      });
    },
    { threshold: 0.6 } // Trigger when 60% of the section is visible
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
