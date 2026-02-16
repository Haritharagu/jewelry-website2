import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const navbar = document.getElementById('navbar');
  const heroBg = document.getElementById('hero-bg');

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Parallax Effect for Hero
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (heroBg && scrollPosition < window.innerHeight) {
      heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.5}px)`;
    }
  });

  // Unsplash Fallback URLs for Products
  const products = [
    {
      id: 1,
      name: "Ethereal Diamond Ring",
      price: "$3,450",
      image: "https://images.unsplash.com/photo-1605100804763-ebea24d20993?q=80&w=1000&auto=format&fit=crop",
      category: "Rings"
    },
    {
      id: 2,
      name: "Gold Pearl Necklace",
      price: "$2,800",
      image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop",
      category: "Necklaces"
    },
    {
      id: 3,
      name: "Sapphire Drop Earrings",
      price: "$4,200",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      category: "Earrings"
    },
    {
      id: 4,
      name: "Vintage Gold Bangle",
      price: "$1,950",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      category: "Bracelets"
    },
    {
      id: 5,
      name: "Emerald Cut Ring",
      price: "$5,100",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop",
      category: "Rings"
    },
    {
      id: 6,
      name: "Ruby Pendant",
      price: "$3,200",
      image: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=1000&auto=format&fit=crop",
      category: "Necklaces"
    },
    {
      id: 7,
      name: "Platinum Studs",
      price: "$1,500",
      image: "https://images.unsplash.com/photo-1588444839138-eb6a5c1631ca?q=80&w=1000&auto=format&fit=crop",
      category: "Earrings"
    },
    {
      id: 8,
      name: "Oceanic Charm Bracelet",
      price: "$2,400",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      category: "Bracelets"
    }
  ];

  // Initialize Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe default elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Render Products Function
  function renderProducts(gridId, productList) {
    const grid = document.getElementById(gridId);
    if (grid) {
      grid.innerHTML = '';
      productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
                  <div class="card-image-wrapper">
                      <img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy">
                      <div class="quick-view">Quick View</div>
                  </div>
                  <div class="card-info">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-price">${product.price}</p>
                  </div>
              `;

        card.addEventListener('click', () => {
          openModal(product);
        });

        grid.appendChild(card);
        observer.observe(card);
      });
    }
  }

  // Render on main page (Latest Collection)
  renderProducts('product-grid', products.slice(0, 8));

  // Render on collections page (Full Catalog)
  renderProducts('full-catalog-grid', products);

  // Modal Logic
  const modal = document.getElementById('product-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalCategory = document.getElementById('modal-category');

  function openModal(product) {
    modalImg.src = product.image;
    modalTitle.textContent = product.name;
    modalPrice.textContent = product.price;
    modalCategory.textContent = product.category;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Expose products to be used by other modules if needed
  window.products = products;

  // Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        btn.textContent = 'Message Sent';
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Add to Cart Logic (Modal)
  const addToCartBtn = document.querySelector('.btn-add-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const originalText = addToCartBtn.innerHTML; // Keep shimmer span
      addToCartBtn.textContent = 'Added to Cart';
      addToCartBtn.style.backgroundColor = 'var(--color-gold)';
      addToCartBtn.style.color = 'var(--color-white)';

      setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.style.backgroundColor = '';
        addToCartBtn.style.color = '';
      }, 2000);
    });
  }
});
