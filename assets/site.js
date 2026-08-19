/**
 * Bamboo First - Unified Site JavaScript
 * Handles Navigation, Live Search, Hero Slider, Product Filtering, Modals, Form Validation, and WhatsApp Orders.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLiveSearch();
  initHeroSlider();
  initProductCatalogue();
  initForms();
  initWhatsAppWidget();
  initQuickViewModal();
});

/* ==========================================================================
   1. NAVIGATION & DROPDOWNS
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('open'));
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Handle dropdown on mobile / click
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 840) {
        e.preventDefault();
        const parent = trigger.closest('.nav-dropdown');
        if (parent) {
          parent.classList.toggle('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. LIVE SEARCH (Products & Blogs)
   ========================================================================== */
const siteSearchIndex = [
  // Products
  { type: 'product', title: 'Key Chain', price: 'INR 40/-', category: 'Stationery & Accessories', url: 'product-catalogue.html?item=key-chain', img: 'https://static.wixstatic.com/media/c61a37_8fabb9eb61c84d79bd15fe12e4bc0d72~mv2.png' },
  { type: 'product', title: 'Paper Weight', price: 'INR 80/-', category: 'Stationery & Office', url: 'product-catalogue.html?item=paper-weight', img: 'https://static.wixstatic.com/media/c61a37_dd8bebea2f38413b82f8a05784100be4~mv2.png' },
  { type: 'product', title: 'Round Pen Stand', price: 'INR 100/-', category: 'Stationery & Office', url: 'product-catalogue.html?item=round-pen-stand', img: 'https://static.wixstatic.com/media/c61a37_a559b67bc40643589fd518737a0ec1b1~mv2.png' },
  { type: 'product', title: 'Candy Holder', price: 'INR 100/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=candy-holder', img: 'https://static.wixstatic.com/media/c61a37_d0f6f4ee8b38401bb0f8e4bc4afb75a8~mv2.png' },
  { type: 'product', title: 'Square Serving Tray Small', price: 'INR 100/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=square-serving-tray-small', img: 'https://static.wixstatic.com/media/c61a37_ba6741a42033478c97fa5021250d6236~mv2.png' },
  { type: 'product', title: 'Gifting Bottle Packaging', price: 'INR 125/-', category: 'Gift Hampers & Specials', url: 'product-catalogue.html?item=gifting-bottle-packaging', img: 'https://static.wixstatic.com/media/c61a37_6b61e926641f4d7b92062d60ab6b2858~mv2.png' },
  { type: 'product', title: 'Bowl', price: 'INR 140/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=bowl', img: 'https://static.wixstatic.com/media/c61a37_84f5671ca38844f7b3f5ae0ef3f52e4a~mv2.png' },
  { type: 'product', title: 'Planter', price: 'INR 150/-', category: 'Decor & Lifestyle', url: 'product-catalogue.html?item=planter', img: 'https://static.wixstatic.com/media/c61a37_c35f7bb01966469e960111c8dcc447d2~mv2.png' },
  { type: 'product', title: 'Book Cover', price: 'INR 150/-', category: 'Stationery & Accessories', url: 'product-catalogue.html?item=book-cover', img: 'https://static.wixstatic.com/media/c61a37_619cb29fbe614905aa4b8f9310968cc4~mv2.png' },
  { type: 'product', title: 'Square Pen Stand', price: 'INR 160/-', category: 'Stationery & Office', url: 'product-catalogue.html?item=square-pen-stand', img: 'https://static.wixstatic.com/media/c61a37_104ea47ac63d453787b8ab649dbd322c~mv2.png' },
  { type: 'product', title: 'M-U- Pen Stand', price: 'INR 160/-', category: 'Stationery & Office', url: 'product-catalogue.html?item=mu-pen-stand', img: 'https://static.wixstatic.com/media/c61a37_112a6965894b468fa382cbb64bdbf410~mv2.png' },
  { type: 'product', title: 'Zig-Zag Pen Stand', price: 'INR 160/-', category: 'Stationery & Office', url: 'product-catalogue.html?item=zig-zag-pen-stand', img: 'https://static.wixstatic.com/media/c61a37_4b2067e12eed4521a1cb281d5507cbf5~mv2.png' },
  { type: 'product', title: 'Toy Car', price: 'INR 175/-', category: 'Toys & Crafts', url: 'product-catalogue.html?item=toy-car', img: 'https://static.wixstatic.com/media/c61a37_7249094ea6a34450a5a2fcbcb0bb7e1f~mv2.png' },
  { type: 'product', title: 'Fruit Basket', price: 'INR 200/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=fruit-basket', img: 'https://static.wixstatic.com/media/c61a37_cc4bfeee594f4c84b74a71bbe7b36e93~mv2.png' },
  { type: 'product', title: 'Tea Coaster Set', price: 'INR 200/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=tea-coaster', img: 'https://static.wixstatic.com/media/c61a37_04397502c83d4557a4d7b19ef6c617cf~mv2.png' },
  { type: 'product', title: 'Flower / Fruit Basket', price: 'INR 200/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=flower-fruit-basket', img: 'https://static.wixstatic.com/media/c61a37_0749293a43c7461883b525cab5130fe3~mv2.png' },
  { type: 'product', title: 'Tea Light Holder', price: 'INR 200/-', category: 'Decor & Lifestyle', url: 'product-catalogue.html?item=tea-light-holder', img: 'https://static.wixstatic.com/media/c61a37_7a61408b59cb409aa774f862a2b7de56~mv2.png' },
  { type: 'product', title: 'National Flag Stand', price: 'INR 225/-', category: 'Decor & Office', url: 'product-catalogue.html?item=national-flag', img: 'https://static.wixstatic.com/media/c61a37_52ea109a6c444317a94bd03bb38363c5~mv2.png' },
  { type: 'product', title: 'Square Serving Tray Medium', price: 'INR 250/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=square-serving-tray-medium', img: 'https://static.wixstatic.com/media/c61a37_a725080d99d948688b0036f0d3cffd5c~mv2.png' },
  { type: 'product', title: 'Amplifier Speaker', price: 'INR 260/-', category: 'Decor & Lifestyle', url: 'product-catalogue.html?item=amplifier', img: 'https://static.wixstatic.com/media/c61a37_9362516b4cca4f1c9912d806db98cac3~mv2.png' },
  { type: 'product', title: 'Breakfast Tray', price: 'INR 300/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=breakfast-tray', img: 'https://static.wixstatic.com/media/c61a37_63e3cc01fd3142f99748264fb262e9ed~mv2.png' },
  { type: 'product', title: 'Serving Tray Large', price: 'INR 300/-', category: 'Home & Kitchen', url: 'product-catalogue.html?item=serving-tray', img: 'https://static.wixstatic.com/media/c61a37_901b46c8f6304bc7b2d77f73950538e2~mv2.png' },
  { type: 'product', title: 'Bullock Cart Showpiece', price: 'INR 325/-', category: 'Toys & Crafts', url: 'product-catalogue.html?item=bullock-cart', img: 'https://static.wixstatic.com/media/c61a37_9067b3763cf8462d94bdbc0c3b22b1ae~mv2.png' },
  { type: 'product', title: 'Makeup / Jewellery Box', price: 'INR 500/-', category: 'Decor & Lifestyle', url: 'product-catalogue.html?item=makeup-jewellery-box', img: 'https://static.wixstatic.com/media/c61a37_a363f068e387408fb49bc7363026d882~mv2.png' },
  { type: 'product', title: 'Wall Clock', price: 'INR 600/-', category: 'Decor & Lifestyle', url: 'product-catalogue.html?item=wall-clock', img: 'https://static.wixstatic.com/media/c61a37_e0e44bf648604ac0b9e355071ee9901a~mv2.png' },
  { type: 'product', title: 'Auto Rickshaw Model', price: 'INR 650/-', category: 'Toys & Crafts', url: 'product-catalogue.html?item=auto-rikshaw', img: 'https://static.wixstatic.com/media/c61a37_93196ff39d824e519e33fdbdb0902f57~mv2.png' },
  { type: 'product', title: 'Gift Hamper - 1', price: 'INR 480/-', category: 'Gift Hampers & Specials', url: 'product-catalogue.html?item=gift-hamper-1', img: 'https://static.wixstatic.com/media/c61a37_8e4135c74a0f4e7e91475185e5a24b19~mv2.png' },
  { type: 'product', title: 'Gift Hamper - 2', price: 'INR 690/-', category: 'Gift Hampers & Specials', url: 'product-catalogue.html?item=gift-hamper-2', img: 'https://static.wixstatic.com/media/c61a37_d4bea34f33d7471a9228d263af20cd5a~mv2.png' },
  { type: 'product', title: 'Gift Hamper - 3', price: 'INR 900/-', category: 'Gift Hampers & Specials', url: 'product-catalogue.html?item=gift-hamper-3', img: 'https://static.wixstatic.com/media/c61a37_4fbe8e2ad6a94836aa7cba0b956f9dc9~mv2.png' },
  { type: 'product', title: 'Gift Hamper - 4', price: 'INR 1305/-', category: 'Gift Hampers & Specials', url: 'product-catalogue.html?item=gift-hamper-4', img: 'https://static.wixstatic.com/media/c61a37_d655e9ae186b44e29814088b20918946~mv2.png' },
  { type: 'product', title: 'Handcrafted Rakhi (Pack of 4)', price: 'INR 150/-', category: 'Festive Special', url: 'index.html#rakhi-section', img: 'https://static.wixstatic.com/media/c61a37_0e1d9be187c9467eb936c910835e5da7~mv2.jpg' },

  // Blogs
  { type: 'blog', title: "The Eco-Warrior's Guide to Bamboo Products", category: 'Sustainability', url: 'post/the-eco-warriors-guide-to-bamboo-products.html', img: 'https://static.wixstatic.com/media/nsplsh_f37f4538f5c74dfbac88d84c5f318625~mv2.jpg' },
  { type: 'blog', title: 'Empowering Women Through Craft', category: 'Artisans', url: 'post/empowering-women-through-craft.html', img: 'https://static.wixstatic.com/media/c61a37_c19a4dddcbad4a71abf494ec44b61373~mv2.png' },
  { type: 'blog', title: 'Bamboo in Everyday Life', category: 'Lifestyle', url: 'post/bamboo-in-everyday-life.html', img: 'https://static.wixstatic.com/media/c61a37_838380b3a7ae4aa28928271516279bd5~mv2.jpeg' },
  { type: 'blog', title: 'From Forest to Fabric', category: 'Heritage', url: 'post/from-forest-to-fabric.html', img: 'https://static.wixstatic.com/media/c61a37_1d0eb38eb5bd4bb5b9f16e023d9b38aa~mv2.jpeg' },
  { type: 'blog', title: 'Sustainable Living: Eco-Friendly Homes', category: 'Eco Homes', url: 'post/sustainable-living-eco-friendly-homes.html', img: 'https://static.wixstatic.com/media/c61a37_f42eb9e9b3754bec9ce910b568f55c30~mv2.jpeg' },
  { type: 'blog', title: 'Bamboo and Women Empowerment', category: 'Community', url: 'post/bamboo-and-women-empowerment.html', img: 'https://static.wixstatic.com/media/c61a37_a0bbdc25df2a4f4f88b3fd91be270831~mv2.jpeg' }
];

