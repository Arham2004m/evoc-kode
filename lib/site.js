/*
 * Single source of truth for every piece of copy on the site.
 * Anything wrapped in [square brackets] is a placeholder — replace it here
 * and it updates everywhere it is used.
 */

export const site = {
  brand: "EVOC KODE",
  companyName: "EVOC Labs Pvt. Ltd.",
  phone: "+91 63970 62646",
  phoneHref: "tel:+916397062646",
  email: "support@evoclabs.com",
  emailHref: "mailto:support@evoclabs.com",
  whatsappHref: "https://wa.me/916397062646",
  goLiveWeeks: "a few",
  projectDays: "30–45",
  replyTime: "one business day",
  // Year shown in the footer. Replace with a fixed value like "2026" if preferred.
  year: String(new Date().getFullYear()),
};

/*
 * Hero background: the fluid shader in components/ui/fluid-field.jsx.
 * Colours must stay within the brand palette:
 * #030F26 · #061440 · #08348C · #2256F2 · #3071F2 · #FFFFFF
 */
export const heroFluid = {
  baseColor: "#030F26", // matches the page background so the hero blends into the sections
  glowColor: "#2256F2",
  glowColorAlt: "#3071F2",
  glowStrength: 0.7, // 0 = no glow, ~1 = very bright
  speed: 1, // animation speed multiplier
};

