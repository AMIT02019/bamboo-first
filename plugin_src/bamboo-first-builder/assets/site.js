/**
 * Bamboo First — Interactive Engine & Animation Controller
 * Header Scroll Effects, Dropdown Animation, Live Search, Carousel, Filters, Modals & Product Details
 */

(function () {
  'use strict';

  // Complete Product Database (26 Active Products from Official Catalog)
  const PRODUCTS = [
    {
        "id": "key-chain",
        "name": "Key Chain",
        "price": "INR 40/-",
        "priceNum": 40,
        "cost": "20",
        "dimensions": "2 x 1.5 x 1.5",
        "category": "Stationery & Accessories",
        "img": "assets/products/key-chain.webp",
        "gallery": [
            "assets/products/key-chain.webp",
            "assets/products/key-chain-2.webp"
        ],
        "desc": "A compact handcrafted bamboo key chain that keeps your keys organized in style. Its smooth natural finish makes it a practical everyday accessory and a charming eco-friendly gift.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 2 x 1.5 x 1.5 inches"
        ]
    },
    {
        "id": "paper-weight",
        "name": "Paper Weight",
        "price": "INR 80/-",
        "priceNum": 80,
        "cost": "45",
        "dimensions": "3 x 2 x 1.1",
        "category": "Stationery & Office",
        "img": "assets/products/paper-weight.webp",
        "gallery": [
            "assets/products/paper-weight.webp",
            "assets/products/handle-office-tray-2.webp"
        ],
        "desc": "A delightful paperweight shaped like a traditional Indian hut, handcrafted from bamboo. It holds papers and documents in place while adding rustic charm to any desk or study.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 3 x 2 x 1.1 inches"
        ]
    },
    {
        "id": "round-pen-stand",
        "name": "Round Pen Stand",
        "price": "INR 100/-",
        "priceNum": 100,
        "cost": "55",
        "dimensions": "5.5 x 2.5 x 4.5",
        "category": "Stationery & Office",
        "img": "assets/products/round-pen-stand.webp",
        "gallery": [
            "assets/products/round-pen-stand.webp",
            "assets/products/small-serving-tray-4.webp"
        ],
        "desc": "A round handcrafted bamboo pen stand that keeps pens, pencils, and brushes neatly organized on your desk. Its warm natural texture adds an elegant eco-friendly touch to home or office workspaces.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 5.5 x 2.5 x 4.5 inches"
        ]
    },
    {
        "id": "square-pen-stand",
        "name": "Square Pen Stand",
        "price": "INR 160/-",
        "priceNum": 160,
        "cost": "90",
        "dimensions": "Clean Square Slat",
        "category": "Stationery & Office",
        "img": "assets/products/square-pen-stand.webp",
        "gallery": [
            "assets/products/square-pen-stand.webp",
            "assets/products/square-pen-stand-2.webp"
        ],
        "desc": "A sturdy handcrafted bamboo pen stand with a clean square silhouette. It holds pens, pencils, and stationery within easy reach and suits both modern and traditional desk setups.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Eco-Friendly Artisanal Finish"
        ]
    },
    {
        "id": "mu-pen-stand",
        "name": "M-U Pen Stand",
        "price": "INR 160/-",
        "priceNum": 160,
        "cost": "90",
        "dimensions": "5.5 x 2.5 x 4",
        "category": "Stationery & Office",
        "img": "assets/products/mu-pen-stand.webp",
        "gallery": [
            "assets/products/mu-pen-stand.webp"
        ],
        "desc": "A distinctive handcrafted bamboo pen stand designed in a M and U-inspired shape. Its eye-catching form makes it a conversation piece while keeping your writing essentials organized.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 5.5 x 2.5 x 4 inches"
        ]
    },
    {
        "id": "amplifier",
        "name": "Amplifier",
        "price": "INR 260/-",
        "priceNum": 260,
        "cost": "160",
        "dimensions": "12 x 3 x 3",
        "category": "Decor & Lifestyle",
        "img": "assets/products/amplifier.webp",
        "gallery": [
            "assets/products/amplifier.webp",
            "assets/products/amplifier-2.webp"
        ],
        "desc": "A passive acoustic amplifier dock handcrafted from bamboo that naturally boosts your phone's speaker sound with no power or wires needed. Simply slot your phone in and enjoy louder, richer audio on your desk or bedside table.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 12 x 3 x 3 inches"
        ]
    },
    {
        "id": "bowl",
        "name": "Bowl",
        "price": "INR 140/-",
        "priceNum": 140,
        "cost": "95",
        "dimensions": "5 x 5 x 2.5",
        "category": "Home & Kitchen",
        "img": "assets/products/bowl.webp",
        "gallery": [
            "assets/products/bowl.webp",
            "assets/products/bowl-2.webp"
        ],
        "desc": "A handcrafted bamboo bowl ideal for serving snacks, salads, fruits, or dry items. Its natural grain and smooth finish bring warmth to dining tables and make everyday serving feel special.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 5 x 5 x 2.5 inches"
        ]
    },
    {
        "id": "fruit-basket",
        "name": "Fruit Basket",
        "price": "INR 200/-",
        "priceNum": 200,
        "cost": "130",
        "dimensions": "10 x 10 x 4",
        "category": "Home & Kitchen",
        "img": "assets/products/fruit-basket.webp",
        "gallery": [
            "assets/products/fruit-basket.webp",
            "assets/products/fruit-basket-2.webp",
            "assets/products/fruit-basket-3.webp"
        ],
        "desc": "A spacious handcrafted bamboo fruit basket that displays fresh fruit beautifully while keeping air circulating. A functional centrepiece for kitchens and dining tables, also suited to gifting.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 10 x 10 x 4 inches"
        ]
    },
    {
        "id": "tea-coaster",
        "name": "Tea Coaster",
        "price": "INR 200/-",
        "priceNum": 200,
        "cost": "120",
        "dimensions": "4 x 4 x 2",
        "category": "Home & Kitchen",
        "img": "assets/products/tea-coaster.webp",
        "gallery": [
            "assets/products/tea-coaster.webp",
            "assets/products/tea-coaster-2.webp",
            "assets/products/tea-coaster-3.webp",
            "assets/products/tea-coaster-4.webp"
        ],
        "desc": "A handcrafted bamboo tea coaster set with matching holder that protects your tables from heat marks and spills. Durable, easy to wipe clean, and a natural complement to tea cups and mugs.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 4 x 4 x 2 inches"
        ]
    },
    {
        "id": "zig-zag-pen-stand",
        "name": "Zig-Zag Pen Stand",
        "price": "INR 160/-",
        "priceNum": 160,
        "cost": "85",
        "dimensions": "3.5 x 2.6 x 5",
        "category": "Stationery & Office",
        "img": "assets/products/zig-zag-pen-stand.webp",
        "gallery": [
            "assets/products/zig-zag-pen-stand.webp",
            "assets/products/zig-zag-pen-stand-2.webp"
        ],
        "desc": "A handcrafted bamboo pen stand with a striking zig-zag design that adds sculptural interest to any desk. It keeps pens and stationery organized while doubling as a decorative accent.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 3.5 x 2.6 x 5 inches"
        ]
    },
    {
        "id": "wall-clock",
        "name": "Wall Clock",
        "price": "INR 600/-",
        "priceNum": 600,
        "cost": "400",
        "dimensions": "11 x 11 x 1",
        "category": "Decor & Lifestyle",
        "img": "assets/products/wall-clock.webp",
        "gallery": [
            "assets/products/wall-clock.webp",
            "assets/products/wall-clock-2.webp",
            "assets/products/wall-clock-3.webp"
        ],
        "desc": "A handcrafted bamboo wall clock that blends natural warmth with clear timekeeping. Its generous face suits living rooms, offices, and hallways, making time-telling a decorative statement.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 11 x 11 x 1 inches"
        ]
    },
    {
        "id": "serving-tray",
        "name": "Serving Tray",
        "price": "INR 300/-",
        "priceNum": 300,
        "cost": "190",
        "dimensions": "10 x 10 x 1",
        "category": "Home & Kitchen",
        "img": "assets/products/serving-tray.webp",
        "gallery": [
            "assets/products/serving-tray.webp",
            "assets/products/serving-tray-2.webp",
            "assets/products/serving-tray-3.webp"
        ],
        "desc": "A handcrafted bamboo serving tray sized for carrying tea, snacks, and refreshments. Lightweight yet sturdy, with a smooth finish that is easy to clean and lovely to serve from.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 10 x 10 x 1 inches"
        ]
    },
    {
        "id": "handle-office-tray",
        "name": "Handle Office Tray",
        "price": "INR 300/-",
        "priceNum": 300,
        "cost": "190",
        "dimensions": "13 x 9 x 3",
        "category": "Stationery & Office",
        "img": "assets/products/handle-office-tray.webp",
        "gallery": [
            "assets/products/handle-office-tray.webp",
            "assets/products/handle-office-tray-2.webp",
            "assets/products/handle-office-tray-3.webp"
        ],
        "desc": "A handcrafted bamboo office tray with handles for carrying documents, files, breakfast, and desk essentials. It keeps workspaces tidy and makes it easy to move items between desks and meeting rooms.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 13 x 9 x 3 inches"
        ]
    },
    {
        "id": "small-serving-tray",
        "name": "Small Serving Tray",
        "price": "INR 250/-",
        "priceNum": 250,
        "cost": "150",
        "dimensions": "9 x 9 x 1.5",
        "category": "Home & Kitchen",
        "img": "assets/products/small-serving-tray.webp",
        "gallery": [
            "assets/products/small-serving-tray.webp",
            "assets/products/small-serving-tray-2.webp",
            "assets/products/small-serving-tray-3.webp",
            "assets/products/small-serving-tray-4.webp"
        ],
        "desc": "A compact handcrafted bamboo serving tray, ideal for serving tea for two or presenting small snacks. Its petite size fits neatly on side tables and kitchen counters.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 9 x 9 x 1.5 inches"
        ]
    },
    {
        "id": "small-serving-tray-6x6",
        "name": "Small Serving Tray 6x6",
        "price": "INR 100/-",
        "priceNum": 100,
        "cost": "55",
        "dimensions": "12 x 8 x 1.5",
        "category": "Home & Kitchen",
        "img": "assets/products/small-serving-tray-6x6.webp",
        "gallery": [
            "assets/products/small-serving-tray-6x6.webp"
        ],
        "desc": "A slim handcrafted modular bamboo spice and snack tray with a generous serving surface and low profile. Well suited for spices, snacks, and condiments.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 12 x 8 x 1.5 inches"
        ]
    },
    {
        "id": "bullock-cart",
        "name": "Bullock Cart",
        "price": "INR 325/-",
        "priceNum": 325,
        "cost": "200",
        "dimensions": "12.3 x 4 x 6",
        "category": "Toys & Crafts",
        "img": "assets/products/bullock-cart.webp",
        "gallery": [
            "assets/products/bullock-cart.webp"
        ],
        "desc": "A decorative miniature bullock cart handcrafted from bamboo, capturing the charm of traditional rural India. A nostalgic showpiece for shelves, desks, and gift-giving.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 12.3 x 4 x 6 inches"
        ]
    },
    {
        "id": "planter",
        "name": "Planter",
        "price": "INR 150/-",
        "priceNum": 150,
        "cost": "100",
        "dimensions": "5 x 5 x 6",
        "category": "Decor & Lifestyle",
        "img": "assets/products/planter.webp",
        "gallery": [
            "assets/products/planter.webp"
        ],
        "desc": "A handcrafted bamboo planter that gives indoor plants a natural, earthy home. Its sturdy build suits small to medium plants and brightens desks, balconies, and living spaces.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 5 x 5 x 6 inches"
        ]
    },
    {
        "id": "auto-rikshaw",
        "name": "Auto Rickshaw",
        "price": "INR 650/-",
        "priceNum": 650,
        "cost": "400",
        "dimensions": "7 x 4.5 x 7",
        "category": "Toys & Crafts",
        "img": "assets/products/auto-rikshaw.webp",
        "gallery": [
            "assets/products/auto-rikshaw.webp"
        ],
        "desc": "A decorative miniature auto rickshaw handcrafted from bamboo, celebrating an icon of Indian streets. A fun, colourful accent for desks, shelves, and souvenir collections.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 7 x 4.5 x 7 inches"
        ]
    },
    {
        "id": "candy-holder",
        "name": "Candy Holder",
        "price": "INR 100/-",
        "priceNum": 100,
        "cost": "65",
        "dimensions": "6 x 6 x 3",
        "category": "Home & Kitchen",
        "img": "assets/products/candy-holder.webp",
        "gallery": [
            "assets/products/candy-holder.webp",
            "assets/products/candy-holder-2.webp"
        ],
        "desc": "A compact handcrafted bamboo container with legs, created for candies, mints, and small treats. Adds natural texture to coffee tables and makes a sweet gift accessory.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 6 x 6 x 3 inches"
        ]
    },
    {
        "id": "tea-light-holder",
        "name": "Tea Light Holder",
        "price": "INR 200/-",
        "priceNum": 200,
        "cost": "120",
        "dimensions": "8 x 7 x 10",
        "category": "Decor & Lifestyle",
        "img": "assets/products/tea-light-holder.webp",
        "gallery": [
            "assets/products/tea-light-holder.webp"
        ],
        "desc": "A handcrafted tiered bamboo tea light holder that casts warm, patterned shadows when lit. Creates a cozy, festive ambiance for dinners, meditation spaces, and evening gatherings.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 8 x 7 x 10 inches"
        ]
    },
    {
        "id": "makeup-box",
        "name": "Makeup Box",
        "price": "INR 500/-",
        "priceNum": 500,
        "cost": "320",
        "dimensions": "10 x 10 x 2.5",
        "category": "Decor & Lifestyle",
        "img": "assets/products/makeup-box.webp",
        "gallery": [
            "assets/products/makeup-box.webp",
            "assets/products/makeup-box-2.webp",
            "assets/products/makeup-box-3.webp"
        ],
        "desc": "An elegant handcrafted bamboo vanity box designed to hold cosmetics, jewelry, and personal accessories. A timeless storage solution that looks beautiful on dressing tables.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 10 x 10 x 2.5 inches"
        ]
    },
    {
        "id": "book-cover",
        "name": "Book Cover / Diary Sleeve",
        "price": "INR 150/-",
        "priceNum": 150,
        "cost": "90",
        "dimensions": "10 x 8 x 1",
        "category": "Stationery & Accessories",
        "img": "assets/products/book-cover.webp",
        "gallery": [
            "assets/products/book-cover.webp"
        ],
        "desc": "A flexible handcrafted bamboo book sleeve and diary cover that protects your journals and reading books in natural style. Lightweight, durable, and distinctive.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 10 x 8 x 1 inches"
        ]
    },
    {
        "id": "basket",
        "name": "Basket",
        "price": "INR 200/-",
        "priceNum": 200,
        "cost": "130",
        "dimensions": "7 x 3 x 7",
        "category": "Home & Kitchen",
        "img": "assets/products/basket.webp",
        "gallery": [
            "assets/products/basket.webp"
        ],
        "desc": "A versatile handcrafted bamboo basket with sturdy weave, ideal for flowers, fruits, knick-knacks, toiletries, or crafting supplies. Practical, breathable, and rustic.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 7 x 3 x 7 inches"
        ]
    },
    {
        "id": "toy-car",
        "name": "Toy Car",
        "price": "INR 175/-",
        "priceNum": 175,
        "cost": "110",
        "dimensions": "6.5 x 3 x 2.5",
        "category": "Toys & Crafts",
        "img": "assets/products/toy-car.webp",
        "gallery": [
            "assets/products/toy-car.webp"
        ],
        "desc": "A delightful handcrafted bamboo toy car with smooth rolling wooden wheels. An eco-friendly, non-toxic alternative to plastic toys that sparks imaginative play for children.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 6.5 x 3 x 2.5 inches"
        ]
    },
    {
        "id": "gifting-bottle",
        "name": "Gifting Bottle Packaging",
        "price": "INR 125/-",
        "priceNum": 125,
        "cost": "75",
        "dimensions": "3.5 x 17 x 3.3",
        "category": "Decor & Lifestyle",
        "img": "assets/products/gifting-bottle.webp",
        "gallery": [
            "assets/products/gifting-bottle.webp"
        ],
        "desc": "A cylindrical handcrafted bamboo case designed for premium beverage bottles and festive gifting. Replaces disposable packaging with a reusable artisanal container.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 3.5 x 17 x 3.3 inches"
        ]
    },
    {
        "id": "national-flag",
        "name": "National Flag Stand",
        "price": "INR 225/-",
        "priceNum": 225,
        "cost": "140",
        "dimensions": "3 x 2.5 x 13",
        "category": "Decor & Lifestyle",
        "img": "assets/products/national-flag.webp",
        "gallery": [
            "assets/products/national-flag.webp",
            "assets/products/national-flag-2.webp",
            "assets/products/national-flag-3.webp"
        ],
        "desc": "A handcrafted bamboo national desk flag stand with a sturdy polished base. Ideal for offices, study desks, and commemorative events to proudly display the tricolour.",
        "highlights": [
            "100% Biodegradable & Natural Bamboo",
            "Handcrafted by Palghar Tribal Artisans",
            "Dimensions: 3 x 2.5 x 13 inches"
        ]
    },
    {
        "id": "kandil-sahyadri-big",
        "name": "Sahyadri (Big) Bamboo Kandil",
        "price": "INR 900/-",
        "priceNum": 900,
        "cost": "500",
        "dimensions": "Large Diamond Frame (Non-Foldable)",
        "category": "Festive & Kandil",
        "img": "assets/products/kandil-sahyadri-big.webp",
        "gallery": [
            "assets/products/kandil-sahyadri-big.webp",
            "assets/products/bamboo-kandil-collection-poster.webp"
        ],
        "desc": "A grand handwoven bamboo Diwali lantern with rich red diamond panels, natural weave sections and a golden fringe tassel. Handmade by tribal women artisans in Vikramgad; its big non-foldable frame makes a striking statement at entrances and balconies.",
        "highlights": [
            "100% Environment Friendly & Natural Bamboo",
            "Handmade with Love by Tribal Sisters in Vikramgad, Palghar",
            "Non-Foldable Grand Festive Entrance Lantern",
            "Your One Diwali lantern can illuminate two homes this festive season",
            "An Initiative by Keshav Srushti, Supported by NABARD"
        ]
    },
    {
        "id": "kandil-anjaneri-big",
        "name": "Anjaneri (Big) Bamboo Kandil",
        "price": "INR 900/-",
        "priceNum": 900,
        "cost": "500",
        "dimensions": "Tall Diamond Taper (Foldable)",
        "category": "Festive & Kandil",
        "img": "assets/products/kandil-anjaneri-big.webp",
        "gallery": [
            "assets/products/kandil-anjaneri-big.webp",
            "assets/products/bamboo-kandil-collection-poster.webp"
        ],
        "desc": "A tall handcrafted bamboo kandil in royal blue, gold and magenta with a delicate woven lattice that glows warmly when lit. Foldable for easy storage after the festive season; handcrafted by tribal artisans.",
        "highlights": [
            "100% Environment Friendly & Natural Bamboo",
            "Handmade with Love by Tribal Sisters in Vikramgad, Palghar",
            "Convenient Foldable Design for Easy Storage",
            "Delicate Woven Lattice with Warm Festive Ambient Glow",
            "An Initiative by Keshav Srushti, Supported by NABARD"
        ]
    },
    {
        "id": "kandil-sahyadri-small",
        "name": "Sahyadri (Small) Bamboo Kandil",
        "price": "INR 600/-",
        "priceNum": 600,
        "cost": "350",
        "dimensions": "Compact Diamond Frame (Non-Foldable)",
        "category": "Festive & Kandil",
        "img": "assets/products/kandil-sahyadri-small.webp",
        "gallery": [
            "assets/products/kandil-sahyadri-small.webp",
            "assets/products/bamboo-kandil-collection-poster.webp"
        ],
        "desc": "A compact version of the Sahyadri lantern with colourful woven panels and a cheerful golden fringe. This non-foldable accent piece suits windows, small balconies and indoor decor.",
        "highlights": [
            "100% Environment Friendly & Natural Bamboo",
            "Handmade with Love by Tribal Sisters in Vikramgad, Palghar",
            "Non-Foldable Compact Accent Lantern",
            "Cheerful Golden Fringe & Vibrant Geometric Weave",
            "An Initiative by Keshav Srushti, Supported by NABARD"
        ]
    },
    {
        "id": "kandil-shivneri-big",
        "name": "Shivneri (Big) Bamboo Kandil",
        "price": "INR 900/-",
        "priceNum": 900,
        "cost": "500",
        "dimensions": "Sturdy Hexagonal Frame (Non-Foldable)",
        "category": "Festive & Kandil",
        "img": "assets/products/kandil-shivneri-big.webp",
        "gallery": [
            "assets/products/kandil-shivneri-big.webp",
            "assets/products/bamboo-kandil-collection-poster.webp"
        ],
        "desc": "A bold handcrafted bamboo kandil featuring vibrant magenta panels with white Warli-style tribal motifs alongside natural woven sections. A non-foldable statement piece celebrating tribal art, made in Palghar.",
        "highlights": [
            "100% Environment Friendly & Natural Bamboo",
            "Handmade with Love by Tribal Sisters in Vikramgad, Palghar",
            "Authentic Handpainted Warli Tribal Art Motifs",
            "Non-Foldable Sturdy Hexagonal Silhouette",
            "An Initiative by Keshav Srushti, Supported by NABARD"
        ]
    },
    {
        "id": "kandil-purandar-big",
        "name": "Purandar (Big) Bamboo Kandil",
        "price": "INR 900/-",
        "priceNum": 900,
        "cost": "500",
        "dimensions": "Cylindrical Weave (Non-Foldable)",
        "category": "Festive & Kandil",
        "img": "assets/products/kandil-purandar-big.webp",
        "gallery": [
            "assets/products/kandil-purandar-big.webp",
            "assets/products/bamboo-kandil-collection-poster.webp"
        ],
        "desc": "A sleek cylindrical bamboo lantern in a warm orange weave with a modern minimal look that casts beautiful patterned light. Non-foldable and handcrafted by tribal artisans; suits contemporary and traditional decor alike.",
        "highlights": [
            "100% Environment Friendly & Natural Bamboo",
            "Handmade with Love by Tribal Sisters in Vikramgad, Palghar",
            "Contemporary Cylindrical Weave Pattern",
            "Non-Foldable Sleek Architectural Design",
            "An Initiative by Keshav Srushti, Supported by NABARD"
        ]
    },
    {
        "id": "kandil-anjaneri-small",
        "name": "Anjaneri (Small) Bamboo Kandil",
        "price": "INR 600/-",
        "priceNum": 600,
        "cost": "350",
        "dimensions": "Petite Diamond Taper (Foldable)",
        "category": "Festive & Kandil",
        "img": "assets/products/kandil-anjaneri-small.webp",
        "gallery": [
            "assets/products/kandil-anjaneri-small.webp",
            "assets/products/bamboo-kandil-collection-poster.webp"
        ],
        "desc": "A petite foldable bamboo kandil in royal blue and warm orange weaves, easy to hang and store. Handmade by tribal sisters; ideal for gifting or adding festive glow to compact spaces.",
        "highlights": [
            "100% Environment Friendly & Natural Bamboo",
            "Handmade with Love by Tribal Sisters in Vikramgad, Palghar",
            "Compact & Foldable - Ideal for Gifting and Shipping",
            "Rich Royal Blue & Warm Orange Festive Contrast",
            "An Initiative by Keshav Srushti, Supported by NABARD"
        ]
    }
];

  // Blog Database for Search
  const BLOGS = [
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

  // Helper function to resolve product detail URL based on environment
  
  // Helper function to resolve product image URL based on environment
  function getProductImgUrl(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const isWP = !window.location.pathname.endsWith('.html');
    if (isWP) {
      return '/wp-content/plugins/bamboo-first-builder/' + path.replace(/^\//, '');
    }
    const inSubfolder = window.location.pathname.includes('/post/');
    const prefix = inSubfolder ? '../' : '';
    return prefix + path.replace(/^\//, '');
  }

  function getProductUrl(productId) {
    const isWP = !window.location.pathname.endsWith('.html');
    if (isWP) {
      return `/product/?id=${encodeURIComponent(productId)}`;
    }
    const inSubfolder = window.location.pathname.includes('/post/');
    const prefix = inSubfolder ? '../' : '';
    return `${prefix}product.html?id=${encodeURIComponent(productId)}`;
  }

  // Helper function to resolve blog URL based on environment
  function getBlogUrl(blogUrl) {
    const isWP = !window.location.pathname.endsWith('.html');
    if (isWP) {
      return '/blog/';
    }
    const inSubfolder = window.location.pathname.includes('/post/');
    const prefix = inSubfolder ? '../' : '';
    return prefix + blogUrl;
  }

  // Helper function to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* -------------------------------------------------------------
     1. Fixed Animated Header: Disappear on Scroll Down, Appear on Scroll Up
     ------------------------------------------------------------- */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
    let ticking = false;
    const hideThreshold = 120; // Only hide after scrolling past 120px
    const deltaDown = 8;       // Minimum downwards movement to trigger hide
    const deltaUp = 6;         // Minimum upwards movement to trigger reveal

    function updateHeader() {
      const currentScrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
      const delta = currentScrollY - lastScrollY;
      const mobileNavOpen = document.querySelector('.header-col-center.open');
      const searchActive = document.querySelector('.search-dropdown.open');

      // Top of page: always visible and not scrolled
      if (currentScrollY <= 20) {
        header.classList.remove('scrolled');
        header.classList.remove('header-hidden');
      } else {
        header.classList.add('scrolled');

        if (!mobileNavOpen && !searchActive) {
          if (currentScrollY > hideThreshold && delta > deltaDown) {
            // User is scrolling DOWN -> Hide header
            header.classList.add('header-hidden');
          } else if (delta < -deltaUp) {
            // User is scrolling UP -> Reveal header
            header.classList.remove('header-hidden');
          }
        } else {
          header.classList.remove('header-hidden');
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeader(); // Initial run
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
            const targetUrl = getProductUrl(p.id);
            html += `
              <a href="${targetUrl}" class="search-item" data-product-id="${p.id}">
                <img src="${getProductImgUrl(p.img)}" alt="${p.name}" class="search-item-thumb">
                <div class="search-item-info">
                  <span class="search-item-type product">Product</span>
                  <div class="search-item-title">${escapeHtml(p.name)}</div>
                  <div class="search-item-meta">${p.price}</div>
                </div>
              </a>
            `;
          });

          matchingBlogs.slice(0, 3).forEach(b => {
            const targetUrl = getBlogUrl(b.url);
            html += `
              <a href="${targetUrl}" class="search-item">
                <img src="${b.thumb}" alt="${b.title}" class="search-item-thumb">
                <div class="search-item-info">
                  <span class="search-item-type blog">Story</span>
                  <div class="search-item-title">${escapeHtml(b.title)}</div>
                  <div class="search-item-meta">${b.date} &bull; ${b.category}</div>
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
     5. Homepage Hero Carousel
     ------------------------------------------------------------- */
  function initHeroCarousel() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    if (!slides.length) return;

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

    // Check URL query parameters (e.g. ?cat=Festive or ?category=kandil)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category') || urlParams.get('cat') || '';
    if (catParam) {
      const matchPill = Array.from(pills).find(p => {
        const c = (p.getAttribute('data-category') || '').toLowerCase();
        const param = catParam.toLowerCase();
        return c.includes(param) || (param.includes('kandil') && c.includes('festive')) || (param.includes('festive') && c.includes('kandil'));
      });
      if (matchPill) {
        pills.forEach(p => p.classList.remove('active'));
        matchPill.classList.add('active');
        activeCategory = matchPill.getAttribute('data-category') || 'all';
      }
    }

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

    // Apply initial filter if category query param was present
    if (activeCategory !== 'all') {
      applyFilter();
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
      modal.style.display = 'none';
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
              <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
                <button type="button" class="btn btn-solid-olive btn-sm btn-add-to-cart" id="qvAddToCartBtn" style="padding:8px 16px; cursor:pointer;">
                  Add to Cart
                </button>
                <a href="#" class="btn btn-outline-olive btn-sm" id="qvProductPageLink">
                  View Full Details &rarr;
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
      document.getElementById('qvImg').src = getProductImgUrl(data.img);
      document.getElementById('qvImg').alt = data.name;
      document.getElementById('qvCategory').textContent = data.category;
      document.getElementById('qvTitle').textContent = data.name;
      document.getElementById('qvPrice').textContent = data.price;
      document.getElementById('qvDesc').textContent = data.desc;

      const hlContainer = document.getElementById('qvHighlights');
      hlContainer.innerHTML = data.highlights.map(h => `<div>&bull; ${escapeHtml(h)}</div>`).join('');

      const qvAddBtn = document.getElementById('qvAddToCartBtn');
      if (qvAddBtn) {
        qvAddBtn.onclick = () => {
          addToCart(data.id, 1, false);
          closeModal();
        };
      }

      const productPageLink = document.getElementById('qvProductPageLink');
      if (productPageLink) {
        productPageLink.href = getProductUrl(data.id);
      }

      modal.style.display = 'flex';
      void modal.offsetWidth;
      modal.classList.add('open');
    }
  }

  /* -------------------------------------------------------------
     8. Individual Product Detail Page Controller (Dynamic Hydration)
     ------------------------------------------------------------- */
  function initProductDetailPage() {
    const detailTitleEl = document.getElementById('detailTitle');
    const detailMainImgEl = document.getElementById('detailMainImg');
    if (!detailTitleEl && !detailMainImgEl) return;

    // Parse URL parameter ?id=...
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    // If no ID or ID not found, default to first product ('key-chain')
    let product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      product = PRODUCTS[0];
    }

    // 1. Populate Page Meta & Document Title
    document.title = `${product.name} | Handcrafted Bamboo | Bamboo First`;
    const metaDesc = document.getElementById('pageMetaDesc');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${product.name} - ${product.desc} Handcrafted in Vikramgad, Palghar.`);
    }

    // 2. Populate Breadcrumbs
    const bcCat = document.getElementById('breadcrumbCategory');
    const bcTitle = document.getElementById('breadcrumbTitle');
    if (bcCat) bcCat.textContent = product.category;
    if (bcTitle) bcTitle.textContent = product.name;

    // 3. Populate Main Info
    if (detailMainImgEl) {
      detailMainImgEl.src = getProductImgUrl(product.img);
      detailMainImgEl.alt = product.name;
    }

    const catEl = document.getElementById('detailCategory');
    if (catEl) catEl.textContent = product.category;

    if (detailTitleEl) detailTitleEl.textContent = product.name;

    const skuEl = document.getElementById('detailSku');
    if (skuEl) skuEl.textContent = `SKU: BF-${product.id.toUpperCase().replace(/[^A-Z0-9]/g, '')}`;

    const priceEl = document.getElementById('detailPrice');
    if (priceEl) priceEl.textContent = product.price;

    const descEl = document.getElementById('detailDesc');
    if (descEl) descEl.textContent = product.desc;

    // 4. Populate Highlights with SVGs
    const hlContainer = document.getElementById('detailHighlights');
    if (hlContainer) {
      hlContainer.innerHTML = product.highlights.map(h => `
        <li>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${escapeHtml(h)}</span>
        </li>
      `).join('');
    }

    // 5. Populate Dynamic Gallery Thumbnails
    const thumbsContainer = document.getElementById('detailGalleryThumbs');
    if (thumbsContainer) {
      const galleryList = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.img];
      thumbsContainer.innerHTML = galleryList.map((gImg, idx) => {
        const fullImgUrl = getProductImgUrl(gImg);
        return `
          <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" onclick="window.switchMainImage('${fullImgUrl}', this)">
            <img src="${fullImgUrl}" alt="${escapeHtml(product.name)} view ${idx + 1}">
          </div>
        `;
      }).join('');
    }

    // 6. Update Specifications Dimensions
    const dimsEl = document.getElementById('detailDimensions');
    if (dimsEl) {
      dimsEl.textContent = product.dimensions ? `${product.dimensions} inches` : 'Handcrafted standard artisanal size';
    }

    // 7. Bulk Inquiry Product Name Field
    const inquiryProduct = document.getElementById('inquiryProductName');
    if (inquiryProduct) {
      inquiryProduct.value = `${product.name} (${product.price})`;
    }

    // 8. Quantity Stepper & WhatsApp Pre-filled Order Calculations
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const btnOrderWhatsApp = document.getElementById('btnOrderWhatsApp');
    const btnShareWhatsApp = document.getElementById('btnShareWhatsApp');

    function updateCalculations() {
      let qty = parseInt(qtyInput ? qtyInput.value : '1', 10);
      if (isNaN(qty) || qty < 1) qty = 1;
      if (qtyInput) qtyInput.value = qty;

      const unitPrice = product.priceNum || 100;
      const total = qty * unitPrice;

      if (totalPriceDisplay) {
        totalPriceDisplay.textContent = `INR ${total}/-`;
      }

      if (btnOrderWhatsApp) {
        const waMsg = `Hello Bamboo First! I would like to order:\n\n• Product: ${product.name}\n• Quantity: ${qty}\n• Price: ${product.price}\n• Total Amount: INR ${total}/-\n\nPlease confirm availability and dispatch details to my address.`;
        btnOrderWhatsApp.href = `https://wa.me/919152848332?text=${encodeURIComponent(waMsg)}`;
      }

      if (btnShareWhatsApp) {
        const shareMsg = `Check out this handcrafted ${product.name} from Bamboo First: ${window.location.href}`;
        btnShareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;
      }
    }

    if (qtyMinus) {
      qtyMinus.onclick = () => {
        let q = parseInt(qtyInput.value, 10);
        if (q > 1) {
          qtyInput.value = q - 1;
          updateCalculations();
        }
      };
    }

    if (qtyPlus) {
      qtyPlus.onclick = () => {
        let q = parseInt(qtyInput.value, 10);
        qtyInput.value = q + 1;
        updateCalculations();
      };
    }

    if (qtyInput) {
      qtyInput.oninput = updateCalculations;
      qtyInput.onchange = updateCalculations;
    }

    updateCalculations();

    
    // Detail Page Add to Cart & Buy Now Buttons
    const btnAddToCartDetail = document.getElementById('btnAddToCartDetail');
    if (btnAddToCartDetail) {
      btnAddToCartDetail.onclick = () => {
        let q = parseInt(qtyInput ? qtyInput.value : '1', 10);
        if (isNaN(q) || q < 1) q = 1;
        addToCart(product.id, q, false);
      };
    }

    const btnBuyNowDetail = document.getElementById('btnBuyNowDetail');
    if (btnBuyNowDetail) {
      btnBuyNowDetail.onclick = () => {
        let q = parseInt(qtyInput ? qtyInput.value : '1', 10);
        if (isNaN(q) || q < 1) q = 1;
        addToCart(product.id, q, true);
      };
    }

    // 9. Copy Link Button with Toast Feedback
    const btnCopyLink = document.getElementById('btnCopyLink');
    if (btnCopyLink) {
      btnCopyLink.onclick = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Product link copied to clipboard!');
        }).catch(() => {
          showToast('Link copied: ' + window.location.href);
        });
      };
    }

    // 10. Specifications Tabs Controller
    const tabButtons = document.querySelectorAll('.tab-nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane-content');

    tabButtons.forEach(btn => {
      btn.onclick = () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      };
    });

    // 11. Populate Related Products
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedGrid) {
      const otherProducts = PRODUCTS.filter(p => p.id !== product.id);
      const sameCat = otherProducts.filter(p => p.category === product.category);
      const diffCat = otherProducts.filter(p => p.category !== product.category);
      const related = [...sameCat, ...diffCat].slice(0, 4);

      relatedGrid.innerHTML = related.map(p => {
        const itemUrl = getProductUrl(p.id);
        return `
          <div class="product-card" id="${p.id}" data-category="${escapeHtml(p.category)}">
            <div class="thumb" onclick="window.location.href='${itemUrl}'" style="cursor:pointer;" title="Click to view details">
              <img src="${getProductImgUrl(p.img)}" alt="${escapeHtml(p.name)}" loading="lazy">
              <span class="badge">${escapeHtml(p.category.split('&')[0].trim())}</span>
            </div>
            <h4><a href="${itemUrl}">${escapeHtml(p.name)}</a></h4>
            <div class="price">${p.price}</div>
            <div style="font-size:0.8rem; color:var(--ink-light); margin-top:2px;">Size: ${p.dimensions || 'Handcrafted'} in</div>
            <div class="card-actions" style="display:flex; gap:8px; margin-top:10px;">
              <button type="button" class="btn btn-solid-olive btn-sm btn-add-to-cart" onclick="window.addToCart('${p.id}', 1)" style="flex:1; text-align:center;">Add to Cart</button>
              <a href="${itemUrl}" class="btn btn-outline-olive btn-sm" style="padding:6px 10px;">Details &rarr;</a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Globally exposed image switcher for thumbnails
  function switchMainImage(src, el) {
    const mainImg = document.getElementById('detailMainImg');
    if (mainImg) mainImg.src = src;
    document.querySelectorAll('.gallery-thumb-item').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  /* -------------------------------------------------------------
     9. Forms & Toast Notification
     ------------------------------------------------------------- */
  let siteToastEl = null;
  let toastTimer = null;

  function showToast(msg) {
    if (!siteToastEl) {
      siteToastEl = document.getElementById('siteToast');
      if (!siteToastEl) {
        siteToastEl = document.createElement('div');
        siteToastEl.id = 'siteToast';
        siteToastEl.className = 'site-toast';
        document.body.appendChild(siteToastEl);
      }
    }
    siteToastEl.innerHTML = msg;
    siteToastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      if (siteToastEl) siteToastEl.classList.remove('show');
    }, 4500);
  }

  function initForms() {
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
          showToast('Thank you! Your request has been received. Our artisan coordination team will get back to you shortly.');
        }, 600);
      });
    });
  }

  /* -------------------------------------------------------------
     10. Floating WhatsApp Widget
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

  
  /* -------------------------------------------------------------
     8.1 E-Commerce Shopping Cart System
     ------------------------------------------------------------- */
  const CART_STORAGE_KEY = 'bamboo_cart_items_v1';

  function getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Could not save cart to localStorage', e);
    }
    updateCartBadges();
  }

  function updateCartBadges() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + (parseInt(item.qty, 10) || 1), 0);
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.classList.remove('bounce');
      void badge.offsetWidth;
      badge.classList.add('bounce');
    });
  }

  function addToCart(productId, qty = 1, shouldRedirect = false) {
    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty < 1) qty = 1;

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      showToast('Product could not be found.');
      return;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);
    const unitPrice = product.priceNum || parseInt(product.price.replace(/[^\d]/g, ''), 10) || 0;

    if (existingIndex > -1) {
      cart[existingIndex].qty = (parseInt(cart[existingIndex].qty, 10) || 1) + qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: unitPrice,
        img: product.img,
        category: product.category,
        dimensions: product.dimensions || '',
        qty: qty
      });
    }

    saveCart(cart);

    // Visual button feedback
    const activeBtn = (window.event && window.event.target) ? window.event.target.closest('.btn-add-to-cart') : null;
    if (activeBtn) {
      const origText = activeBtn.innerHTML;
      activeBtn.innerHTML = '✓ Added!';
      activeBtn.classList.add('added');
      setTimeout(() => {
        activeBtn.innerHTML = origText;
        activeBtn.classList.remove('added');
      }, 1500);
    }

    const isWP = !window.location.pathname.endsWith('.html');
    const cartUrl = isWP ? '/cart/' : 'cart.html';
    showToast(`✓ Added <strong>${escapeHtml(product.name)}</strong> (${qty}) to cart! <a href="${cartUrl}">View Cart &rarr;</a>`);

    if (shouldRedirect) {
      window.location.href = isWP ? '/checkout/' : 'checkout.html';
    }
  }

  function updateCartItemQty(productId, newQty) {
    newQty = parseInt(newQty, 10);
    let cart = getCart();
    if (newQty <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const item = cart.find(i => i.id === productId);
      if (item) item.qty = newQty;
    }
    saveCart(cart);
    renderCartPage();
  }

  function removeFromCart(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
    if (item) {
      showToast(`Removed ${escapeHtml(item.name)} from cart.`);
    }
    renderCartPage();
  }

  function clearCart() {
    saveCart([]);
    renderCartPage();
    showToast('Shopping cart cleared.');
  }

  function initCartSystem() {
    updateCartBadges();
    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        updateCartBadges();
        renderCartPage();
      }
    });
  }

  /* -------------------------------------------------------------
     8.2 Cart Page Renderer
     ------------------------------------------------------------- */
  function renderCartPage() {
    const container = document.getElementById('cartPageContainer');
    if (!container) return;

    const cart = getCart();
    const isWP = !window.location.pathname.endsWith('.html');
    const catalogueUrl = isWP ? '/product-catalogue/' : 'product-catalogue.html';
    const checkoutUrl = isWP ? '/checkout/' : 'checkout.html';

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-panel">
          <div class="cart-empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2>Your Cart is Currently Empty</h2>
          <p>You haven't added any handcrafted bamboo products yet. Discover unique, eco-friendly creations made with pride by tribal women in Vikramgad, Palghar.</p>
          <a href="${catalogueUrl}" class="btn btn-solid-olive" style="padding:14px 32px; font-weight:600; font-size:1.02rem;">
            Explore Handcrafted Catalogue (32 Products) &rarr;
          </a>
        </div>
      `;
      return;
    }

    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.qty, 10) || 1), 0);
    const subtotal = cart.reduce((sum, item) => sum + ((item.priceNum || 0) * (parseInt(item.qty, 10) || 1)), 0);
    const shipping = subtotal >= 1000 ? 0 : 60;
    const grandTotal = subtotal + shipping;

    const itemsHTML = cart.map(item => {
      const itemUrl = getProductUrl(item.id);
      const itemImg = getProductImgUrl(item.img);
      const itemSubtotal = (item.priceNum || 0) * item.qty;

      return `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-thumb">
            <a href="${itemUrl}"><img src="${itemImg}" alt="${escapeHtml(item.name)}"></a>
          </div>
          <div class="cart-item-details">
            <div class="cart-item-category">${escapeHtml(item.category || 'Handcrafted')}</div>
            <h4 class="cart-item-title"><a href="${itemUrl}">${escapeHtml(item.name)}</a></h4>
            <div class="cart-item-unit-price">${item.price} &bull; ${item.dimensions ? 'Size: ' + item.dimensions + ' in' : 'Artisanal'}</div>
          </div>
          <div class="cart-item-qty-wrap">
            <div class="cart-qty-stepper">
              <button type="button" class="cart-qty-btn" onclick="window.updateCartItemQty('${item.id}', ${item.qty - 1})" aria-label="Decrease">&minus;</button>
              <input type="number" class="cart-qty-input" value="${item.qty}" min="1" max="100" onchange="window.updateCartItemQty('${item.id}', this.value)">
              <button type="button" class="cart-qty-btn" onclick="window.updateCartItemQty('${item.id}', ${item.qty + 1})" aria-label="Increase">+</button>
            </div>
            <button type="button" class="cart-item-remove-btn" onclick="window.removeFromCart('${item.id}')" title="Remove item" aria-label="Remove">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
          <div class="cart-item-subtotal">INR ${itemSubtotal}/-</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="cart-layout">
        <!-- LEFT: Items Panel -->
        <div class="cart-items-panel">
          <div class="cart-items-header">
            <h2>Cart Items (${totalItems})</h2>
            <button type="button" class="cart-clear-btn" onclick="window.clearCart()">Clear All</button>
          </div>
          <div class="cart-items-list">
            ${itemsHTML}
          </div>
          <div style="margin-top:24px; padding-top:18px; border-top:1px solid #f0eee6; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <a href="${catalogueUrl}" class="btn btn-outline-olive btn-sm">&larr; Continue Shopping</a>
            <span style="font-size:0.86rem; color:var(--ink-soft);">
              ${subtotal >= 1000 ? '<strong style="color:#2e7d32;">✓ Free Delivery Unlocked</strong>' : 'Add INR ' + (1000 - subtotal) + '/- more for Free Delivery'}
            </span>
          </div>
        </div>

        <!-- RIGHT: Order Summary Card -->
        <div class="order-summary-card">
          <h3>Order Summary</h3>
          <div class="summary-line">
            <span>Subtotal (${totalItems} items)</span>
            <strong>INR ${subtotal}/-</strong>
          </div>
          <div class="summary-line">
            <span>Standard Delivery</span>
            <span>${shipping === 0 ? '<strong style="color:#2e7d32;">FREE</strong>' : 'INR ' + shipping + '/-'}</span>
          </div>
          <div class="summary-line total">
            <span>Total Payable</span>
            <strong>INR ${grandTotal}/-</strong>
          </div>
          <div style="margin-top:22px;">
            <a href="${checkoutUrl}" class="btn btn-solid-olive btn-block" style="padding:14px; font-weight:600; text-align:center; font-size:1.05rem; display:block; border-radius:6px; box-shadow:0 4px 12px rgba(77,88,43,0.25);">
              Proceed to Checkout &rarr;
            </a>
          </div>
          <div class="summary-badges">
            <div class="summary-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Directly empowers tribal women artisans in Vikramgad</span>
            </div>
            <div class="summary-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>100% Biodegradable &amp; Eco-Friendly Bamboo</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function initCartPage() {
    renderCartPage();
  }

  /* -------------------------------------------------------------
     8.3 Checkout Page Renderer & Controller
     ------------------------------------------------------------- */
  function initCheckoutPage() {
    const container = document.getElementById('checkoutPageContainer');
    if (!container) return;

    const cart = getCart();
    const isWP = !window.location.pathname.endsWith('.html');
    const catalogueUrl = isWP ? '/product-catalogue/' : 'product-catalogue.html';
    const cartUrl = isWP ? '/cart/' : 'cart.html';

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-panel">
          <div class="cart-empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </div>
          <h2>Your Cart is Currently Empty</h2>
          <p>You need to add products to your cart before proceeding to checkout.</p>
          <a href="${catalogueUrl}" class="btn btn-solid-olive" style="padding:14px 32px; font-weight:600;">
            Browse Handcrafted Catalogue &rarr;
          </a>
        </div>
      `;
      return;
    }

    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.qty, 10) || 1), 0);
    const subtotal = cart.reduce((sum, item) => sum + ((item.priceNum || 0) * (parseInt(item.qty, 10) || 1)), 0);
    const shipping = subtotal >= 1000 ? 0 : 60;
    const grandTotal = subtotal + shipping;

    const reviewItemsHTML = cart.map(item => `
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid #f0eee6;">
        <img src="${getProductImgUrl(item.img)}" alt="${escapeHtml(item.name)}" style="width:50px; height:50px; border-radius:6px; object-fit:cover; border:1px solid #e2ddce; background:#fff; flex-shrink:0;">
        <div style="flex:1; min-width:0;">
          <div style="font-size:0.92rem; font-weight:600; color:var(--ink); line-height:1.3; margin-bottom:4px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${escapeHtml(item.name)}</div>
          <div style="font-size:0.8rem; color:var(--ink-soft);">Qty: ${item.qty} &bull; ${item.price}</div>
        </div>
        <div style="font-weight:700; font-size:0.94rem; color:var(--olive-darker); flex-shrink:0;">INR ${(item.priceNum || 0) * item.qty}/-</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="checkout-layout">
        <!-- LEFT: Customer & Shipping Details Form -->
        <div class="checkout-form-panel">
          <form id="checkoutForm" novalidate>
            <!-- Step 1: Contact Information -->
            <div class="checkout-section-title">
              <span class="checkout-step-num">1</span>
              <span>Contact Information</span>
            </div>
            <div class="checkout-form-grid">
              <div class="checkout-form-group">
                <label for="custName">Full Name *</label>
                <input type="text" id="custName" name="custName" placeholder="e.g. Rahul Sharma" required autocomplete="name">
              </div>
              <div class="checkout-form-group">
                <label for="custPhone">Phone Number (WhatsApp) *</label>
                <input type="tel" id="custPhone" name="custPhone" placeholder="e.g. 9876543210" required autocomplete="tel">
              </div>
              <div class="checkout-form-group span-2">
                <label for="custEmail">Email Address (Optional)</label>
                <input type="email" id="custEmail" name="custEmail" placeholder="e.g. rahul@example.com" autocomplete="email">
              </div>
            </div>

            <!-- Step 2: Shipping Address -->
            <div class="checkout-section-title" style="margin-top:28px;">
              <span class="checkout-step-num">2</span>
              <span>Shipping &amp; Delivery Address</span>
            </div>
            <div class="checkout-form-grid">
              <div class="checkout-form-group span-2">
                <label for="custAddress">House / Flat No., Street, Landmark *</label>
                <input type="text" id="custAddress" name="custAddress" placeholder="e.g. Flat 402, Green Meadows, MG Road" required autocomplete="street-address">
              </div>
              <div class="checkout-form-group">
                <label for="custCity">City / Town *</label>
                <input type="text" id="custCity" name="custCity" placeholder="e.g. Mumbai" required autocomplete="address-level2">
              </div>
              <div class="checkout-form-group">
                <label for="custState">State *</label>
                <input type="text" id="custState" name="custState" value="Maharashtra" placeholder="e.g. Maharashtra" required autocomplete="address-level1">
              </div>
              <div class="checkout-form-group">
                <label for="custPincode">PIN Code *</label>
                <input type="text" id="custPincode" name="custPincode" placeholder="e.g. 400001" maxlength="6" required autocomplete="postal-code">
              </div>
              <div class="checkout-form-group">
                <label for="custNotes">Special Delivery Notes</label>
                <input type="text" id="custNotes" name="custNotes" placeholder="e.g. Leave with security / Ring bell">
              </div>
            </div>

            <!-- Step 3: Payment Options -->
            <div class="checkout-section-title" style="margin-top:28px;">
              <span class="checkout-step-num">3</span>
              <span>Select Payment Method</span>
            </div>
            <div class="payment-tiles-grid">
              <label class="payment-tile selected" id="tileUpi">
                <input type="radio" name="paymentMethod" value="UPI / QR & NetBanking" checked>
                <div class="payment-tile-body">
                  <strong>UPI / QR Code &amp; Instant Banking (Recommended)</strong>
                  <p>Pay instantly via Google Pay, PhonePe, Paytm, BHIM, or NetBanking to our official artisan account.</p>
                  <div class="payment-upi-details">
                    <div><strong>Official UPI ID:</strong> <code style="background:#eef2e6; padding:2px 6px; border-radius:4px; color:var(--olive-darker);">bamboofirst.ks@okaxis</code></div>
                    <div style="font-size:0.8rem; color:#666; margin-top:4px;">Account Name: Keshav Srushti - Project Green Gold</div>
                  </div>
                </div>
              </label>

              <label class="payment-tile" id="tileCod">
                <input type="radio" name="paymentMethod" value="Cash / Pay on Delivery">
                <div class="payment-tile-body">
                  <strong>Cash / Pay on Delivery (COD)</strong>
                  <p>Pay cash or scan the courier QR code when your handcrafted order arrives at your doorstep.</p>
                </div>
              </label>

              <label class="payment-tile" id="tileWa">
                <input type="radio" name="paymentMethod" value="Direct WhatsApp Order">
                <div class="payment-tile-body">
                  <strong>Confirm &amp; Coordinate on WhatsApp</strong>
                  <p>Place your order now and coordinate custom instructions, shipping schedule, and payment directly with our team on WhatsApp.</p>
                </div>
              </label>
            </div>

            <div style="margin-top:28px;">
              <button type="submit" class="btn btn-solid-olive btn-block" style="padding:15px; font-size:1.1rem; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 4px 14px rgba(77,88,43,0.3);">
                Confirm &amp; Place Order (INR ${grandTotal}/-) &rarr;
              </button>
            </div>
          </form>
        </div>

        <!-- RIGHT: Order Review Column -->
        <div class="order-summary-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="margin:0; border:none; padding:0;">Order Summary</h3>
            <a href="${cartUrl}" style="font-size:0.82rem; color:var(--olive); text-decoration:underline;">Edit Cart</a>
          </div>
          <div style="max-height:260px; overflow-y:auto; margin-bottom:16px; padding-right:4px;">
            ${reviewItemsHTML}
          </div>
          <div class="summary-line">
            <span>Items Subtotal (${totalItems})</span>
            <strong>INR ${subtotal}/-</strong>
          </div>
          <div class="summary-line">
            <span>Delivery Fee</span>
            <span>${shipping === 0 ? '<strong style="color:#2e7d32;">FREE</strong>' : 'INR ' + shipping + '/-'}</span>
          </div>
          <div class="summary-line total">
            <span>Grand Total</span>
            <strong>INR ${grandTotal}/-</strong>
          </div>

          <div class="summary-badges" style="margin-top:20px;">
            <div class="summary-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>100% Genuine Tribal Handicrafts &bull; Supported by NABARD</span>
            </div>
            <div class="summary-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>Order confirmation sent directly to your WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Radio tiles click interaction
    const tiles = container.querySelectorAll('.payment-tile');
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        tiles.forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        const radio = tile.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    // Form Submission Handler
    const form = document.getElementById('checkoutForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (document.getElementById('custName').value || '').trim();
        const phone = (document.getElementById('custPhone').value || '').trim();
        const email = (document.getElementById('custEmail').value || '').trim();
        const address = (document.getElementById('custAddress').value || '').trim();
        const city = (document.getElementById('custCity').value || '').trim();
        const state = (document.getElementById('custState').value || '').trim();
        const pincode = (document.getElementById('custPincode').value || '').trim();
        const notes = (document.getElementById('custNotes').value || '').trim();
        const paymentRadio = form.querySelector('input[name="paymentMethod"]:checked');
        const paymentMethod = paymentRadio ? paymentRadio.value : 'UPI / NetBanking';

        if (!name) {
          showToast('Please enter your full name.');
          document.getElementById('custName').focus();
          return;
        }

        const phoneDigits = phone.replace(/[^\d]/g, '');
        if (phoneDigits.length < 10) {
          showToast('Please enter a valid 10-digit mobile number.');
          document.getElementById('custPhone').focus();
          return;
        }

        if (!address) {
          showToast('Please provide your complete shipping address.');
          document.getElementById('custAddress').focus();
          return;
        }

        if (!city) {
          showToast('Please provide your city/town.');
          document.getElementById('custCity').focus();
          return;
        }

        const pinDigits = pincode.replace(/[^\d]/g, '');
        if (pinDigits.length !== 6) {
          showToast('Please enter a valid 6-digit PIN code.');
          document.getElementById('custPincode').focus();
          return;
        }

        // Generate Order ID
        const orderId = 'BF-' + Date.now().toString().slice(-6) + '-' + Math.floor(100 + Math.random() * 900);

        const orderData = {
          orderId: orderId,
          date: new Date().toLocaleString(),
          customer: { name, phone, email, address, city, state, pincode, notes },
          items: cart,
          subtotal: subtotal,
          shipping: shipping,
          grandTotal: grandTotal,
          paymentMethod: paymentMethod
        };

        try {
          localStorage.setItem('bamboo_last_completed_order', JSON.stringify(orderData));
        } catch (err) {
          console.error(err);
        }

        // Clear cart
        saveCart([]);

        // Pre-fill WhatsApp confirmation message
        let waItemsList = cart.map(i => `  • ${i.name} (x${i.qty}) - INR ${(i.priceNum || 0) * i.qty}/-`).join('\n');
        let waMessage = `Hello Bamboo First! 🎉\n\nI have just placed an order on the website:\n\n*Order ID:* #${orderId}\n*Customer:* ${name}\n*Phone:* ${phone}\n*Delivery Address:* ${address}, ${city}, ${state} - ${pincode}\n\n*Items Ordered:*\n${waItemsList}\n\n*Total Amount:* INR ${grandTotal}/- (Shipping: ${shipping === 0 ? 'FREE' : 'INR ' + shipping + '/-'})\n*Payment Method:* ${paymentMethod}\n\nPlease confirm order receipt and tracking updates. Thank you!`;

        const waUrl = `https://wa.me/919152848332?text=${encodeURIComponent(waMessage)}`;

        // Render Success View
        container.innerHTML = `
          <div class="order-success-panel">
            <div class="order-success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style="font-size:2rem; color:var(--olive-darker); margin:0 0 8px;">Order Placed Successfully!</h2>
            <p style="color:var(--ink-soft); font-size:1.05rem; margin:0 0 16px;">
              Thank you, <strong>${escapeHtml(name)}</strong>! Your order has been placed with the tribal artisan cooperative.
            </p>
            <div class="order-id-badge">Order ID: #${orderId}</div>

            <div class="order-details-summary-box">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Delivery Address:</span>
                <strong style="text-align:right;">${escapeHtml(address)}, ${escapeHtml(city)} - ${escapeHtml(pincode)}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Payment Mode:</span>
                <strong>${escapeHtml(paymentMethod)}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; border-top:1px dashed #d5cfbd; padding-top:8px; margin-top:8px;">
                <span>Total Amount:</span>
                <strong style="font-size:1.1rem; color:var(--olive-darker);">INR ${grandTotal}/-</strong>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:12px; max-width:440px; margin:0 auto;">
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-solid-olive" style="padding:14px 24px; font-size:1rem; font-weight:600; display:flex; align-items:center; justify-content:center; gap:10px; background:#25D366; border-color:#25D366; color:#fff; box-shadow:0 4px 14px rgba(37,211,102,0.35);">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/>
                </svg>
                <span>Send Order Confirmation on WhatsApp &rarr;</span>
              </a>
              <a href="${catalogueUrl}" class="btn btn-outline-olive" style="padding:12px; font-weight:600;">Continue Shopping</a>
            </div>
          </div>
        `;

        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    }
  }

  // Master Initializer
  function initializeAll() {
    initStickyHeader();
    initDropdownInteraction();
    initMobileNav();
    initLiveSearch();
    initHeroCarousel();
    initCatalogueFilters();
    initQuickViewModal();
    initProductDetailPage();
    initForms();
    initFloatingWhatsApp();
    initCartSystem();
    initCartPage();
    initCheckoutPage();
  }

  // Bind to DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }

  // Expose Globally on window
  window.PRODUCTS = PRODUCTS;
  window.BLOGS = BLOGS;
  window.switchMainImage = switchMainImage;
  window.initProductDetailPage = initProductDetailPage;
  window.showToast = showToast;
  window.getProductUrl = getProductUrl;
  window.getProductImgUrl = getProductImgUrl;
  window.addToCart = addToCart;
  window.updateCartItemQty = updateCartItemQty;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
  window.getCart = getCart;
  window.renderCartPage = renderCartPage;

})();