function initLiveSearch() {
  const searchBoxes = document.querySelectorAll('.search-box');
  const isPostPage = window.location.pathname.includes('/post/');
  const pathPrefix = isPostPage ? '../' : '';

  searchBoxes.forEach(box => {
    const input = box.querySelector('input');
    if (!input) return;

    // Create dropdown container
    let dropdown = box.querySelector('.search-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      box.appendChild(dropdown);
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        return;
      }

      const results = siteSearchIndex.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q)
      );

      if (results.length === 0) {
        dropdown.innerHTML = `<div class="search-empty">No products or stories matching "${input.value}".</div>`;
      } else {
        dropdown.innerHTML = results.map(item => `
          <a href="${pathPrefix}${item.url}" class="search-item">
            <img src="${item.img}" alt="${item.title}" class="search-item-thumb">
            <div class="search-item-info">
              <span class="search-item-type ${item.type}">${item.type === 'product' ? 'Product' : 'Blog Post'}</span>
              <div class="search-item-title">${item.title}</div>
              <div class="search-item-meta">${item.price ? item.price : item.category}</div>
            </div>
          </a>
        `).join('');
      }
      dropdown.classList.add('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!box.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    // Handle Enter key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstResult = dropdown.querySelector('.search-item');
        if (firstResult) {
          window.location.href = firstResult.getAttribute('href');
        } else {
          window.location.href = `${pathPrefix}product-catalogue.html?search=${encodeURIComponent(input.value.trim())}`;
        }
      }
    });
  });
}