export const nav = [
  { label: "Why Us", href: "#why-us" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Solutions", href: "#solutions" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export const headerCta = { label: "Talk to Us", href: "#contact" };

export const heroBadge = "Custom Mobile Apps";

/*
 * Each title is split into two masked lines. `em` is the phrase rendered in
 * the serif italic accent. `before`/`after` surround it on that line.
 */
export const heroSlides = [
  {
    lines: [
      { before: "Your ", em: "App Idea", after: "," },
      { before: "Built and Launched" },
    ],
    title: "Your App Idea, Built and Launched",
    cta: { label: "Book a Free Call", href: "#contact" },
    tagline: "Shops, clinics, schools and restaurants are already building with us.",
  },
  {
    lines: [
      { before: "Mobile Apps That" },
      { before: "Bring In ", em: "Business" },
    ],
    title: "Mobile Apps That Bring In Business",
    cta: { label: "Start Building", href: "#contact" },
    tagline: "One team takes you from concept to the app stores.",
  },
  {
    lines: [
      { before: "Built ", em: "Once", after: "," },
      { before: "Runs Everywhere" },
    ],
    title: "Built Once, Runs Everywhere",
    cta: { label: "Tell Us Your Idea", href: "#contact" },
    tagline: "A single codebase for Android and iOS, made to perform and scale.",
  },
  {
    lines: [
      { before: "Give Your Customers" },
      { before: "an App ", em: "They'll Love" },
    ],
    title: "Give Your Customers an App They'll Love",
    cta: { label: "Let's Get Started", href: "#contact" },
    tagline: "Designed around the way your customers buy and the way your team works.",
  },
];

export const heroSecondaryCta = { label: "How We Work", href: "#how-we-work" };

export const stats = [
  { value: "100%", label: "Tailor-made", icon: "pills" },
  { value: site.projectDays, label: "Days to go live", icon: "launch" },
  { value: "1 codebase", label: "Two platforms", icon: "devices" },
  { value: "4.9★", label: "Client satisfaction", icon: "star" },
];

export const whyUs = {
  eyebrow: "Why Us",
  title: { before: "Everything Under ", em: "One Roof" },
  text: "You share the vision, and we take care of design, code and launch.",
  /*
   * Background corridor (components/ui/image-stream-hero.jsx). The images are
   * decorative palette-only artwork in public/stream — swap in real app screenshots
   * later (same 18:25 portrait ratio works best).
   */
  stream: {
    speed: 22, // seconds for one card to travel the corridor
    cards: 9, // cards per rail — keep at 9+ so the ribbon stays solid
    axis: 52, // vertical position of the vanishing point, % of the corridor's height
    images: [
      { src: "/stream/wash-1.svg" },
      { src: "/stream/screen-list.svg" },
      { src: "/stream/rings.svg" },
      { src: "/stream/light.svg" },
      { src: "/stream/chart.svg" },
      { src: "/stream/grid.svg" },
      { src: "/stream/calendar.svg" },
      { src: "/stream/wash-2.svg" },
    ],
  },
  items: [
    { icon: "Briefcase", title: "Made for Your Business", text: "No off-the-shelf templates, just an app shaped around your workflow." },
    { icon: "Fingerprint", title: "Designed for People", text: "Screens that feel obvious from the first tap." },
    { icon: "ShieldCheck", title: "Quick and Protected", text: "Built to perform well, with security in place from the start." },
    { icon: "TrendingUp", title: "Ready to Grow", text: "The architecture keeps up as your users multiply." },
    { icon: "Target", title: "Built Around Results", text: "Every feature has to earn its place." },
    { icon: "Receipt", title: "Clear Pricing", text: "A fixed quote with no surprises." },
    { icon: "Headset", title: "People You Can Reach", text: "A team that answers during the build and after launch." },
    { icon: "RefreshCw", title: "Kept Up to Date", text: "Regular updates keep the app secure and improving." },
  ],
};

export const howWeWork = {
  eyebrow: "How We Work",
  title: { before: "From First Call to ", em: "Live App" },
  text: "A simple, step-by-step path with no tech jargon.",
  steps: [
    { icon: "Search", title: "Discovery", text: "We get to know your business and what you want to achieve.", tags: ["Kickoff call"] },
    { icon: "Map", title: "Blueprint", text: "We plan the screens, features and user flow.", tags: ["Scope", "Timeline"] },
    { icon: "Palette", title: "Design", text: "We create clean, intuitive interfaces.", tags: ["Prototypes"] },
    { icon: "CodeXml", title: "Build", text: "We develop the app on a modern cross-platform stack.", tags: ["Frontend", "Backend", "APIs"] },
    { icon: "ClipboardCheck", title: "Quality Check", text: "We test speed, security and stability.", tags: ["QA"] },
    { icon: "Rocket", title: "Launch", text: "We submit to Google Play and the App Store for you.", tags: ["Store listing"] },
  ],
};

export const techBand = {
  eyebrow: "Tech Band",
  title: { before: "Proven Tools, ", em: "Zero Headaches" },
  text: "You don't have to worry about the tech. Here's what we build with.",
  // Replace with the real tools you use.
  tools: [
    "[Cross-platform Framework]",
    "[Backend]",
    "[Database]",
    "[Cloud Hosting]",
    "[Payments Gateway]",
    "[Push Notifications]",
    "[Analytics]",
    "[Maps & Location]",
  ],
};

export const solutions = {
  eyebrow: "Solutions",
  title: { before: "Apps for ", em: "Every Industry" },
  text: "We adapt proven app types to the way you run your business.",
  items: [
    { icon: "CalendarCheck", title: "Booking", text: "Schedule and manage appointments" },
    { icon: "ShoppingBag", title: "E-commerce", text: "Sell online with safe checkout" },
    { icon: "Bike", title: "Food Delivery", text: "Live order tracking" },
    { icon: "HeartPulse", title: "Health & Fitness", text: "Track workouts and wellness" },
    { icon: "UtensilsCrossed", title: "Restaurant", text: "Orders and reservations" },
    { icon: "Truck", title: "Logistics", text: "Fleet and route management" },
    { icon: "GraduationCap", title: "Education", text: "Courses and student portals" },
    { icon: "Users", title: "Community", text: "Chat and sharing" },
    { icon: "Wallet", title: "Fintech", text: "Payments and wallets" },
    { icon: "Bot", title: "AI", text: "Smart automation" },
    { icon: "Puzzle", title: "Custom", text: "Anything else you need", wide: true },
  ],
};

export const features = {
  eyebrow: "Features",
  title: { before: "Pick What ", em: "You Need" },
  text: "We'll help you choose the right mix for your budget.",
  items: [
    { icon: "KeyRound", label: "Sign-up & login" },
    { icon: "Smartphone", label: "OTP" },
    { icon: "LayoutDashboard", label: "Admin panel" },
    { icon: "CreditCard", label: "Payments" },
    { icon: "Bell", label: "Notifications" },
    { icon: "MapPin", label: "GPS tracking" },
    { icon: "MessagesSquare", label: "In-app chat" },
    { icon: "Star", label: "Ratings" },
    { icon: "ChartLine", label: "Insights" },
    { icon: "Languages", label: "Multiple languages" },
    { icon: "QrCode", label: "QR codes" },
    { icon: "ScanBarcode", label: "Barcode scanning" },
    { icon: "FileText", label: "Reports" },
    { icon: "Sparkles", label: "AI tools" },
    { icon: "CloudUpload", label: "Cloud sync" },
  ],
};

export const crossPlatform = {
  eyebrow: "Cross-platform",
  title: { before: "Two Platforms, ", em: "One Build" },
  text: "One app runs on both Android and iPhone, which means a faster launch, a lower cost and simpler updates. Your customers get the same experience on every device, and you only pay for one project.",
  points: ["Faster launch", "Lower cost", "Simpler updates"],
};

export const whyPick = {
  eyebrow: "Why Businesses Pick Us",
  title: { before: "A Partner, ", em: "Not Just a Vendor" },
  items: [
    { icon: "Users", title: "Full-Service Team", text: "Planning, building and support from one crew." },
    { icon: "Target", title: "Outcome-Driven", text: "We measure success by your results." },
    { icon: "Layers", title: "Modern Stack", text: "Current technology that stays maintainable." },
    { icon: "Clock", title: "Quick Turnaround", text: `Most projects go live in ${site.goLiveWeeks} weeks.` },
    { icon: "PenTool", title: "Polished Design", text: "Interfaces that build trust on sight." },
    { icon: "Lock", title: "Protected Data", text: "Security on every layer." },
    { icon: "LifeBuoy", title: "Long-Term Care", text: "Support that continues after launch." },
    { icon: "Eye", title: "Honest Updates", text: "You always know where your project stands." },
  ],
};

/*
 * Testimonials: real quotes from clients only.
 * The first item is shown large (featured); the next two sit beside it.
 * Optional fields per item: `business`, `industry` (shown as a tag) and `result`
 * (a short, verifiable outcome badge). Leave them out and they are not rendered.
 */
export const testimonials = {
  eyebrow: "Testimonials",
  title: { before: "In Their ", em: "Words" },
  items: [
    {
      headline: "Professional, responsive, and reliable.",
      quote:
        "The team understood our requirements quickly and delivered a solution that was both modern and easy to use. Their communication throughout the project was excellent, and they were always open to feedback.",
      name: "Rahul Sharma",
      role: "Business Owner",
    },
    {
      headline: "They turned our idea into a real product.",
      quote:
        "We had a clear vision but weren't sure how to bring it to life. The team helped us refine the idea, handled the technical side, and delivered a website that looks professional and performs smoothly.",
      name: "Aman Verma",
      role: "Founder",
    },
    {
      headline: "Excellent design and development experience.",
      quote:
        "From the initial discussion to the final delivery, the entire process was smooth. The website is fast, responsive, and looks great across devices. Highly recommended for businesses looking for quality development.",
      name: "Priya Mehta",
      role: "Marketing Manager",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: { before: "Common Questions, ", em: "Simple Answers" },
  items: [
    { q: "How long will my app take?", a: `Most projects take ${site.projectDays} days, and you'll get a firm timeline before work begins.` },
    { q: "Do I need separate Android and iPhone apps?", a: "No. One cross-platform build covers both." },
    { q: "Will you publish it for me?", a: "Yes, we handle the store submissions from start to finish." },
    { q: "What happens after launch?", a: "You can choose a maintenance plan that covers updates, fixes and support." },
  ],
};

export const finalCta = {
  title: { before: "Let's Build ", em: "Your App" },
  text: `Share your idea and we'll get back to you within ${site.replyTime}.`,
  cta: { label: "Chat on WhatsApp", href: site.whatsappHref },
};

export const footer = {
  description: `${site.brand} builds custom mobile apps for growing businesses, from first sketch to store launch.`,
  columns: [
    {
      title: "Company",
      links: [
        { label: "Why Us", href: "#why-us" },
        { label: "How We Work", href: "#how-we-work" },
        { label: "Why Businesses Pick Us", href: "#why-pick-us" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Solutions", href: "#solutions" },
        { label: "Features", href: "#features" },
        { label: "Cross-platform", href: "#cross-platform" },
        { label: "Tech Band", href: "#tech" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: site.phone, href: site.phoneHref },
        { label: site.email, href: site.emailHref },
        { label: "Chat on WhatsApp", href: site.whatsappHref, external: true },
        { label: "Talk to Us", href: "#contact" },
      ],
    },
  ],
};
