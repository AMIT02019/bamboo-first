/**
 * Bamboo First — Interactive Engine & Animation Controller
 * Header Scroll Effects, Dropdown Animation, Live Search, Carousel, Filters & Modals
 */

(function () {
  'use strict';

  // Product Database for Search & Modal
  const PRODUCTS = [
    {
      id: 'key-chain',
      name: 'Key Chain',
      price: 'INR 40/-',
      priceNum: 40,
      category: 'Stationery & Accessories',
      img: 'https://static.wixstatic.com/media/c61a37_8fabb9eb61c84d79bd15fe12e4bc0d72~mv2.png',
      desc: 'Handcrafted natural bamboo key ring with smooth sanded finish, lightweight and durable.',
      highlights: ['100% Biodegradable & Natural', 'Handcrafted by Palghar Tribal Artisans', 'Sturdy Steel Ring Attachment']
    },
    {
      id: 'paper-weight',
      name: 'Paper Weight',
      price: 'INR 80/-',
      priceNum: 80,
      category: 'Stationery & Office',
      img: 'https://static.wixstatic.com/media/c61a37_dd8bebea2f38413b82f8a05784100be4~mv2.png',
      desc: 'Solid treated bamboo desktop paperweight. Adds natural warmth and organization to your desk.',
      highlights: ['Solid Bamboo Core', 'Smooth Natural Polish', 'Ideal for Office & Home Study']
    },
    {
      id: 'round-pen-stand',
      name: 'Round Pen Stand',
      price: 'INR 100/-',
      priceNum: 100,
      category: 'Stationery & Office',
      img: 'https://static.wixstatic.com/media/c61a37_a559b67bc40643589fd518737a0ec1b1~mv2.png',
      desc: 'Classic cylindrical desktop pencil and pen stand carved from mature bamboo culms.',
      highlights: ['Holds 10+ Pens and Pencils', 'Eco-friendly Desk Accessory', 'Stable Base with Fine Finish']
    },
    {
      id: 'candy-holder',
      name: 'Candy Holder',
      price: 'INR 100/-',
      priceNum: 100,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_d0f6f4ee8b38401bb0f8e4bc4afb75a8~mv2.png',
      desc: 'Rustic artisanal candy and toffee holder for tabletop snacks and dining decor.',
      highlights: ['Food-grade Natural Finish', 'Charming Centerpiece', 'Handwoven Details']
    },
    {
      id: 'square-serving-tray-small',
      name: 'Square Serving Tray Small',
      price: 'INR 100/-',
      priceNum: 100,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_ba6741a42033478c97fa5021250d6236~mv2.png',
      desc: 'Compact square serving platter ideal for dry fruits, coasters, and small snacks.',
      highlights: ['Compact Dimensions', 'Durable Woven Slats', 'Easy to Wipe Clean']
    },
    {
      id: 'gifting-bottle-packaging',
      name: 'Gifting Bottle Packaging',
      price: 'INR 125/-',
      priceNum: 125,
      category: 'Gift Hampers & Specials',
      img: 'https://static.wixstatic.com/media/c61a37_6b61e926641f4d7b92062d60ab6b2858~mv2.png',
      desc: 'Elegant handcrafted bamboo bottle sleeve designed for premium festive and corporate gifting.',
      highlights: ['Fits Standard Beverage/Wine Bottles', 'Zero-Plastic Packaging Alternative', 'Reusable & Durable']
    },
    {
      id: 'bowl',
      name: 'Bowl',
      price: 'INR 140/-',
      priceNum: 140,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_84f5671ca38844f7b3f5ae0ef3f52e4a~mv2.png',
      desc: 'Deep handcrafted bamboo multipurpose bowl for nuts, keys, potpourri or dry items.',
      highlights: ['Deep Curved Contour', 'Artisanal Hand-lathed Body', 'Warm Natural Grain']
    },
    {
      id: 'planter',
      name: 'Planter',
      price: 'INR 150/-',
      priceNum: 150,
      category: 'Decor & Lifestyle',
      img: 'https://static.wixstatic.com/media/c61a37_c35f7bb01966469e960111c8dcc447d2~mv2.png',
      desc: 'Natural indoor plant pot casing made from sustainable bamboo. Perfect for succulents.',
      highlights: ['Breathable Bamboo Walls', 'Indoor & Balcony Decor', 'Eco-friendly Green Accent']
    },
    {
      id: 'book-cover',
      name: 'Book Cover',
      price: 'INR 150/-',
      priceNum: 150,
      category: 'Stationery & Accessories',
      img: 'https://static.wixstatic.com/media/c61a37_619cb29fbe614905aa4b8f9310968cc4~mv2.png',
      desc: 'Flexible woven bamboo slats bound into a journal/diary cover with handcrafted stitchwork.',
      highlights: ['Fits A5 Notebooks', 'Distinctive Rustic Feel', 'Long-lasting Cover Protection']
    },
    {
      id: 'square-pen-stand',
      name: 'Square Pen Stand',
      price: 'INR 160/-',
      priceNum: 160,
      category: 'Stationery & Office',
      img: 'https://static.wixstatic.com/media/c61a37_104ea47ac63d453787b8ab649dbd322c~mv2.png',
      desc: 'Geometric 4-sided desktop stationery organizer built from precision-cut bamboo panels.',
      highlights: ['Modern Square Silhouette', 'Polished Natural Finish', 'Holds Markers, Pens, Rulers']
    },
    {
      id: 'mu-pen-stand',
      name: 'M-U- Pen Stand',
      price: 'INR 160/-',
      priceNum: 160,
      category: 'Stationery & Office',
      img: 'https://static.wixstatic.com/media/c61a37_112a6965894b468fa382cbb64bdbf410~mv2.png',
      desc: 'Modern dual-slotted curved profile desktop desk organizer for stationery.',
      highlights: ['Dual Compartment Utility', 'Unique Sculptural Shape', 'Ergonomic Desk Access']
    },
    {
      id: 'zig-zag-pen-stand',
      name: 'Zig-Zag Pen Stand',
      price: 'INR 160/-',
      priceNum: 160,
      category: 'Stationery & Office',
      img: 'https://static.wixstatic.com/media/c61a37_4b2067e12eed4521a1cb281d5507cbf5~mv2.png',
      desc: 'Interlocking zigzag patterned bamboo organizer for creative workstations.',
      highlights: ['Creative Slatted Pattern', 'Excellent Desktop Visibility', 'Compact Space Footprint']
    },
    {
      id: 'toy-car',
      name: 'Toy Car',
      price: 'INR 175/-',
      priceNum: 175,
      category: 'Toys & Crafts',
      img: 'https://static.wixstatic.com/media/c61a37_7249094ea6a34450a5a2fcbcb0bb7e1f~mv2.png',
      desc: 'Non-toxic, plastic-free handcrafted wooden/bamboo rolling toy car for children and collectors.',
      highlights: ['Safe Smooth Sanded Edges', 'Zero Batteries or Chemicals', 'Fun Functional Rolling Wheels']
    },
    {
      id: 'fruit-basket',
      name: 'Fruit Basket',
      price: 'INR 200/-',
      priceNum: 200,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_cc4bfeee594f4c84b74a71bbe7b36e93~mv2.png',
      desc: 'Breathable slotted bamboo lattice fruit basket preventing moisture buildup on fresh fruits.',
      highlights: ['Aerated Slatted Structure', 'Sturdy Rim and Base', 'Farmhouse Dining Look']
    },
    {
      id: 'tea-coaster',
      name: 'Tea Coaster Set',
      price: 'INR 200/-',
      priceNum: 200,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_04397502c83d4557a4d7b19ef6c617cf~mv2.png',
      desc: 'Set of 6 handcrafted bamboo drink coasters with holding stand for hot and cold cups.',
      highlights: ['Set of 6 with Bamboo Holder', 'Heat-Resistant Protection', 'Prevents Surface Condensation']
    },
    {
      id: 'flower-fruit-basket',
      name: 'Flower / Fruit Basket',
      price: 'INR 200/-',
      priceNum: 200,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_0749293a43c7461883b525cab5130fe3~mv2.png',
      desc: 'Flared woven petal basket suitable for temple offerings, fresh flower arrangements or fruits.',
      highlights: ['Intricate Flower Contour', 'Lightweight & Strong', 'Traditional Festival Utility']
    },
    {
      id: 'tea-light-holder',
      name: 'Tea Light Holder',
      price: 'INR 200/-',
      priceNum: 200,
      category: 'Decor & Lifestyle',
      img: 'https://static.wixstatic.com/media/c61a37_7a61408b59cb409aa774f862a2b7de56~mv2.png',
      desc: 'Intricate cutwork bamboo candle holder that projects warm ambient light patterns.',
      highlights: ['Fits Standard Tea Lights', 'Luminous Shadow Projection', 'Serene Table Mood Light']
    },
    {
      id: 'national-flag',
      name: 'National Flag Stand',
      price: 'INR 225/-',
      priceNum: 225,
      category: 'Decor & Lifestyle',
      img: 'https://static.wixstatic.com/media/c61a37_52ea109a6c444317a94bd03bb38363c5~mv2.png',
      desc: 'Desk flagstand with handcrafted bamboo base and mast for office desks and study tables.',
      highlights: ['Premium Tabletop Accent', 'Sturdy Bamboo Base', 'Celebrates National Pride']
    },
    {
      id: 'square-serving-tray-medium',
      name: 'Square Serving Tray Medium',
      price: 'INR 250/-',
      priceNum: 250,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_a725080d99d948688b0036f0d3cffd5c~mv2.png',
      desc: 'Mid-sized square serving tray for tea sets, appetizers, beverages, and gifting arrangements.',
      highlights: ['Reinforced Frame', 'Raised Border Edges', 'Smooth Food-safe Seal']
    },
    {
      id: 'amplifier',
      name: 'Amplifier Speaker',
      price: 'INR 260/-',
      priceNum: 260,
      category: 'Decor & Lifestyle',
      img: 'https://static.wixstatic.com/media/c61a37_9362516b4cca4f1c9912d806db98cac3~mv2.png',
      desc: 'Passive acoustic bamboo phone amplifier that boosts smartphone sound naturally without batteries.',
      highlights: ['Zero Electricity or Batteries', 'Natural Resonance Chamber', 'Fits Most Phone Models']
    },
    {
      id: 'breakfast-tray',
      name: 'Breakfast Tray',
      price: 'INR 300/-',
      priceNum: 300,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_63e3cc01fd3142f99748264fb262e9ed~mv2.png',
      desc: 'Spacious rectangular morning platter with cut-out handles for serving bed teas & breakfast.',
      highlights: ['Integrated Side Handles', 'Deep Border Spill Protection', 'High Load Capacity']
    },
    {
      id: 'serving-tray',
      name: 'Serving Tray Large',
      price: 'INR 300/-',
      priceNum: 300,
      category: 'Home & Kitchen',
      img: 'https://static.wixstatic.com/media/c61a37_901b46c8f6304bc7b2d77f73950538e2~mv2.png',
      desc: 'Full-size bamboo dining tray with side grips for dinner service and hospitality setups.',
      highlights: ['Heavy Duty Construction', 'Generous Surface Area', 'Water-Resistant Natural Polish']
    },
    {
      id: 'bullock-cart',
      name: 'Bullock Cart Showpiece',
      price: 'INR 325/-',
      priceNum: 325,
      category: 'Toys & Crafts',
      img: 'https://static.wixstatic.com/media/c61a37_9067b3763cf8462d94bdbc0c3b22b1ae~mv2.png',
      desc: 'Meticulously crafted miniature traditional Indian bullock cart with rolling wheels.',
      highlights: ['Traditional Rural Heirloom', 'Intricate Miniature Detailing', 'Collectible Showpiece']
    },
    {
      id: 'makeup-jewellery-box',
      name: 'Makeup / Jewellery Box',
      price: 'INR 500/-',
      priceNum: 500,
      category: 'Decor & Lifestyle',
      img: 'https://static.wixstatic.com/media/c61a37_a363f068e387408fb49bc7363026d882~mv2.png',
      desc: 'Handmade hinged bamboo storage case with latch for keepsakes, jewellery, and vanity essentials.',
      highlights: ['Smooth Hinged Lid', 'Decorative Natural Grain', 'Protects Delicate Valuables']
    },
    {
      id: 'wall-clock',
      name: 'Wall Clock',
      price: 'INR 600/-',
      priceNum: 600,
      category: 'Decor & Lifestyle',
      img: 'https://static.wixstatic.com/media/c61a37_e0e44bf648604ac0b9e355071ee9901a~mv2.png',
      desc: 'Round bamboo clock dial with quartz movement. Brings earthy serenity to home walls.',
      highlights: ['Silent Sweep Quartz Machine', 'Artisanal Number Markings', 'Ready to Wall Mount']
    },
    {
      id: 'auto-rikshaw',
      name: 'Auto Rickshaw Model',
      price: 'INR 650/-',
      priceNum: 650,
      category: 'Toys & Crafts',
      img: 'https://static.wixstatic.com/media/c61a37_93196ff39d824e519e33fdbdb0902f57~mv2.png',
      desc: 'Famous 500-unit UK exported miniature bamboo auto rickshaw model with rolling wheels and canopy.',
      highlights: ['Globally Exported Milestone Craft', 'Fully Articulated Moving Parts', 'Iconic Indian Artifact']
    },
    {
      id: 'gift-hamper-1',
      name: 'Gift Hamper - 1',
      price: 'INR 480/-',
      priceNum: 480,
      category: 'Gift Hampers & Specials',
      img: 'https://static.wixstatic.com/media/c61a37_8e4135c74a0f4e7e91475185e5a24b19~mv2.png',
      desc: 'Curated corporate and festive gift box containing everyday desk and lifestyle bamboo essentials.',
      highlights: ['Includes Pen Stand, Coaster, Keychain', 'Custom Ribbon Packaging Available', 'Ideal Bulk Corporate Gift']
    },
    {
      id: 'gift-hamper-2',
      name: 'Gift Hamper - 2',
      price: 'INR 690/-',
      priceNum: 690,
      category: 'Gift Hampers & Specials',
      img: 'https://static.wixstatic.com/media/c61a37_d4bea34f33d7471a9228d263af20cd5a~mv2.png',
      desc: 'Curated home and dining combo hamper with tray, coaster set, and candle holder.',
      highlights: ['Serving Tray + Coasters + Tea Light', 'Pre-wrapped Gift Box Packaging', 'Great for Housewarming & Diwali']
    },
    {
      id: 'gift-hamper-3',
      name: 'Gift Hamper - 3',
      price: 'INR 900/-',
      priceNum: 900,
      category: 'Gift Hampers & Specials',
      img: 'https://static.wixstatic.com/media/c61a37_4fbe8e2ad6a94836aa7cba0b956f9dc9~mv2.png',
      desc: 'Deluxe eco-gifting set featuring handcrafted decor, kitchen accents, and stationery.',
      highlights: ['Planter + Clock + Coasters + Keychain', 'Handmade Artisan Certificate Included', 'Special Occasion Gifting']
    },
    {
      id: 'gift-hamper-4',
      name: 'Gift Hamper - 4',
      price: 'INR 1305/-',
      priceNum: 1305,
      category: 'Gift Hampers & Specials',
      img: 'https://static.wixstatic.com/media/c61a37_d655e9ae186b44e29814088b20918946~mv2.png',
      desc: 'Master executive bamboo collection presented in an artisanal bamboo hamper basket.',
      highlights: ['Complete 7-Piece Premium Artisan Set', 'Reusable Bamboo Basket Container', 'Luxury Eco-Friendly Gifting']
    }
  ];

  // Blog Articles Database for Search
  const BLOGS = [
    {
      title: "The Eco-Warrior's Guide to Bamboo Products",
      url: "post/the-eco-warriors-guide-to-bamboo-products.html",
      category: "Sustainability",
      date: "Dec 19, 2024",
      thumb: "https://static.wixstatic.com/media/nsplsh_f37f4538f5c74dfbac88d84c5f318625~mv2.jpg"
    },
    {
      title: "Empowering Women Through Craft",
      url: "post/empowering-women-through-craft.html",
      category: "Artisans",
      date: "Dec 19, 2024",
      thumb: "https://static.wixstatic.com/media/c61a37_c19a4dddcbad4a71abf494ec44b61373~mv2.png"
    },
    {
      title: "Bamboo in Everyday Life",
      url: "post/bamboo-in-everyday-life.html",
      category: "Lifestyle",
      date: "Dec 19, 2024",
      thumb: "https://static.wixstatic.com/media/c61a37_838380b3a7ae4aa28928271516279bd5~mv2.jpeg"
    },
    {
      title: "From Forest to Fabric",
      url: "post/from-forest-to-fabric.html",
      category: "Heritage",
      date: "Dec 19, 2024",
      thumb: "https://static.wixstatic.com/media/c61a37_1d0eb38eb5bd4bb5b9f16e023d9b38aa~mv2.jpeg"
    },
    {
      title: "Sustainable Living: Eco-Friendly Homes",
      url: "post/sustainable-living-eco-friendly-homes.html",
      category: "Eco Homes",
      date: "Dec 19, 2024",
      thumb: "https://static.wixstatic.com/media/c61a37_f42eb9e9b3754bec9ce910b568f55c30~mv2.jpeg"
    },
    {
      title: "Bamboo and Women Empowerment",
      url: "post/bamboo-and-women-empowerment.html",
      category: "Community",
      date: "Dec 19, 2024",
      thumb: "https://static.wixstatic.com/media/c61a37_a0bbdc25df2a4f4f88b3fd91be270831~mv2.jpeg"
    }
  ];

  // DOM Loaded Trigger
  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initDropdownInteraction();
    initMobileNav();
    initLiveSearch();
    initHeroCarousel();
    initCatalogueFilters();
    initQuickViewModal();
    initForms();
    initFloatingWhatsApp();
  });

  /* -------------------------------------------------------------
     1. Sticky Animated Header with Scroll Shrink
     ------------------------------------------------------------- */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 15) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }

  /* -------------------------------------------------------------
     2. Dropdown Animation & Touch Handler
     ------------------------------------------------------------- */
  function initDropdownInteraction() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
    });

    document.addEventListener('click', (e) => {
      dropdowns.forEach(dd => {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
        }
      });
    });
  }

  /* -------------------------------------------------------------
     3. Mobile Navigation Drawer
     ------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const centerCol = document.querySelector('.header-col-center');
    if (!toggle || !centerCol) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      centerCol.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (centerCol.classList.contains('open') && !centerCol.contains(e.target) && e.target !== toggle) {
        centerCol.classList.remove('open');
      }
    });

    centerCol.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 860) {
          centerCol.classList.remove('open');
        }
      });
    });
  }

  /* -------------------------------------------------------------
     4. Live Search with Dropdown Overlay
     ------------------------------------------------------------- */
  function initLiveSearch() {
    const searchBoxes = document.querySelectorAll('.search-box');
    if (!searchBoxes.length) return;

    searchBoxes.forEach(box => {
      const input = box.querySelector('input');
      if (!input) return;

      let dropdown = box.querySelector('.search-dropdown');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown';
        box.appendChild(dropdown);
      }

      input.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
          dropdown.innerHTML = '';
          dropdown.classList.remove('open');
          return;
        }

        const inSubfolder = window.location.pathname.includes('/post/');
        const prefix = inSubfolder ? '../' : '';

        const matchingProducts = PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query)
        );

        const matchingBlogs = BLOGS.filter(b => 
          b.title.toLowerCase().includes(query) || 
          b.category.toLowerCase().includes(query)
        );

        let html = '';

        if (matchingProducts.length === 0 && matchingBlogs.length === 0) {
          html = `<div class="search-empty">No results found for &ldquo;${escapeHtml(query)}&rdquo;</div>`;
        } else {
          matchingProducts.slice(0, 5).forEach(p => {
            const targetUrl = prefix + `product-catalogue.html#${p.id}`;
            html += `
              <a href="${targetUrl}" class="search-item" data-product-id="${p.id}">
                <img src="${p.img}" alt="${p.name}" class="search-item-thumb">
                <div class="search-item-info">
                  <span class="search-item-type product">Product</span>
                  <div class="search-item-title">${escapeHtml(p.name)}</div>
                  <div class="search-item-meta">${p.price}</div>
                </div>
              </a>
            `;
          });

          matchingBlogs.slice(0, 3).forEach(b => {
            const targetUrl = prefix + b.url;
            html += `
              <a href="${targetUrl}" class="search-item">
                <img src="${b.thumb}" alt="${b.title}" class="search-item-thumb">
                <div class="search-item-info">
                  <span class="search-item-type blog">Blog</span>
                  <div class="search-item-title">${escapeHtml(b.title)}</div>
                  <div class="search-item-meta" style="color:var(--ink-soft); font-weight:400;">${b.date}</div>
                </div>
              </a>
            `;
          });
        }

        dropdown.innerHTML = html;
        dropdown.classList.add('open');
      });

      document.addEventListener('click', (e) => {
        if (!box.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    });
  }

  /* -------------------------------------------------------------
     5. Hero Slider Carousel
     ------------------------------------------------------------- */
  function initHeroCarousel() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const prevBtn = slider.querySelector('.hero-arrow.left');
    const nextBtn = slider.querySelector('.hero-arrow.right');
    const indicatorsContainer = slider.querySelector('.hero-indicators');

    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.hero-dot') : [];
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    let slideTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);

    slider.addEventListener('mouseenter', () => clearInterval(slideTimer));
    slider.addEventListener('mouseleave', () => {
      clearInterval(slideTimer);
      slideTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
    });
  }

  /* -------------------------------------------------------------
     6. Product Catalogue Filters & Search
     ------------------------------------------------------------- */
  function initCatalogueFilters() {
    const pills = document.querySelectorAll('.filter-pill');
    const productGrid = document.querySelector('.product-grid');
    const searchInput = document.getElementById('catalogueSearch');
    const noNotice = document.getElementById('noProductsNotice');

    if (!productGrid) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilter() {
      const cards = productGrid.querySelectorAll('.product-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardTitle = (card.querySelector('h4') ? card.querySelector('h4').textContent : '').toLowerCase();

        const matchesCat = (activeCategory === 'all') || cardCategory.toLowerCase().includes(activeCategory.toLowerCase());
        const matchesSearch = !searchQuery || cardTitle.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noNotice) {
        noNotice.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-category') || 'all';
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }

    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        setTimeout(() => {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.classList.add('highlight-item');
          setTimeout(() => targetCard.classList.remove('highlight-item'), 3000);
        }, 300);
      }
    }
  }

  /* -------------------------------------------------------------
     7. Product Quick-View Modal
     ------------------------------------------------------------- */
  function initQuickViewModal() {
    let modal = document.getElementById('productQuickViewModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'productQuickViewModal';
      modal.className = 'quickview-modal';
      modal.style.display = 'none'; // hidden by default!
      modal.innerHTML = `
        <div class="quickview-backdrop"></div>
        <div class="quickview-dialog" role="dialog" aria-modal="true">
          <button class="quickview-close" aria-label="Close modal">&times;</button>
          <div class="quickview-content">
            <div class="quickview-media">
              <img src="" alt="" id="qvImg">
            </div>
            <div class="quickview-details">
              <span class="quickview-badge" id="qvCategory">Handcrafted Bamboo</span>
              <h3 id="qvTitle">Product Title</h3>
              <div class="quickview-price" id="qvPrice">INR 0/-</div>
              <p class="quickview-desc" id="qvDesc"></p>
              <div class="quickview-highlights" id="qvHighlights"></div>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                <a href="#" class="btn btn-solid-olive" id="qvWhatsAppBtn" target="_blank" rel="noopener">
                  Order on WhatsApp
                </a>
                <button type="button" class="btn btn-outline-olive btn-sm quickview-close-btn">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const backdrop = modal.querySelector('.quickview-backdrop');
    const closeBtn = modal.querySelector('.quickview-close');
    const closeBtnSecondary = modal.querySelector('.quickview-close-btn');

    function closeModal() {
      modal.classList.remove('open');
      modal.style.display = 'none';
    }

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBtnSecondary) closeBtnSecondary.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    document.querySelectorAll('.product-card').forEach(card => {
      const thumb = card.querySelector('.thumb');
      const title = card.querySelector('h4');
      const cardId = card.id;

      if (!cardId) return;

      const triggerHandler = (e) => {
        if (e.target.closest('a')) return;
        const productData = PRODUCTS.find(p => p.id === cardId);
        if (productData) {
          openModal(productData);
        }
      };

      if (thumb) thumb.addEventListener('click', triggerHandler);
      if (title) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', triggerHandler);
      }
    });

    function openModal(data) {
      document.getElementById('qvImg').src = data.img;
      document.getElementById('qvImg').alt = data.name;
      document.getElementById('qvCategory').textContent = data.category;
      document.getElementById('qvTitle').textContent = data.name;
      document.getElementById('qvPrice').textContent = data.price;
      document.getElementById('qvDesc').textContent = data.desc;

      const hlContainer = document.getElementById('qvHighlights');
      hlContainer.innerHTML = data.highlights.map(h => `<div>&bull; ${escapeHtml(h)}</div>`).join('');

      const waText = encodeURIComponent(`Hello Bamboo First, I would like to order: ${data.name} (${data.price}). Please share ordering and delivery details.`);
      document.getElementById('qvWhatsAppBtn').href = `https://wa.me/919152848332?text=${waText}`;

      modal.style.display = 'flex';
      // force reflow
      void modal.offsetWidth;
      modal.classList.add('open');
    }
  }

  /* -------------------------------------------------------------
     8. Forms & Toast Notification
     ------------------------------------------------------------- */
  function initForms() {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'site-toast';
      document.body.appendChild(toast);
    }

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    document.querySelectorAll('form').forEach(form => {
      if (form.classList.contains('search-box') || form.closest('.search-box')) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type=submit]');
        const origText = btn ? btn.textContent : 'Submit';
        if (btn) btn.textContent = 'Submitting...';

        setTimeout(() => {
          if (btn) btn.textContent = origText;
          form.reset();
          showToast('Thank you! Your request has been received. Our team will get back to you shortly.');
        }, 600);
      });
    });
  }

  /* -------------------------------------------------------------
     9. Floating WhatsApp Widget
     ------------------------------------------------------------- */
  function initFloatingWhatsApp() {
    if (document.querySelector('.whatsapp-float')) return;

    const wa = document.createElement('a');
    wa.className = 'whatsapp-float';
    wa.href = 'https://wa.me/919152848332?text=Hello%20Bamboo%20First,%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20initiatives.';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat with Bamboo First on WhatsApp');
    wa.innerHTML = `
      <span class="whatsapp-tooltip">Chat with us on WhatsApp</span>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/>
      </svg>
    `;
    document.body.appendChild(wa);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();