/* ==========================================================================
   3. HERO SLIDER CAROUSEL
   ========================================================================== */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const prevBtn = slider.querySelector('.hero-arrow.left');
  const nextBtn = slider.querySelector('.hero-arrow.right');
  const indicatorsContainer = slider.querySelector('.hero-indicators');
  let currentSlide = 0;
  let timer = null;

  if (slides.length <= 1) return;

  // Build dots
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `hero-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      indicatorsContainer.appendChild(dot);
    });
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.hero-dot') : [];
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 5500);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Initialize
  resetTimer();
}

/* ==========================================================================
   4. PRODUCT CATALOGUE (Filter + Instant WhatsApp Order)
   ========================================================================== */
function initProductCatalogue() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-grid .product-card');
  const catalogueSearch = document.getElementById('catalogueSearch');

  if (!filterPills.length && !productCards.length) return;

  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const initialSearch = urlParams.get('search');
  const initialItem = urlParams.get('item');

  if (initialSearch && catalogueSearch) {
    catalogueSearch.value = initialSearch;
    filterProducts(null, initialSearch.toLowerCase());
  } else if (initialCategory) {
    const matchingPill = Array.from(filterPills).find(p => p.dataset.category.toLowerCase() === initialCategory.toLowerCase());
    if (matchingPill) {
      filterPills.forEach(p => p.classList.remove('active'));
      matchingPill.classList.add('active');
      filterProducts(initialCategory, '');
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;
      const searchVal = catalogueSearch ? catalogueSearch.value.trim().toLowerCase() : '';
      filterProducts(cat, searchVal);
    });
  });

  if (catalogueSearch) {
    catalogueSearch.addEventListener('input', () => {
      const activePill = document.querySelector('.filter-pill.active');
      const cat = activePill ? activePill.dataset.category : 'all';
      filterProducts(cat, catalogueSearch.value.trim().toLowerCase());
    });
  }

  function filterProducts(category, search) {
    let visibleCount = 0;
    productCards.forEach(card => {
      const itemCat = card.dataset.category || 'all';
      const title = card.querySelector('h4') ? card.querySelector('h4').textContent.toLowerCase() : '';
      
      const matchCat = (!category || category === 'all' || itemCat.toLowerCase().includes(category.toLowerCase()));
      const matchSearch = (!search || title.includes(search));

      if (matchCat && matchSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('noProductsNotice');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Scroll to item if specified
  if (initialItem) {
    setTimeout(() => {
      const target = document.getElementById(initialItem);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('highlight-item');
        setTimeout(() => target.classList.remove('highlight-item'), 2500);
      }
    }, 300);
  }
}

/* ==========================================================================
   5. PRODUCT QUICK VIEW MODAL
   ========================================================================== */
function initQuickViewModal() {
  // Create modal container if not present
  let modal = document.getElementById('quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quickview-modal';
    modal.innerHTML = `
      <div class="quickview-backdrop"></div>
      <div class="quickview-dialog">
        <button class="quickview-close" aria-label="Close modal">&times;</button>
        <div class="quickview-content">
          <div class="quickview-media">
            <img src="" alt="" id="qvImg">
          </div>
          <div class="quickview-details">
            <span class="quickview-badge" id="qvCat">Handcrafted Bamboo</span>
            <h3 id="qvTitle">Product Title</h3>
            <div class="quickview-price" id="qvPrice">INR 0/-</div>
            <p class="quickview-desc" id="qvDesc">Handmade by skilled tribal women artisans of Vikramgad, Palghar. 100% natural, eco-friendly and sustainably harvested bamboo.</p>
            <div class="quickview-highlights">
              <div><strong>Material:</strong> 100% Seasoned Natural Bamboo</div>
              <div><strong>Origin:</strong> Palghar, Maharashtra (VBUPCL)</div>
              <div><strong>Impact:</strong> Environment • Empowerment • Employment</div>
            </div>
            <a href="#" class="btn btn-solid-olive btn-block" id="qvBuyBtn" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.15c-.24.67-1.39 1.29-1.92 1.37-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.32-1.75-1.32-3.34 0-1.59.83-2.37 1.13-2.69.3-.32.65-.4.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.55.27.67.92 2.25 1 2.42.08.16.14.36.03.57-.11.22-.16.35-.33.54-.16.19-.34.42-.49.56-.16.16-.33.34-.14.67.19.32.84 1.38 1.8 2.23 1.24 1.1 2.28 1.44 2.61 1.6.32.16.51.14.7-.08.19-.22.81-.95 1.03-1.27.22-.32.43-.27.73-.16.3.11 1.9 0.9 2.23 1.06.32.16.54.24.62.38.08.13.08.78-.16 1.45z"/></svg>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.quickview-close');
    const backdrop = modal.querySelector('.quickview-backdrop');
    const closeModal = () => modal.classList.remove('open');

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // Attach quick view to all product cards
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const thumb = card.querySelector('.thumb');
    const titleEl = card.querySelector('h4');
    const priceEl = card.querySelector('.price');
    const imgEl = card.querySelector('.thumb img');
    const cat = card.dataset.category || 'Handcrafted Bamboo';

    if (thumb && titleEl && priceEl) {
      thumb.style.cursor = 'pointer';
      thumb.addEventListener('click', () => {
        const title = titleEl.textContent.trim();
        const price = priceEl.textContent.trim();
        const imgSrc = imgEl ? imgEl.src : '';

        const modal = document.getElementById('quickViewModal');
        modal.querySelector('#qvTitle').textContent = title;
        modal.querySelector('#qvPrice').textContent = price;
        modal.querySelector('#qvImg').src = imgSrc;
        modal.querySelector('#qvImg').alt = title;
        modal.querySelector('#qvCat').textContent = cat;

        const waText = encodeURIComponent(`Hello Bamboo First, I am interested in ordering: ${title} (${price}). Please provide payment and delivery details.`);
        modal.querySelector('#qvBuyBtn').href = `https://wa.me/919152848332?text=${waText}`;

        modal.classList.add('open');
      });
    }
  });
}

