/* =====================================================================
   PROJECT DATA  -  single source of truth for the whole site.
   Edit this file to add / change projects. No build step needed.

   Each project supports:
     slug          unique id (used in the URL: project.html?p=SLUG)
     title         project name
     tagline       one short sentence shown under the title
     year          number
     role          your role on the project
     disciplines   array, used for the filter chips. Stick to this list:
                   Product Design | Embedded | UX & Research |
                   Sustainability | CAD & Prototyping
     tools         array of tools / methods (shown as chips)
     featured      true => shown on the home page
     order         higher number = appears earlier
     cover         grid image
     overlayTitle  short label shown on card hover
     brief         what the project is / the problem
     contribution  array of bullet points: what YOU did
     outcome       one line on the result
     images        array of image paths (gallery)
     videos        array of video paths
     pdf           optional embedded PDF (used instead of images)
     collaborators array of { name, url }
   ===================================================================== */

window.PROJECTS = [

  {
    // ---- REQUIRED: identity ----
    slug: "pdet2folio",          // unique id, no spaces. Becomes project.html?p=my-project
    title: "Knee Brace for Beginners in the Gym",         // shown as the card title and page heading
    tagline: "Ever thought about starting in the gym, but you're worried about injury? Sticking out? Bad form? Look no further!", // shown under the title
    year: 2026,                  // a number
    role: "Mechanism design, product assembly & user research.",// your role on it

    // ---- REQUIRED: classification ----
    disciplines: ["Product Design", "CAD & Prototyping", "UX & Research"],
    // ^ drives the filter chips on the Work page. Reuse existing names to group with
    //   others, or invent a new one (e.g. "Robotics") and a new chip appears automatically.
    //   Current set: Product Design, Embedded, UX & Research, Sustainability,
    //   CAD & Prototyping, Software.

    tools: ["Fusion 360", "UX", "Electronics"],   // shown as chips on the case study

    // ---- REQUIRED: placement ----
    featured: true,   // true = also shows on the home page. false = Work page only.
    order: 95,        // higher number = appears earlier. Use gaps of 5 so you can slot between.

    // ---- REQUIRED: cover ----
    cover: "assets/images/pdet2foliocover.png",  // the grid thumbnail. Best at 16:10.

    // ---- REQUIRED: the case study copy ----
    brief: "We looked into the sports industry as a whole, and found at that beginners in the gym are quite an underserved user group. Generic and specialist equipment exists, but they don't help get your foot through the door. After extensive reseach and interviews, we landed upon creating a knee brace that helps you correct your form, and keep to a tempo during squats.",
    contribution: [
      "Adapted a one-handed tightening mechanism to a knee brace, and designed the assembly to be manufacturable.",
      "Extensive research into works for beginners and how to best support them.",
      "Portfolio of our research and design process, including interviews, sketches, and CAD models."
    ],
    outcome: "A knee brcae that helps beginners in the gym, and could be applied to other exercises, whether in the gym, at home, or whilst away on holiday.",

    // ---- MEDIA: pick what applies, leave the rest as empty arrays ----
    images: [
      "assets/images/page 1.png",
      "assets/images/page 2.png",
      "assets/images/page 3.png",
      "assets/images/page 4.png",
      "assets/images/page 5.png",
      "assets/images/page 6.png",
      "assets/images/page 7.png",
      "assets/images/page 8.png",
      "assets/images/page 9.png",
      "assets/images/page 10.png",
      "assets/images/page 11.png",
      "assets/images/page 12.png",
      "assets/images/page 13.png",
      "assets/images/page 14.png",
      "assets/images/page 15.png",
    ],
    videos: [],   // e.g. ["assets/videos/my-project_demo.mp4"]

    pdf: ["assets/docs/PDE (1).pdf"],

    // ---- OPTIONAL: only include the lines you need ----
    // pdf: "assets/docs/my-project.pdf",          // embeds a report instead of an image gallery
    // liveUrl: "azul/index.html",                  // adds an "Open full screen" button
    // embed: "azul/index.html",                    // embeds a live, playable web app

    collaborators: [
      { name: "Zayn Muntazir", url: "https://www.linkedin.com/in/zayn-muntazir-44721b281/" },
      //{ name: "Ikem Enebeli", url: "https://www.linkedin.com/in/ikem-e/" },
      //{ name: "Aidan Ryder", url: "https://www.linkedin.com/in/aidan-ryder-b848aa266/" },
      //{ name: "Amarie Fasoro", url: "https://www.linkedin.com/in/amarie-fasoro-8104a42bb/" }
    ]   // e.g. [{ name: "Jane Doe", url: "https://www.linkedin.com/in/janedoe" }]
  },

  {
    slug: "azul",
    title: "Azul",
    tagline: "A complete, playable build of the board game Azul, but Minecraft themed",
    year: 2025,
    role: "Software / Front-end",
    disciplines: ["Software"],
    tools: ["JavaScript", "ES Modules", "Ramda", "Mocha tests", "Accessibility"],
    featured: true,
    order: 88,
    cover: "assets/images/azul_cover.png",
    overlayTitle: "Web App",
    brief: "A fully playable build of Azul, a tile-based boardgame, for 2 to 4 players. Coded in Javascript, designed as a web app.",
    contribution: [
      "Implemented the complete Azul ruleset as a pure functional module (Azul.js), independent of the interface and covered by unit tests.",
      "Built the browser UI in vanilla JavaScript with ES modules: factory drafting, pattern lines, wall tiling, scoring and end-of-game bonuses.",
      "Made it accessible: full keyboard play, and a high-contrast mode for colour-blind players.",
      "Instructions included, and is playable locally (on the same device)."
    ],
    outcome: "A polished, fully playable game. Have a go at it.",
    liveUrl: "azul/index.html",
    embed: "azul/index.html",
    images: [],
    videos: [],
    collaborators: []
  },

  {
    slug: "electronics",
    title: "Electronics & Embedded Systems",
    tagline: "ESP32 builds: a memory game and a Martian-style hex message relay.",
    year: 2025,
    role: "Embedded / Firmware / Prototyping",
    disciplines: ["Embedded", "CAD & Prototyping"],
    tools: ["ESP32", "C++", "Arduino"],
    featured: true,
    order: 74,
    cover: "assets/images/electronics_cover.png",
    overlayTitle: "Embedded Systems",
    brief: "A set of ESP32 builds exploring physical, embedded interaction. The headline pieces are a Chimp Memory sequence game and a message relay that points out letters in hexadecimal, inspired by the way Mark Watney signals in The Martian.",
    contribution: [
      "Built a memory sequence game with flashing LEDs and a companion app for entering the recalled sequence.",
      "Designed a relay device that encodes a message to hexadecimal and physically indicates each character in turn.",
      "Handled the firmware, wiring and enclosure prototyping end to end."
    ],
    outcome: "Two working hardware demos. Clips below.",
    images: ["assets/images/electronics_01.jpg"],
    videos: ["assets/videos/electronics_01.mp4", "assets/videos/electronics_04.mp4"],
    collaborators: []
  },
  {
    slug: "hydromorph",
    title: "HydroMorph",
    tagline: "A morphing dive fin concept built to cut annual footwear production and waste, whilst being more convenient for the user.",
    year: 2024,
    role: "Design & Engineering",
    disciplines: ["Product Design", "Sustainability", "CAD & Prototyping"],
    tools: ["Rendering", "Design for manufacture"],
    featured: true,
    order: 69,
    cover: "assets/images/hydromorph_01.png",
    overlayTitle: "Transforming Footwear",
    brief: "HydroMorph aims to combine several footwear products, improving convenience while cutting the volume of footwear produced each year and the waste that follows it.",
    contribution: [
      "Developed the morphing-fin concept and form through lo-fi prototyping.",
      "Produced the rendered concept set and the design-engineering rationale covering materials, manufacture and end-of-life."
    ],
    outcome: "A resolved concept and a full visual design study. Gallery below.",
    images: [
      "assets/images/hydromorph_01.png","assets/images/hydromorph_02.png","assets/images/hydromorph_03.png",
      "assets/images/hydromorph_04.png","assets/images/hydromorph_05.png","assets/images/hydromorph_06.png",
      "assets/images/hydromorph_07.png","assets/images/hydromorph_08.png","assets/images/hydromorph_09.png",
      "assets/images/hydromorph_10.png","assets/images/hydromorph_11.png","assets/images/hydromorph_12.png",
      "assets/images/hydromorph_13.png","assets/images/hydromorph_14.png","assets/images/hydromorph_15.png",
      "assets/images/hydromorph_16.png","assets/images/hydromorph_17.png","assets/images/hydromorph_18.png",
      "assets/images/hydromorph_19.png","assets/images/hydromorph_20.png","assets/images/hydromorph_21.png",
      "assets/images/hydromorph_22.png","assets/images/hydromorph_23.png","assets/images/hydromorph_24.png",
      "assets/images/hydromorph_25.png","assets/images/hydromorph_26.png","assets/images/hydromorph_27.png",
      "assets/images/hydromorph_28.png","assets/images/hydromorph_29.png","assets/images/hydromorph_30.png",
      "assets/images/hydromorph_31.png","assets/images/hydromorph_32.png","assets/images/hydromorph_33.png"
    ],
    videos: [],
    collaborators: []
  },
  {
    slug: "rhythmrush",
    title: "RhythmRush",
    tagline: "Human-centred design that makes rhythm games physical and social.",
    year: 2025,
    role: "Design & Engineering",
    disciplines: ["UX & Research", "Product Design"],
    tools: ["User research", "Concept design", "Prototyping"],
    featured: true,
    order: 75,
    cover: "assets/images/rhythmrush_coverpage.png",
    overlayTitle: "Human-Centred Design",
    brief: "A human-centred design project reimagining concert queues as a lively atmosphere. Play games with strangers and have fun! Delivered as a discovery and delivery report with Team NEXUS.",
    contribution: [
      "Ran discovery research and helped synthesise the findings into a delivery report.",
      "Contributed to concept direction and the final documentation."
    ],
    outcome: "Full discovery and delivery report, embedded below.",
    pdf: "assets/docs/rhythmrush.pdf",
    images: [],
    videos: [],
    collaborators: [
      { name: "Ruaridh Murdoch", url: "https://www.linkedin.com/in/ruaridh-murdoch-399ba4260/" },
      { name: "Ikem Enebeli", url: "https://www.linkedin.com/in/ikem-e/" },
      { name: "Aidan Ryder", url: "https://www.linkedin.com/in/aidan-ryder-b848aa266/" },
      { name: "Amarie Fasoro", url: "https://www.linkedin.com/in/amarie-fasoro-8104a42bb/" }
    ]
  },
  {
    slug: "sustainable-design-engineering",
    title: "Sustainable Aircraft Seating",
    tagline: "Redesigning economy long-haul seats and the systems within which they are in.",
    year: 2025,
    role: "Research & Design",
    disciplines: ["Sustainability", "UX & Research"],
    tools: ["Lifecycle analysis", "CAD", "Research"],
    featured: true,
    order: 80,
    cover: "assets/images/Untitlett3d (1)_Page_01.png",
    overlayTitle: "Sustainable Design",
    brief: "A group study of the long-haul aircraft industry. We set out to find the real pain points in the economy cabin experience and the sustainability gaps around it, then redesign the seats and the processes that shape their lifecycle.",
    contribution: [
      "Researched market demand, existing products and lifecycle impact.",
      "Explored a focused redesign within my area, then integrated it with the team's overall system view."
    ],
    outcome: "A 25-page research and design report. Gallery below.",
    images: [
      "assets/images/Untitlett3d (1)_Page_01.png","assets/images/Untitlett3d (1)_Page_02.png","assets/images/Untitlett3d (1)_Page_03.png",
      "assets/images/Untitlett3d (1)_Page_04.png","assets/images/Untitlett3d (1)_Page_05.png","assets/images/Untitlett3d (1)_Page_06.png",
      "assets/images/Untitlett3d (1)_Page_07.png","assets/images/Untitlett3d (1)_Page_08.png","assets/images/Untitlett3d (1)_Page_09.png",
      "assets/images/Untitlett3d (1)_Page_10.png","assets/images/Untitlett3d (1)_Page_11.png","assets/images/Untitlett3d (1)_Page_12.png",
      "assets/images/Untitlett3d (1)_Page_13.png","assets/images/Untitlett3d (1)_Page_14.png","assets/images/Untitlett3d (1)_Page_15.png",
      "assets/images/Untitlett3d (1)_Page_16.png","assets/images/Untitlett3d (1)_Page_17.png","assets/images/Untitlett3d (1)_Page_18.png",
      "assets/images/Untitlett3d (1)_Page_19.png","assets/images/Untitlett3d (1)_Page_20.png","assets/images/Untitlett3d (1)_Page_21.png",
      "assets/images/Untitlett3d (1)_Page_22.png","assets/images/Untitlett3d (1)_Page_23.png","assets/images/Untitlett3d (1)_Page_24.png",
      "assets/images/Untitlett3d (1)_Page_25.png"
    ],
    videos: [],
    collaborators: [
      { name: "Leia Whitaker", url: "https://www.linkedin.com/in/leia-whitaker/" },
      { name: "Curtis Light", url: "https://www.linkedin.com/in/curtis-light/" },
      { name: "Karanjeet Singh", url: "https://www.linkedin.com/in/karanjeet-singh-6aa728364/" }
    ]
  },
  {
    slug: "drinks-dispenser",
    title: "Drinks Dispenser",
    tagline: "A countertop coffee dispenser for MEDD Cafe, Jeddah: fast, hygienic, repairable.",
    year: 2024,
    role: "Design & Engineering",
    disciplines: ["Product Design", "CAD & Prototyping"],
    tools: ["Fusion 360", "3D printing", "Design for manufacture"],
    featured: true,
    order: 70,
    cover: "assets/images/drinks-dispenser_01.jpg",
    overlayTitle: "Design & Technology",
    brief: "A countertop drinks dispenser for MEDD Café in Jeddah. The client needed something to serve customers soft drinks, so that baristas could focus on crfating their specialty coffee, at the press of a button, while keeping the unit simple to clean and repair.",
    contribution: [
      "Took the brief through research, concept and prototyped.",
      "Designed for quick cleaning, simple repair and a form that fits behind a café counter. Minimalist branding."
    ],
    outcome: "A resolved concept and working prototype. Gallery below.",
    images: ["assets/images/drinks-dispenser_01.jpg"],
    videos: [],
    collaborators: []
  },
  {
    slug: "pocket-shaver",
    title: "Pocket Shaver Redesign",
    tagline: "Reverse-engineering a Braun shaver for lighter weight and elevated performance.",
    year: 2025,
    role: "Design & Engineering",
    disciplines: ["Product Design", "CAD & Prototyping", "Material Analysis"],
    tools: ["Fusion 360", "Reverse engineering", "Material Selection"],
    featured: false,
    order: 65,
    cover: "assets/images/pocket-shaver_01.jpg",
    overlayTitle: "Reverse Engineering",
    brief: "A reverse-engineering and redesign of a Braun pocket shaver, re-themed around a chosen character and rebuilt for lighter weight, better repairability and lower end-of-life impact.",
    contribution: [
      "Theoretically designed a better shaver, with materials and processes detailed."
    ],
    outcome: "A redesigned shaver with reduced mass and improved repairability.",
    images: ["assets/images/pocket-shaver_01.jpg"],
    videos: [],
    collaborators: []
  },
  {
    slug: "ipad-stand",
    title: "iPad Stand",
    tagline: "A CAD-designed, adjustable 3D-printed stand with a curved no-slip front lip.",
    year: 2025,
    role: "Design & Engineering",
    disciplines: ["CAD & Prototyping", "Product Design"],
    tools: ["Fusion 360", "FDM 3D printing"],
    featured: false,
    order: 67,
    cover: "assets/images/ipad-stand_01.jpg",
    overlayTitle: "CAD",
    brief: "A CAD-designed, adjustable 3D-printed iPad stand with a curved front lip, so the device sits securely at a range of angles and your finger never fouls the screen when you swipe up from the bottom.",
    contribution: [
      "Modelled the stand in Fusion 360 with several viewing angles and a no-slip front edge.",
      "Printed and tested for stability and angle adjustment."
    ],
    outcome: "A printable, adjustable stand. Renders and prints below.",
    images: ["assets/images/ipad-stand_01.jpg"],
    videos: [],
    collaborators: []
  },
  {
    slug: "firstgendocs",
    title: "First Gen Doctors, Website Redesign",
    tagline: "A cleaner, crisper site with scroll-reactive detail. Desktop now, mobile in progress.",
    year: 2025,
    role: "Design & Front-end",
    disciplines: ["UX & Research"],
    tools: ["Web", "UX", "Visual design"],
    featured: false,
    order: 55,
    cover: "assets/images/firstgendocs_01.jpg",
    overlayTitle: "Website Design",
    brief: "A redesign of the First Gen Doctors website: sleeker, crisper and more consistent, with colour and depth that react subtly as you scroll. Built desktop-first, with a mobile version in progress.",
    contribution: [
      "Redesigned the visual system and key pages.",
      "Added considered interaction detail, including gradient and shadow shifts on scroll."
    ],
    outcome: "A refreshed direction for the site. Preview below.",
    images: ["assets/images/firstgendocs_01.jpg"],
    videos: [],
    collaborators: []
  },
  {
    slug: "in-progress",
    title: "In Progress",
    tagline: "Current explorations: a wearable biosensor and an airline seat-selection tool.",
    year: 2025,
    role: "Research & Development",
    disciplines: ["Product Design"],
    tools: ["R&D"],
    featured: false,
    order: 10,
    cover: "assets/images/in-progress_01.jpg",
    overlayTitle: "Work in Progress",
    brief: "Live explorations I am still building.",
    contribution: [
      "A wearable biosensor aimed at early disease detection.",
      "An airline seat-selection tool that helps travellers get value for money."
    ],
    outcome: "More to come.",
    images: ["assets/images/in-progress_01.jpg"],
    videos: [],
    collaborators: []
  }
];
