import type { Dict } from "./zh";

const en: Dict = {
  htmlLang: "en",
  ogLocale: "en_US",

  brand: {
    name: "Gu Zao Wei",
    short: "古早味",
    tagline: "The Aroma of Pork · Offal Cuisine",
    descriptor: "Taipei · Pork Offal Rice Noodle Soup · Braised Pork Rice",
  },

  meta: {
    keywords: [
      "Taipei offal soup",
      "pork offal rice noodle soup",
      "Taiwanese braised pork rice",
      "lu rou fan Taipei",
      "Da'an District food",
      "Taiwan offal restaurant",
      "hei bai qie",
      "豚之香豬雜米粉湯",
      "Taiwanese street food franchise",
      "food franchise Taiwan",
    ],
    pages: {
      home: {
        title: "Gu Zao Wei 古早味 (豚之香) | Pork Offal Rice Noodle Soup, Taipei",
        description:
          "Gu Zao Wei serves old-school Taiwanese pork offal rice noodle soup, champion braised pork rice and hei-bai-qie in Taipei’s Da’an District. Braised fresh daily. Now taking franchise inquiries.",
      },
      story: {
        title: "Our Story | Gu Zao Wei 古早味",
        description:
          "Grandma’s smokehouse, Mom’s spicy cabbage, a pot of braised pork on the stove all day. How Gu Zao Wei carried the best flavors of home to an alley in Taipei.",
      },
      menu: {
        title: "Menu | Gu Zao Wei 古早味 Taipei",
        description:
          "Pork offal rice noodle soup NT$140, champion braised pork rice NT$70, hei-bai-qie from NT$80. Full menu, prices and a first-timer’s ordering guide. Open Mon–Fri in Da’an, Taipei.",
      },
      stores: {
        title: "Visit | Gu Zao Wei 古早味 Da’an, Taipei",
        description:
          "No. 16, Aly. 40, Ln. 216, Sec. 4, Zhongxiao E. Rd., Da’an Dist., Taipei. Mon–Fri 11:30–14:00 & 17:00–20:00. Call +886-2-2778-0039. Uber Eats at in-store prices.",
      },
      faq: {
        title: "FAQ | Gu Zao Wei 古早味 — Taipei Pork Offal Soup Guide",
        description:
          "Address, opening hours, prices, how to order for the first time, cards or cash, delivery, dogs, and what “offal” means — answers about Gu Zao Wei’s pork offal rice noodle soup in Taipei.",
      },
      franchise: {
        title: "Franchise | Gu Zao Wei 古早味 Founding Partners",
        description:
          "Bring a bowl of Gu Zao Wei to your city. We are opening reservations for our first founding franchise partners — multiple store formats, full HQ support, domestic and international.",
      },
    },
  },

  nav: {
    story: "Our Story",
    menu: "Menu",
    stores: "Visit",
    franchise: "Franchise",
    franchiseCta: "Franchise Inquiry",
    faq: "FAQ",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    skip: "Skip to content",
    home: "Home",
  },

  status: {
    open: "Open now",
    openUntil: "until {time}",
    closed: "Closed",
    today: "today",
    nextOpen: "Opens {day} {time}",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },

  dock: { call: "Call to order", map: "Directions", menu: "Menu" },

  common: {
    viewMenu: "See the full menu",
    readStory: "Read our story",
    visit: "Visit us",
    call: "Call",
    directions: "Get directions",
    learnMore: "Learn more",
    back: "Back",
    nt: "NT$",
    from: "from",
    soup: "Soup",
    dry: "Dry",
    soupOrDry: "Soup / Dry",
  },

  home: {
    hero: {
      eyebrow: "Da’an, Taipei · Offal Cuisine",
      line1: "Great flavor",
      line2: "is never simple.",
      sub: "Gu Zao Wei pork offal rice noodle soup. Liver, heart, tongue and intestine — crisp, tender, springy, silky — all gathered in a single bowl.",
      ctaMenu: "See the menu",
      ctaFranchise: "Franchise inquiry",
      facts: ["Real ingredients", "Braised fresh daily", "Old-school flavor", "Bigger bowls, same price"],
      scroll: "Scroll",
    },
    marquee: [
      { main: "PORK OFFAL", sub: "豬雜" },
      { main: "RICE NOODLE SOUP", sub: "米粉湯" },
      { main: "BRAISED PORK RICE", sub: "滷肉飯" },
      { main: "HEI-BAI-QIE", sub: "黑白切" },
      { main: "OLD-SCHOOL TASTE", sub: "古早味" },
      { main: "MORE FOR THE SAME", sub: "加量不加價" },
    ],
    names: {
      eyebrow: "One word, four languages",
      title: "Different names.\nThe same respect.",
      lines: [
        { region: "Taiwan", word: "豬雜" },
        { region: "Japan", word: "ホルモン" },
        { region: "Korea", word: "돼지 내장" },
        { region: "World", word: "Pork Offal" },
      ],
      body: "A pig deserves to be honored from nose to tail. We simmer that respect into a bowl of hot soup — we call it the aroma of pork, 豚之香.",
      caption: "豬雜 · ホルモン · 돼지 내장 · Pork Offal",
    },
    signature: {
      eyebrow: "Three signatures",
      title: "Three bowls to understand Gu Zao Wei.",
      intro: "No research needed. For your first visit, start here.",
      cta: "See the full menu",
      items: [
        {
          name: "Pork Offal Rice Noodle Soup",
          en: "豬雜米粉湯",
          price: "NT$140",
          tag: "Signature",
          desc: "The crunch, tenderness, spring and silk of offal, drawn together by a warm, gentle broth. Rice noodles soak up every drop of flavor.",
        },
        {
          name: "Champion Braised Pork Rice",
          en: "冠軍滷肉飯",
          price: "NT$70",
          tag: "Braised daily",
          desc: "Rich, fragrant, never greasy. Spooned over steaming rice, it is the humblest — and most unforgettable — comfort in Taiwan.",
        },
        {
          name: "Hei-Bai-Qie, Assorted Cuts",
          en: "黑白切",
          price: "from NT$80",
          tag: "Soup / Dry",
          desc: "Heart, tongue, crunchy and soft intestine, gan-lian… pick the cuts you like, and have them in soup or served dry.",
        },
      ],
    },
    trust: {
      eyebrow: "Fresh to the table",
      title: "From slaughterhouse to\nyour table within 24 hours.",
      body: "The offal in our signature soup comes from a local Taiwanese slaughterhouse and reaches your table within 24 hours of slaughter.",
      source: "From the shop’s own Google Business profile",
      ratingLabel: "Google rating",
      reviews: "{n} reviews",
      viewReviews: "Read reviews on Google",
    },
    promise: {
      eyebrow: "Our promise",
      title: "More for the same price",
      label: "Dine-in only",
      body: "Dining in, just ask for more broth, rice noodles, rice or braised-pork sauce — no extra charge. In Taipei today, few small shops still do this. A full belly is the least a neighborhood shop owes you.",
      items: ["Broth", "Rice noodles", "Rice", "Braised-pork sauce"],
    },
    storyTeaser: {
      eyebrow: "Our story",
      title: "From Grandma’s stove\nto a Taipei alley.",
      body: "Grandma’s smokehouse, Mom’s spicy cabbage, a pot of pork braising all day. We carried the best flavors of home to a small alley in Da’an.",
      cta: "Read our story",
    },
    franchise: {
      eyebrow: "Franchise partners wanted",
      title: "Bring a bowl of\nGu Zao Wei to your city.",
      body: "Starting from a Taipei alley, we are looking for our first founding partners to turn pork offal rice noodle soup into a brand that travels across Taiwan and the world.",
      points: [
        "A highly recognizable brand identity",
        "A focused menu that is easy to run",
        "Dine-in, take-away and delivery",
      ],
      cta: "Explore franchising",
      cta2: "Book a briefing",
    },
    visit: {
      eyebrow: "Visit",
      title: "In a Da’an alley, waiting for you.",
      body: "Monday to Friday, lunch and dinner each bring a window when the broth is at its best. Can’t make it? Order on Uber Eats at in-store prices.",
    },
  },

  story: {
    hero: {
      eyebrow: "Our story",
      title: "“Za” is a pig,\nwhole and complete.",
      sub: "This is the story of Gu Zao Wei: a family, a pot of soup, and one word we set out to redefine.",
    },
    chapters: [
      {
        no: "I",
        title: "It began at Grandma’s stove",
        body: [
          "In our home, there was no such thing as “leftover parts.”",
          "Grandma’s smoked pork head meat, Mom’s spicy cabbage, a pot of pork braising from morning till night. In those days a single pig fed the family for many meals, and every part had its own way of being treated well — because every piece was both generosity and hard work.",
          "Later, we carried those flavors out of the house and opened a small shop in an alley in Da’an, Taipei.",
        ],
      },
      {
        no: "II",
        title: "“Za” isn’t mess — it’s wholeness",
        body: [
          "The Chinese word za (雜) is often mistaken for “odds and ends,” as if it were worth little. We see it differently.",
          "The creaminess of liver, the density of heart, the spring of tongue, the crunch and silk of intestine — one bowl holds many textures and many layers of aroma. That isn’t clutter. That is a pig, whole and complete.",
        ],
        chips: ["Crisp", "Tender", "Springy", "Silky"],
      },
      {
        no: "III",
        title: "The aroma of pork, offal cuisine",
        body: [
          "The Japanese call it ホルモン, the Koreans 돼지 내장, we call it 豬雜. Different words, one idea: complete respect for the whole pig.",
          "We named that respect “the aroma of pork” (豚之香) and gave it a face — the pig chef in a pink robe, spatula in hand, grinning over a steaming bowl. He is our shop manager and our reason for being: to make mealtime a happy thing.",
        ],
      },
      {
        no: "IV",
        title: "The rules of old-school flavor",
        body: [
          "Old-school isn’t nostalgia packaging; it’s a way of working. We keep just four rules:",
        ],
      },
      {
        no: "V",
        title: "From Da’an, outward",
        body: [
          "One day, we hope that wherever you are — Taipei, Kaohsiung, Tokyo or New York — you’ll turn a corner and find a steaming bowl of pork offal rice noodle soup.",
          "It is a long road, and we don’t want to walk it alone.",
        ],
        cta: "Join us in bringing Gu Zao Wei to your city",
      },
    ],
    values: {
      title: "Four rules",
      items: [
        { title: "Real ingredients", desc: "Generous portions, honest broth. No fancy names to hide behind — you can taste it in one spoonful." },
        { title: "Braised fresh daily", desc: "The pork and sauce for our braised pork rice are braised fresh each day, so every bowl smells new." },
        { title: "Old-school flavor", desc: "Grandma’s smokehouse, Mom’s spicy cabbage — the flavors of a home stove, remembered." },
        { title: "More for the same price", desc: "Dining in, extra broth, noodles, rice and braised-pork sauce cost nothing more. Eat well; get on with the day." },
      ],
    },
    mascot: {
      title: "Meet our shop manager",
      body: "A pig chef in a pink robe, spatula in one hand, a steaming bowl of braised pork rice in the other. When you see him, you know Gu Zao Wei is here.",
    },
  },

  menu: {
    hero: {
      eyebrow: "MENU",
      title: "Menu",
      sub: "Pork offal rice noodle soup, champion braised pork rice and hei-bai-qie — all made to order, in soup or dry, your call.",
    },
    how: {
      eyebrow: "First time?",
      title: "Order well in three steps.",
      steps: [
        {
          t: "Pick your star",
          d: "Want soup? Order the pork offal rice noodle soup. Want rice? The champion braised pork rice. Want both? A set meal is the best deal.",
        },
        {
          t: "Add hei-bai-qie",
          d: "Heart, tongue, crunchy intestine, soft intestine, gan-lian… every cut can be served in soup or dry. Choose the ones you’re curious about.",
        },
        {
          t: "Finish with sides",
          d: "Grandma’s smoked pork head meat, Mom’s spicy cabbage, a braised egg, and one of our three thirst-quenchers. Just right.",
        },
      ],
    },
    badges: { signature: "Signature", limited: "Limited", takeout: "Take-away only" },
    promise: {
      title: "More for the same price, dining in",
      body: "Ask for more broth, rice noodles, rice or braised-pork sauce when you dine in — no extra charge.",
    },
    alcohol: "Don’t drink and drive. Alcohol is not for persons under 18.",
    photoNote: "Photos are for illustration; actual dishes may vary.",
    priceNote: "All prices in New Taiwan dollars. Items and prices are subject to in-store notices.",
    posterCta: "View the printed menu",
    posterTitle: "Printed menu",
    order: {
      title: "Order by phone",
      body: "For take-away and group orders, please call ahead. You can also search “古早味豬雜米粉湯” on Uber Eats — delivery prices match the shop’s.",
      cta: "Call to order",
    },
  },

  stores: {
    hero: {
      eyebrow: "STORES",
      title: "Visit us",
      sub: "For now, we’re in Da’an, Taipei. More locations are on the way.",
    },
    flagship: {
      name: "Taipei Da’an Store",
      tag: "First store",
    },
    labels: {
      address: "Address",
      hours: "Hours",
      phone: "Order line",
      delivery: "Delivery",
    },
    hoursRows: [{ day: "Monday – Friday", times: ["11:30 – 14:00", "17:00 – 20:00"] }],
    hoursNote: "Hours may change; please refer to in-store notices.",
    delivery: {
      title: "Uber Eats, at in-store prices",
      body: "No time to drop by, ordering for the office, or can’t get a table at lunch? Search “古早味豬雜米粉湯” on Uber Eats and the hot soup comes to you.",
    },
    map: "Map",
    info: {
      title: "Good to know before you come",
      cash: "Cash only",
      cashDesc: "The shop currently accepts cash only — please come prepared.",
      dogs: "Dogs welcome",
      dogsDesc: "Feel free to bring your dog along.",
      dine: "Dine-in · Take-away · Delivery",
      dineDesc: "Eat in, take away, or order on Uber Eats.",
    },
    google: {
      title: "Google Business info",
      ratingLabel: "Google rating",
      reviews: "{n} reviews",
      openMaps: "Open in Google Maps",
      viewReviews: "See reviews & photos on Google",
      listedAs: "Listed on Google and Uber Eats as",
    },
    gallery: { title: "Inside the shop", front: "Storefront", inside: "Dining room" },
    soon: {
      title: "More locations are on the way.",
      body: "We’re looking for our first founding partners to bring Gu Zao Wei to more cities.",
      cta: "Explore franchising",
    },
  },

  franchise: {
    hero: {
      eyebrow: "FRANCHISE · PARTNERS WANTED",
      title: "Bring a bowl of\nGu Zao Wei to your city.",
      sub: "Born in a Taipei alley in Da’an. We are looking for our first founding partners to turn pork offal rice noodle soup into a brand that travels across Taiwan and the world.",
      cta: "Book a briefing",
      cta2: "See store formats",
      badge: "Founding partner reservations open",
    },
    why: {
      eyebrow: "WHY GU ZAO WEI",
      title: "Why Gu Zao Wei?",
      items: [
        {
          title: "A highly recognizable brand",
          desc: "Calligraphy wordmark, a pig-chef mascot and an old-school visual system make you memorable on any street corner — and easy to grow on social media and delivery apps.",
        },
        {
          title: "A focused, easy-to-run menu",
          desc: "Three pillars — pork offal rice noodle soup, champion braised pork rice and hei-bai-qie — keep prep and service simple, so newcomers get up to speed fast.",
        },
        {
          title: "Dine-in, take-away, delivery",
          desc: "Run the dining room, bento take-away and delivery platforms together (already live on Uber Eats at in-store prices). More than one revenue stream.",
        },
        {
          title: "An everyday price point",
          desc: "Core items sit at NT$70–170 — an easy daily choice for office workers and neighbors. Loyalty comes from being affordable every day.",
        },
        {
          title: "“Offal cuisine” the world understands",
          desc: "Offal dishes have steady followings in Japan, Korea and across the Chinese-speaking world. The brand language travels naturally, and suits overseas master franchising.",
        },
        {
          title: "HQ runs beside you",
          desc: "From site selection and training to opening and ongoing supervision, you won’t be figuring it out alone.",
        },
      ],
    },
    formats: {
      eyebrow: "STORE FORMATS",
      title: "Four formats. Find yours.",
      items: [
        {
          tag: "A",
          title: "Street-front store",
          desc: "The full format — dine-in, take-away and delivery. Builds a loyal neighborhood base and serves as the brand’s standard flagship look.",
          fit: "Best for: partners with a street-front space who want to run the whole brand",
        },
        {
          tag: "B",
          title: "Take-away light store",
          desc: "Focused on take-away, bento and delivery. Smaller footprint, shorter workflow, lower upfront commitment.",
          fit: "Best for: first-time founders with a limited budget",
        },
        {
          tag: "C",
          title: "Food court / mall counter",
          desc: "Move into malls, food courts and transit hubs. Borrow existing foot traffic to reach new customers fast.",
          fit: "Best for: partners with mall or food-court access",
        },
        {
          title: "Overseas master franchise",
          tag: "D",
          desc: "Country- or city-level master franchise rights — bringing Gu Zao Wei to the world together.",
          fit: "Best for: overseas partners with local F&B experience",
        },
      ],
    },
    support: {
      eyebrow: "HQ SUPPORT",
      title: "How HQ runs beside you.",
      items: [
        { title: "Site evaluation", desc: "Analysis of trade area, foot traffic and rent to help you find the right spot." },
        { title: "Store design", desc: "Unified brand visuals, workflow and equipment planning — no designing from scratch." },
        { title: "Training", desc: "Broth, braising, prep, service SOPs and store management, taught from zero." },
        { title: "Core recipes & supply", desc: "Key sauces and recipes planned by HQ so every store tastes the same." },
        { title: "Opening marketing", desc: "Social, delivery-platform listing and opening events for a strong start." },
        { title: "Ongoing supervision", desc: "Regular operational coaching and menu development so the brand and stores grow together." },
      ],
      disclaimer: "The above are support items planned by HQ. Actual terms are as set out in the franchise disclosure document and agreement.",
    },
    investment: {
      eyebrow: "INVESTMENT",
      title: "The investment, laid out plainly.",
      body: "What you invest depends on the format, floor area and location. At the briefing we will walk through each item and a projection for your situation, and provide a written franchise disclosure document before you sign.",
      amountLabel: "Provided at the briefing",
      items: [
        { title: "Franchise fee", desc: "Brand license and system onboarding." },
        { title: "Deposit", desc: "Performance deposit as stipulated in the agreement." },
        { title: "Build-out & equipment", desc: "Planned by format, floor area and site conditions." },
        { title: "Opening inventory", desc: "Core ingredients and packaging for opening." },
        { title: "Working capital", desc: "Recommended reserve for the first months of operation." },
      ],
      note: "Actual terms are as set out in the franchise disclosure document and agreement. This page is for reference only and is not an offer. All investments carry risk; profit is not guaranteed.",
    },
    process: {
      eyebrow: "PROCESS",
      title: "From first chat to opening day.",
      steps: [
        { title: "Online inquiry", desc: "Fill in the form so we can get to know you and your city." },
        { title: "Tasting & briefing", desc: "Taste the food in person and learn about the brand and franchise system." },
        { title: "Evaluation & projection", desc: "Site evaluation, format recommendation and investment projection." },
        { title: "Agreement", desc: "A written disclosure document first; sign only after you’ve reviewed it thoroughly." },
        { title: "Training", desc: "Broth, braising, service SOPs and store management." },
        { title: "Opening & ongoing support", desc: "Opening coaching, marketing support and continued supervision." },
      ],
    },
    partner: {
      eyebrow: "WHO WE LOOK FOR",
      title: "The partner we hope you are.",
      items: [
        "You believe in “real ingredients, old-school flavor”",
        "You’ll run the store yourself, or appoint a full-time manager",
        "You care about service and consistency, and follow the SOP",
        "You have sound financial planning and a long-term mindset",
      ],
      note: "No F&B experience needed — we’ll teach you.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        {
          q: "Can I join without restaurant experience?",
          a: "Yes. Standardized prep, cooking and service SOPs, plus HQ training and opening coaching, help partners start from zero — but you or your appointed manager must be able to commit full-time.",
        },
        {
          q: "How much capital do I need?",
          a: "It depends on the format, floor area, location and equipment plan. At the briefing we provide every investment item and a projection, and a written disclosure document before signing, so you have time to evaluate.",
        },
        {
          q: "Do I have to open a physical store?",
          a: "We offer several formats — street-front, take-away light, and food-court / mall counter. See “Store formats” above. We’re happy to discuss according to your resources and budget.",
        },
        {
          q: "Who supplies ingredients and broth?",
          a: "Core sauces and key recipes are planned and supplied by HQ so every store tastes the same; fresh ingredients are sourced through regional partners. Details are explained at the briefing.",
        },
        {
          q: "Can I franchise overseas?",
          a: "Yes. We accept overseas master franchise inquiries. Choose “Overseas master franchise” in the form and tell us your country and city.",
        },
        {
          q: "Can I taste the food first?",
          a: "Of course. We recommend visiting the Taipei Da’an store first to taste the food and feel the place, then booking a briefing.",
        },
      ],
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Tell us about your city.",
      body: "Leave your details and we’ll get back to you as soon as possible. You can also call us directly.",
      callLabel: "Franchise line",
    },
    form: {
      name: "Your name",
      phone: "Phone / WhatsApp",
      email: "Email",
      line: "LINE ID (optional)",
      region: "City / country you want to open in",
      format: "Format you’re interested in",
      formatOptions: [
        "Street-front store",
        "Take-away light store",
        "Food court / mall counter",
        "Overseas master franchise",
        "Not sure yet — I’d like to hear more",
      ],
      budget: "Planned budget (optional)",
      budgetOptions: [
        "Not sure yet",
        "Under NT$1M",
        "NT$1–3M",
        "NT$3–5M",
        "Over NT$5M",
      ],
      message: "Anything else you’d like to tell us (optional)",
      consent: "I agree that you may use the above information to contact me about franchising. We use your details only to reply to your inquiry and never share them with third parties.",
      submit: "Send inquiry",
      sending: "Sending…",
      success: "Thank you! We’ve received your inquiry and will be in touch soon.",
      error: "Something went wrong. Please try again later, or call +886-2-2778-0039.",
      invalid: "Please check that all required fields are filled in.",
      required: "Required",
      select: "Please select",
    },
  },

  faq: {
    hero: {
      eyebrow: "FAQ",
      title: "Questions, answered.",
      sub: "Everything you may want to know before you visit.",
    },
    factsTitle: "Quick facts",
    labels: {
      name: "Name",
      cuisine: "Cuisine",
      address: "Address",
      hours: "Hours",
      phone: "Order line",
      price: "Price range",
      payment: "Payment",
      delivery: "Delivery & take-away",
      pets: "Dogs",
      rating: "Google rating",
    },
    values: {
      name: "Gu Zao Wei 古早味 (listed on Google and Uber Eats as 豚之香豬雜米粉湯，滷肉飯)",
      cuisine: "Taiwanese: pork offal rice noodle soup, braised pork rice, hei-bai-qie",
      price: "Menu items NT$20–200",
      payment: "Cash only",
      delivery: "Uber Eats (same price as in-store); phone orders for take-away",
      pets: "Dogs welcome",
      rating: "{rating} / 5 ({count} Google reviews)",
    },
    moreTitle: "Still have a question?",
    moreBody: "Give us a call — we’re happy to help.",
    items: [
      { q: "Where is Gu Zao Wei in Taipei?", a: "It is on the ground floor at No. 16, Alley 40, Lane 216, Section 4, Zhongxiao East Road, Da’an District, Taipei. On Google Maps and Uber Eats it is listed as 豚之香豬雜米粉湯，滷肉飯. Address: {address}." },
      { q: "What are the opening hours?", a: "{hours}. Weekend and public-holiday hours follow the notices posted in the shop — you can also call {phone} to check before you go." },
      { q: "What is the signature dish, and how much is it?", a: "The signature is the pork offal rice noodle soup at NT$140. Champion braised pork rice is NT$70. Hei-bai-qie cuts (assorted offal, gan-lian, pork cheek, heart, tongue, intestines) are NT$80–90 each, served in soup or dry. Prices follow in-store notices." },
      { q: "What is “offal”, and which cuts do you serve?", a: "Offal means the organs and inner parts of the pig — called 豬雜 in Taiwan, ホルモン in Japan and 돼지 내장 in Korea. The shop serves pork heart, tongue, gan-lian (diaphragm), cheek, crunchy intestine, soft intestine, large and small intestine, with textures from crisp and tender to springy and silky." },
      { q: "I’m new to this. How should I order?", a: "Pick your star first: the pork offal rice noodle soup if you want soup, or the champion braised pork rice if you want rice. Add some hei-bai-qie (every cut can be soup or dry), then finish with a side dish and a drink. For good value, try the NT$170 set meals." },
      { q: "Do you accept credit cards or mobile payment?", a: "The shop currently accepts cash only, so please bring cash." },
      { q: "Is there delivery, and is it the same price?", a: "Yes. Search “古早味豬雜米粉湯” or “豚之香豬雜米粉湯” on Uber Eats — delivery prices match the shop’s. For take-away and group orders, you can also phone ahead: {phone}." },
      { q: "Can I bring my dog?", a: "Yes, dogs are welcome." },
      { q: "What does “more for the same price” mean?", a: "When dining in, you can ask for extra broth, rice noodles, rice or braised-pork sauce at no extra charge." },
      { q: "Is the food fresh? Where does it come from?", a: "According to the shop’s own Google Business profile, the offal in the signature soup comes from a local Taiwanese slaughterhouse and reaches the table within 24 hours of slaughter, and the braised pork is braised fresh every day." },
      { q: "How is it rated?", a: "The shop has a Google rating of {rating} stars from {count} reviews (as of October 2026). You can read all reviews and photos on Google Maps." },
      { q: "Can I open a franchise?", a: "Yes. We are taking reservations for our first founding partners, with street-front, take-away light, food-court / mall-counter and overseas master-franchise formats. See the franchise page, or call {phone}." },
    ],
  },

  footer: {
    blurb: "Gu Zao Wei 古早味 · The aroma of pork, offal cuisine. Real ingredients, braised fresh daily, in Da’an, Taipei.",
    explore: "Explore",
    contact: "Contact",
    follow: "Follow",
    googleMaps: "Google Maps",
    rights: "All rights reserved",
    alcohol: "Don’t drink and drive. Alcohol is not for persons under 18.",
  },
};

export default en;