/* ==========================================================================
   6. FORMS & VALIDATION (Contact, Eco-tourism, Newsletter)
   ========================================================================== */
function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
      }

      setTimeout(() => {
        showToast('Thank you! Your request has been received. Our team will contact you shortly.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }, 700);
    });
  });
}

function showToast(message, type = 'success') {
  let toast = document.querySelector('.site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `site-toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   7. FLOATING WHATSAPP BUTTON & CHAT TRIGGER
   ========================================================================== */
function initWhatsAppWidget() {
  if (document.querySelector('.whatsapp-float')) return;

  const waFloat = document.createElement('a');
  waFloat.className = 'whatsapp-float';
  waFloat.href = 'https://wa.me/919152848332?text=Hello%20Bamboo%20First,%20I%20have%20an%20inquiry%20about%20your%20handcrafted%20products.';
  waFloat.target = '_blank';
  waFloat.rel = 'noopener';
  waFloat.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waFloat.innerHTML = `
    <span class="whatsapp-tooltip">Order & Chat on WhatsApp</span>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.15c-.24.67-1.39 1.29-1.92 1.37-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.32-1.75-1.32-3.34 0-1.59.83-2.37 1.13-2.69.3-.32.65-.4.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.55.27.67.92 2.25 1 2.42.08.16.14.36.03.57-.11.22-.16.35-.33.54-.16.19-.34.42-.49.56-.16.16-.33.34-.14.67.19.32.84 1.38 1.8 2.23 1.24 1.1 2.28 1.44 2.61 1.6.32.16.51.14.7-.08.19-.22.81-.95 1.03-1.27.22-.32.43-.27.73-.16.3.11 1.9 0.9 2.23 1.06.32.16.54.24.62.38.08.13.08.78-.16 1.45z"/></svg>
  `;
  document.body.appendChild(waFloat);
}
