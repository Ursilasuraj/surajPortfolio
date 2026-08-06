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

    hobbies: [
      { icon: "🥾", title: "Hiking",     img: "images/hiking.jpg",
        text: "Chasing ridgelines and big views — the longer the trail, the better. Long routes are where I do my best thinking: no notifications, just one foot in front of the other until a problem untangles itself." },
      { icon: "🧗", title: "Bouldering", img: "images/boulder.jpg",
        text: "Reading a route like a puzzle, then solving it move by move. It's the closest physical thing to debugging — you fail, change one variable, and try again." },
      { icon: "👨‍🍳", title: "Cooking",  img: "images/food.jpg",
        text: "Reverse-engineering flavours and plating new dishes — my edible R&D. Every dish is iteration under constraints: fixed ingredients, fixed time, taste and adjust." },
      { icon: "🏊", title: "Swimming",   img: "",
        text: "Laps to reset the mind — my favourite kind of deep focus. Nothing to read, nothing to answer, just count and breathe." },
      { icon: "📺", title: "Watching TV", img: "",
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
     were there. Anything marked TODO still needs a real number.
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
        "Own the product strategy for the Classic Measurement & Calibration solution — the tooling engineers use to observe and tune ECU behaviour in production vehicles. [TODO: add scale — how many customers or vehicle programs depend on it?]",
        "Turn ambiguous customer requirements into shippable product concepts, working directly with development, sales and program management. [TODO: name one concept you drove from first request to release]",
        "Act as the technical bridge between customers and development, so field problems reach the people who can fix them without losing detail on the way.",
        "Keep one coherent solution story across product lines, Vector subsidiaries and cooperation partners, so customers get the same answer wherever they ask.",
        "Produce the solution presentations and product information the sales organisation uses to win deals.",
        "Maintain the user manual and solution stories so customers can self-serve instead of raising support tickets. [TODO: any measurable drop in support load?]",
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
        "Architected the cloud map-storage system that streams HD-map data to production vehicles — data model, protocols and API contracts, end to end. [TODO: add scale — data volume, map coverage or number of vehicles]",
        "Made Map-over-the-Air delivery possible, so vehicles receive current map data in the field instead of waiting for a workshop visit. [TODO: add impact — update latency or bandwidth, before vs after]",
        "Defined the V2X concept and interface for vehicle-to-infrastructure communication, setting the contract downstream teams built against.",
        "Planned and estimated front-end and back-end effort for the cloud services, giving program management a delivery forecast they could commit to.",
        "Coordinated web application development for Map-over-the-Air services across teams. [TODO: how many teams / engineers?]",
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
        "Evaluated HD-Map creation technologies and made the build-versus-buy recommendation. [TODO: which program did this decision shape, and what did it save?]",
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
        "Developed software functions (Python & C++) that turned raw sensor data into HD-Map content for autonomous driving.",
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
        "Investigated and implemented an IEC 61131-3 Structured Text parser",
        "Emulated a PLC in ABB RobotStudio using .NET (C#)",
        "Extended an ABB Python library for IEC 61131-3 Structured Text emulation",
        "Prototyped remote control of the simulation environment using voice commands (AWS)",
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
        "Developed modules in HTML5, JavaScript and D3.js on ASP.NET Web API services",
        "Analysed and developed algorithms to find anomalies in industrial data (C#)",
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
        "Wrote and executed test cases for control products",
        "Designed control environments, hardware setup and system integration",
        "Mentored management trainees in testing",
      ],
    },
    {
      role: "Management Trainee",
      company: "ABB",
      logo: "ABB",
      period: "Aug 2013 – Aug 2014",
      location: "India",
      bullets: [
        "Product type & regression testing in the ABB 800xA system; developed auto-test scripts",
        "Upgraded FPGAs across various controllers in the division",
      ],
    },
    {
      role: "Student Project",
      company: "Honeywell Process Solutions",
      logo: "H",
      period: "Jan 2013 – Jun 2013",
      location: "Bengaluru, India",
      bullets: [
        "Building Automation System implementation & integration; graphics development",
        "Integrated and programmed sensors, actuators and controllers",
      ],
    },
  ],

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
