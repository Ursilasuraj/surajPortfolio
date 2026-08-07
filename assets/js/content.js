/* =====================================================================
   PORTFOLIO CONTENT FILE  —  EDIT THIS FILE TO UPDATE THE WEBSITE
   ---------------------------------------------------------------------
   This is the ONLY file you normally need to touch. Change the text,
   add images to the /images folder, and reference them by filename.
   Anything written between "quotes" can be edited freely.

   Two conventions used below:
     TODO  — a placeholder that still needs your input.
     logo  — short initials shown in a coloured tile (no external service).

   IMAGE FILENAMES ARE CASE-SENSITIVE on GitHub Pages. Keep them lowercase.
   ===================================================================== */

const SITE = {
  /* --- Basic identity, shown across the whole site --- */
  name: "Suraj Plachikaad Suresh Kumar",
  shortName: "Suraj P. S. Kumar",
  role: "Product Manager & Engineer",
  tagline: "From HD-maps that guide self-driving cars to a perfectly-timed risotto — I turn complex problems into elegant, working solutions.",
  email: "suraj.plachikaad@gmx.de",
  linkedin: "https://www.linkedin.com/in/suraj-plachikaad-suresh-kumar/",
  github: "https://github.com/SurajPS",
  location: "Stuttgart, Germany",

  /* Drop a PDF at assets/cv.pdf and set this to "assets/cv.pdf" to show a
     download button on the home page. Leave "" to hide the button. */
  cvUrl: "",

  /* --- NOTE ON SHARING/SEO -----------------------------------------
     The <meta>, Open Graph and Twitter tags are NOT set from this file.
     They live in the <head> of each .html page, because search crawlers
     and social-media link scrapers do not run JavaScript — anything
     injected from here would be invisible to them.
     To change your link preview text, edit the <head> of the pages.  */

  /* =================================================================
     HOME PAGE
     ================================================================= */
  home: {
    photo: "images/profile.jpg",
    heading: "Hello, I'm Suraj",
    intro:
      "I'm a Product Manager and engineer who has spent thirteen years turning ambitious ideas into shipped reality — " +
      "architecting cloud map systems for autonomous vehicles, defining V2X concepts, and now steering measurement & " +
      "calibration solutions at Vector. I'm relentlessly curious: I collect knowledge the way some collect stamps, and " +
      "I love untangling messy problems until they click. Off the clock, I chase ridgelines, climb boulders, swim, and " +
      "binge great TV — and in the kitchen I treat every dish like a small engineering project: taste, tweak, plate, repeat.",

    /* A dated "currently" line keeps the site from looking abandoned.
       Update the date whenever you refresh the text. */
    now: {
      updated: "August 2026",
      text:
        "Shaping the roadmap for Vector's Classic Measurement & Calibration solution — " +
        "and figuring out how AI-assisted tooling changes the way engineers calibrate ECUs.",
    },

    // Quick stats (animated counters). Edit numbers freely.
    stats: [
      { value: 13, suffix: "+", label: "Years in tech" },
      { value: 4,  suffix: "",  label: "Companies" },
      { value: 25, suffix: "+", label: "Technologies used" },
      { value: 2,  suffix: "",  label: "Degrees" },
    ],

    /* `icon` names a line icon drawn in main.js (HOBBY_ICON): hiking,
       bouldering, cooking, swimming, tv. Shown only when `img` is empty. */
    hobbies: [
      { icon: "hiking", title: "Hiking",     img: "images/hiking.jpg",
        text: "Chasing ridgelines and big views — the longer the trail, the better. Long routes are where I do my best thinking: no notifications, just one foot in front of the other until a problem untangles itself." },
      { icon: "bouldering", title: "Bouldering", img: "images/boulder.jpg",
        text: "Reading a route like a puzzle, then solving it move by move. It's the closest physical thing to debugging — you fail, change one variable, and try again." },
      { icon: "cooking", title: "Cooking",  img: "images/food.jpg",
        text: "Not plating — flavour. I want a mouthful to land somewhere you weren't expecting. Mostly Indian, mostly meat and fish, and spice measured by what the dish needs rather than how hot it can get." },
      { icon: "book", title: "Reading", img: "",
        text: "Four or five passes through Harry Potter and still counting. I read for worlds that couldn't exist — the further from an engineering problem, the better." },
      { icon: "swimming", title: "Swimming",   img: "",
        text: "Laps to reset the mind — my favourite kind of deep focus. Nothing to read, nothing to answer, just count and breathe." },
      { icon: "tv", title: "Watching TV", img: "",
        text: "A devoted binge-watcher with a soft spot for clever storytelling. Good structure is good structure, whether it's a plot or a system architecture." },
    ],

    /* Gallery images need alt text — it is read aloud by screen readers
       and shown if the image fails to load. */
    gallery: [
      { src: "images/travel1.jpg", alt: "Standing beside a turquoise alpine lake with arms outstretched, pine forest and snow-capped peaks behind." },
      { src: "images/travel2.jpg", alt: "Standing on a limestone clifftop above turquoise ocean, with sea arches and sandstone cliffs along the coast." },
    ],
  },

  /* =================================================================
     PROFESSIONAL EXPERIENCE

     Write bullets as OUTCOMES, not duties: what changed because you
     were there.
     ================================================================= */
  experience: [
    {
      role: "Product Manager — Solution Manager, Measurement & Calibration (MICROSAR Classic)",
      company: "VECTOR Informatik · Full-time",
      logo: "V",
      headline: "Steering the strategy of a flagship measurement & calibration solution",
      period: "Dec 2024 – Present",
      location: "Stuttgart, Germany · On-site",
      bullets: [
        "Own the product strategy for the Classic Measurement & Calibration solution — the tooling engineers across a diverse, ever-changing base of automotive customers rely on to observe and tune ECU behaviour in production vehicles.",
        "Turn ambiguous customer requirements into shippable product concepts end-to-end — from the first ask through to a released capability — working hand-in-hand with development, sales and program management.",
        "Serve as the technical bridge between customers and development, ensuring field issues reach the right engineers with full context intact.",
        "Maintain one coherent solution story across product lines, Vector subsidiaries and cooperation partners — so customers get a consistent answer no matter who they ask.",
        "Create the solution presentations and product materials the sales organisation relies on to win deals.",
        "Maintain the user manual and solution stories that let customers self-serve answers instead of opening a support ticket in the first place.",
      ],
    },
    {
      role: "Development Engineer — Solutions Architect",
      company: "ZF Group · Full-time",
      logo: "ZF",
      headline: "Architected the cloud brain that streams maps to self-driving cars",
      period: "May 2022 – Nov 2024",
      location: "Friedrichshafen, Germany",
      bullets: [
        "Architected the cloud map-storage system that streams HD-map data to production vehicles — data model, protocols and API contracts, end to end — supporting delivery footprints from a 500 m to 2 km radius around the vehicle, or along a trajectory computed on the fly, so vehicles receive exactly the map data they need.",
        "Made Map-over-the-Air delivery possible, so vehicles receive current map data directly in the field instead of waiting for a workshop visit — turning a manual update process into a background one.",
        "Defined the V2X concept and interface for vehicle-to-infrastructure communication, setting the contract downstream teams built against.",
        "Planned and estimated front-end and back-end effort for the cloud services, giving program management a delivery forecast they could commit to.",
        "Coordinated web application development for Map-over-the-Air services across multiple engineering teams, keeping delivery aligned with the cloud architecture.",
      ],
    },
    {
      role: "Development Engineer — Component Owner",
      company: "ZF Group · Full-time",
      logo: "ZF",
      headline: "Owned the map components that help autonomous cars find their way",
      period: "May 2020 – Apr 2022",
      location: "Friedrichshafen, Germany",
      bullets: [
        "Owned the map software components behind autonomous vehicle localisation and navigation — architecture, interfaces and delivery into the target system.",
        "Shipped V2X applications onto target hardware, taking vehicle-to-infrastructure communication from concept to running code on real ECUs.",
        "Evaluated HD-Map creation technologies and made the build-versus-buy recommendation that shaped how the team sourced map data going forward.",
        "Ran deliveries of map-based software to the vehicle, keeping cloud-hosted map applications in step with vehicle-side integration.",
      ],
    },
    {
      role: "Development Engineer — Developer (HD-Maps, Autonomous Driving)",
      company: "ZF Group · Full-time",
      logo: "ZF",
      headline: "Turned raw sensor data into HD-maps for autonomous driving",
      period: "May 2018 – Apr 2020",
      location: "Friedrichshafen, Germany",
      bullets: [
        "Built software functions in Python and C++ that turned raw sensor data into HD-Map content for autonomous driving.",
        "Implemented processing on ROS using PCL to handle large LiDAR point-cloud datasets.",
      ],
    },
    {
      role: "Master Thesis",
      company: "ABB",
      logo: "ABB",
      period: "May 2017 – Nov 2017",
      location: "Germany · On-site",
      bullets: [
        "Researched and built an IEC 61131-3 Structured Text parser from the ground up",
        "Emulated a PLC in ABB RobotStudio using .NET (C#)",
        "Extended an ABB Python library to support IEC 61131-3 Structured Text emulation",
        "Prototyped voice-controlled operation of the simulation environment using AWS",
      ],
    },
    {
      role: "Working Student",
      company: "Darmstadt University of Applied Sciences",
      logo: "h_da",
      period: "Dec 2017 – Apr 2018",
      location: "Darmstadt, Germany",
      bullets: [],
    },
    {
      role: "Intern — Interactive Intelligent Data Visualization",
      company: "ABB · Operation Management",
      logo: "ABB",
      period: "Oct 2016 – Mar 2017",
      location: "Ladenburg, Germany",
      bullets: [
        "Built HTML5, JavaScript and D3.js modules on top of ASP.NET Web API services",
        "Designed and implemented C# algorithms to detect anomalies in industrial data",
        "Designed sorting mechanisms and a persistence layer for parameter configuration",
      ],
    },
    {
      role: "Test Specialist",
      company: "ABB",
      logo: "ABB",
      period: "Aug 2014 – Aug 2015",
      location: "Bengaluru, India · On-site",
      bullets: [
        "Wrote and ran test cases for control products",
        "Designed control environments, hardware setups and system integration",
        "Mentored incoming management trainees in testing practice",
      ],
    },
    {
      role: "Management Trainee",
      company: "ABB",
      logo: "ABB",
      period: "Aug 2013 – Aug 2014",
      location: "India",
      bullets: [
        "Ran product-type and regression testing in the ABB 800xA system, and built auto-test scripts to support it",
        "Upgraded FPGAs across multiple controllers in the division",
      ],
    },
    {
      role: "Student Project",
      company: "Honeywell Process Solutions",
      logo: "H",
      period: "Jan 2013 – Jun 2013",
      location: "Bengaluru, India",
      bullets: [
        "Implemented and integrated a Building Automation System, including graphics development",
        "Integrated and programmed sensors, actuators and controllers",
      ],
    },
  ],

  /* =================================================================
     FAVOURITES — what I watch and what I read
     -----------------------------------------------------------------
     The page runs on one idea: on screen I watch how a thing was built,
     on the page I want somewhere that couldn't exist. `intro` states it,
     and each half repeats it in its own `blurb`. If you rewrite one,
     rewrite the others so they still agree.

     Entry fields:
       title   What it is
       author  Books only
       works   Optional list of individual titles, for a grouped entry
       icon    A line icon drawn in main.js (FAV_ICON). Optional — leave
               it out and the entry renders with a small rule instead.
               A page where everything has an icon says nothing.
       note    A one-line personal take. Short, and in your own voice —
               a studio tagline says nothing about you.

     Available icons: odyssey, bat, hat, top, heart, assemble, reactor,
     web, shield, flask, crown, dragon, meteor, atom, mug, droplet,
     wand, ring, sword, compass, torch, rocket, magnifier, key, trident,
     lamp, pen, sun, enso, mortar, fish, pan, hourglass
     ================================================================= */
  favourites: {
    intro:
      "Two different appetites, and one literal one. On screen I can't stop watching the " +
      "machinery — how a shot was built, whether the physics holds, where the edit hides " +
      "the seam. On the page I want the exact opposite: somewhere that couldn't possibly " +
      "exist, written well enough that it does. And in the kitchen I'm after the same " +
      "thing as both — a mouthful that puts you somewhere else.",

    screen: {
      blurb: "I can't switch the engineering off. Half of what I enjoy is watching how the thing was made.",
      films: [
        { title: "The Dark Knight", icon: "bat",
          note: "A real truck flipped on a real street, shot on IMAX. The spectacle was built, not rendered." },
        { title: "Inception", icon: "top",
          note: "They actually built the rotating corridor. Every layer runs on its own clock and the edit never drops one." },
        { title: "The Prestige", icon: "hat",
          note: "The film is assembled exactly like the trick it describes. Pledge, turn, prestige." },
        { title: "The Odyssey", icon: "odyssey",
          note: "The oldest story there is, handed to the most technical director working. I was always going to watch how he built it." },
        { title: "The Avengers — all four", icon: "assemble",
          note: "Ten years of setup landing in one film. The scheduling alone is an engineering feat." },
        { title: "Iron Man I, II & III", icon: "reactor",
          note: "Every suit-up is an assembly sequence. I have never once skipped one." },
        { title: "The Spider-Man films", icon: "web",
          note: "Every actor, every timeline — and each one solves the same swing differently." },
        { title: "Captain America", icon: "shield",
          note: "The least powerful Avenger, and the choreography knows it. All leverage and angles." },
        { title: "A Walk to Remember", icon: "heart",
          note: "Nothing to take apart here. It just works on me, every single time." },
      ],

      series: [
        { title: "Breaking Bad", icon: "flask",
          note: "Every frame composed, every colour tracked to a character. The chemistry is the least of it." },
        { title: "Game of Thrones", icon: "crown",
          note: "Practical sets, real horses, a battle shot in mud for weeks. You can feel the weight." },
        { title: "House of the Dragon", icon: "dragon",
          note: "Same world, smaller board — and every dragon flies to its own logic." },
        { title: "Dexter", icon: "droplet",
          note: "A show that dares you to keep rooting for him, then quietly checks whether you did." },
        { title: "Smallville", icon: "meteor",
          note: "Ten seasons of the story before the story. I stayed for all of them." },
        { title: "The Big Bang Theory", icon: "atom",
          note: "Physics jokes I laughed at before I understood them, then again afterwards." },
        { title: "Friends", icon: "mug",
          note: "No craft to admire, no puzzle to solve. The one where you've already seen them all." },
      ],
    },

    shelf: {
      blurb: "Here I want the opposite of technical. Give me a world with its own weather and I'll stay in it.",
      groups: [
        {
          era: "Read and re-read",
          blurb: "The ones I go back to rather than finish.",
          books: [
            { title: "Harry Potter", author: "J.K. Rowling", icon: "wand",
              note: "Four or five times through, and the castle still feels like somewhere I've lived." },
            { title: "The Lord of the Rings", author: "J.R.R. Tolkien", icon: "ring",
              note: "Languages, maps, genealogies. A world built so far past the plot that the plot feels discovered rather than written." },
            { title: "The Inheritance Cycle", author: "Christopher Paolini", icon: "sword",
              note: "Four thick books I took at a run. Dragons with rules, which is what makes them believable." },
          ],
        },
        {
          era: "Where it started",
          blurb: "Childhood, and the reason any of the rest happened.",
          books: [
            { title: "The Blyton years", author: "Enid Blyton", icon: "compass",
              works: "Famous Five · Secret Seven · The Wishing-Chair · Enchanted Tales",
              note: "Small adventurers solving what adults couldn't — and a chair that flew. Where the habit started, and I was completely sold." },
          ],
        },
        {
          era: "The teenage detectives",
          blurb: "A long stretch of wanting to work out the answer first.",
          books: [
            { title: "The Hardy Boys", author: "Franklin W. Dixon", icon: "torch",
              note: "A mystery a week, and I never minded knowing they'd solve it." },
            { title: "Tintin", author: "Hergé", icon: "rocket",
              note: "Read for the story, stayed for panels I could still redraw from memory." },
            { title: "Sherlock Holmes", author: "Arthur Conan Doyle", icon: "magnifier",
              note: "Where I learned that noticing is a skill, not a talent." },
          ],
        },
        {
          era: "Puzzle boxes",
          blurb: "The one shelf where both appetites meet.",
          books: [
            { title: "The Robert Langdon books", author: "Dan Brown", icon: "key",
              works: "The Da Vinci Code · Angels & Demons · The Lost Symbol",
              note: "Cathedrals, cryptography and a cliffhanger every four pages. I have never once put one down early." },
          ],
        },
        {
          era: "Closer to home",
          blurb: "The last few years, mostly Indian authors.",
          books: [
            { title: "The Shiva Trilogy · The Ram Chandra series", author: "Amish Tripathi", icon: "trident",
              works: "The Immortals of Meluha · The Secret of the Nagas · The Oath of the Vayuputras · Scion of Ikshvaku · Sita: Warrior of Mithila",
              note: "Mythology rebuilt as a thriller, with the gods left stubbornly human. Five books in and he still hasn't run out of road." },
            { title: "The Ravana retelling", author: "Anand Neelakantan", icon: "lamp",
              note: "The Ramayana from the losing side, which turns out to be the more interesting one." },
            { title: "Four novels", author: "Chetan Bhagat", icon: "pen",
              works: "Five Point Someone · 2 States · The 3 Mistakes of My Life · Half Girlfriend",
              note: "Campus, cricket and marrying across a language line. He writes an India I recognise." },
          ],
        },
        {
          era: "Quieter shelves",
          blurb: "Short books that outstayed their page count.",
          books: [
            { title: "The Alchemist", author: "Paulo Coelho", icon: "sun",
              note: "Slim, deceptively simple, and it lands differently every time I pick it up." },
            { title: "Ikigai", author: "García & Miralles", icon: "enso",
              note: "A small book about why you get up in the morning." },
          ],
        },
      ],
    },

    kitchen: {
      blurb:
        "Presentation is the last thing I care about. I'm cooking for the moment the " +
        "flavour lands somewhere you weren't expecting.",
      items: [
        { title: "Indian, mostly", icon: "mortar",
          note: "The food I grew up on and still the food I reach for. Regional, home-style, and nothing that needs a garnish to justify itself." },
        { title: "Meat and fish", icon: "fish",
          note: "Where spice does the real work. Enough to build heat and depth, never so much that the thing underneath disappears." },
        { title: "Appetisers and mains", icon: "pan",
          note: "My end of the meal. This is where I'll happily improvise, and where the good ideas turn up." },
        { title: "Desserts", icon: "hourglass",
          note: "They need patience, and patience is measured. I'll make them; I won't pretend they're my strength." },
      ],
    },
  },

  /* =================================================================
     EDUCATION
     ================================================================= */
  education: [
    {
      degree: "MSc, Electrical Engineering & Information Technology",
      school: "Darmstadt University of Applied Sciences",
      period: "2015 – 2017 · Grade 1.7",
      logo: "h_da",
      icon: "🎓",
      image: "",
      details: "Advanced programming, Android/Java development, intelligent automation, task planning for mobile robots, advanced robotics, telemanipulators, feedback control & mechatronics. Led a six-person Augmented Reality project: smart glasses detecting industrial objects and surfacing database info, with text detection, virtual buttons and speech recognition. Focus on Industry 4.0 and IoT.",
    },
    {
      degree: "BE, Instrumentation Technology",
      school: "RNS Institute of Technology, India",
      period: "2009 – 2013 · Grade 82%",
      logo: "RNS",
      icon: "⚙️",
      image: "",
      details: "Core: C, C++, analytical/process/biomedical/aircraft/optical instrumentation, robotics, signals & systems, mobile communication, automation in process control, advanced & process control systems, digital image processing, microcontrollers. Final-year project at Honeywell on Building Management Systems. Coordinated college fests, robotics club member, departmental newsletter editor.",
    },
  ],

  /* =================================================================
     PATENTS
     -----------------------------------------------------------------
     Every field except `title` is optional and is simply hidden if you
     leave it out or set it to "".

       title       Patent title as filed
       titleOrig   Original-language title, if the patent isn't in English
       number      Patent / publication number
       office      USPTO, EPO, DPMA, WIPO …
       year        Grant or publication year
       filed       e.g. "Filed Nov 2019"
       status      "Granted", "Pending", "Published"
       assignee    Company the patent is assigned to
       coInventors e.g. "with Jane Doe" — credit your co-inventors
       link        Google Patents / Espacenet URL
       art         Illustration: "lidar", "map" or "cloud" (see main.js)
       plain       ONE jargon-free sentence. This is the field that makes
                   the page readable for non-engineers — worth writing.

     ⚠️  VERIFY BEFORE SHARING: the entry below was reconstructed from
     public patent databases, not from your own records. Please check
     the number, dates and co-inventor spelling. If you hold further
     patents, copy the block and add them.
     ================================================================= */
  patents: [
    {
      title:       "Location-based radar, LiDAR and GCP data",
      number:      "US 12,181,308 B2",
      office:      "USPTO",
      year:        "2024",
      filed:       "Filed Nov 2019",
      status:      "Granted",
      assignee:    "ZF Friedrichshafen AG",
      coInventors: "with Mithun Sreekumar",
      link:        "https://patents.google.com/patent/US12181308B2/en",
      art:         "lidar",
      plain:
        "The vehicle tells a server where it is, and the server sends back just " +
        "the sensor reference data for that stretch of road — radar, LiDAR and " +
        "ground-control-point data — instead of the car carrying an entire map on board.",
    },
    {
      title:       "Evaluation of sensor data from a vehicle",
      titleOrig:   "Auswerten von Sensordaten eines Fahrzeugs",
      number:      "DE 10 2019 211 006 B4",
      office:      "DPMA",
      year:        "2022",
      filed:       "Filed Jul 2019",
      status:      "Granted",
      assignee:    "ZF Friedrichshafen AG",
      coInventors: "with Mihai Coanda, Mithun Sreekumar and Shantanu Menon",
      link:        "https://patents.google.com/patent/DE102019211006B4/en",
      art:         "fusion",
      plain:
        "When a car's live sensors disagree with its stored map, something has to decide " +
        "which to believe. This ranks every source by how much it can be trusted — readings " +
        "from safety-certified (ASIL) sensors outrank uncertified ones — so the vehicle " +
        "leans on the more reliable evidence when it merges the two.",
    },
  ],

  /* =================================================================
     SKILLS
     -----------------------------------------------------------------
     Proficiency is shown as a tier, not a percentage — "85%" invites
     the question "85% of what?", tiers don't.
     Allowed tiers: "Expert", "Advanced", "Working"
     ================================================================= */
  skills: [
    { name: "Mathematical & Analytical",  tier: "Expert",   note: "Turning fuzzy problems into models that can actually be reasoned about." },
    { name: "Gathering Info & Knowledge", tier: "Expert",   note: "Finding the answer, and the person who already knows it." },
    { name: "Problem Management",         tier: "Advanced", note: "Triage, root cause, and keeping everyone informed while it's still on fire." },
    { name: "Programming",                tier: "Advanced", note: "C, C++ and Python in production systems for over a decade." },
    { name: "Planning",                   tier: "Advanced", note: "Estimates that survive contact with a real delivery schedule." },
    { name: "Organisation",               tier: "Advanced", note: "Keeping several product lines and partners pointing the same direction." },
  ],

  /* Technical skills shown as tags, grouped by area. Edit freely. */
  techSkills: [
    { group: "Programming",  items: ["C", "C++", "Python3", "Java", "C# .NET", "JavaScript", "CSS", "D3.js"] },
    { group: "Domains",      items: ["HD Maps", "Autonomous Vehicles", "V2X", "LiDAR", "Embedded Software", "ROS", "Robotics"] },
    { group: "Architecture & Cloud", items: ["Enterprise Architecture", "Component Design", "Cloud Applications", "OpenShift", "Web Services", "Protocol Buffers"] },
    { group: "Process & Mgmt", items: ["Project Management", "Planning", "Requirements Management", "Component Testing", "Analytic Problem Solving"] },
    { group: "Automation & Tools", items: ["ABB 800xA", "IEC 61131", "Structured Text", "Robot Studio", "Matlab", "Unity3D", "Visio", "Microsoft Office"] },
  ],
};
