import {
  Code,
  Palette,
  TrendingUp,
  Shield,
  Globe,
  Share2,
  MessageCircle,
  ShoppingCart,
  Smartphone,
  Zap,
  PenTool,
  Video,
  Megaphone,
  Search,
  Star,
  Rocket,
  Mail,
} from "lucide-react"

export const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team" },
    { value: "15+", label: "Years of Excellence" },
  ]

  export const features = [
    {
      icon: Code,
      title: "Premium Development",
      description: "Cutting-edge solutions built with latest technologies and best practices.",
    },
    {
      icon: Palette,
      title: "Sophisticated Design",
      description: "Elegant interfaces that blend aesthetics with seamless functionality.",
    },
    {
      icon: TrendingUp,
      title: "Performance Focused",
      description: "Lightning-fast delivery optimized for excellence and scalability.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Robust protection with industry-leading security standards.",
    },
  ]

  export const serviceCategories = [
    {
      category: "Google & Digital Setup",
      services: [
        { icon: Globe, name: "Google Maps Location Setup", description: "Professional local SEO setup" },
        { icon: Share2, name: "Google Business Profile", description: "Complete profile optimization" },
        { icon: TrendingUp, name: "Online Presence Boost", description: "Brand visibility enhancement" },
        { icon: MessageCircle, name: "WhatsApp Business Setup", description: "Auto-reply & catalog integration" },
      ],
    },
    {
      category: "Website Development",
      services: [
        { icon: Code, name: "Business Website", description: "Professional business presence" },
        { icon: ShoppingCart, name: "E-commerce Website", description: "Shopify & WordPress solutions" },
        { icon: Smartphone, name: "Booking Website", description: "Online reservation system" },
        { icon: Zap, name: "SEO-Ready Structure", description: "Search engine optimized" },
      ],
    },
    {
      category: "Social Media & Branding",
      services: [
        { icon: Palette, name: "Logo Design", description: "Custom brand identity" },
        { icon: Share2, name: "Social Media Setup", description: "Instagram, Facebook, TikTok, YouTube" },
        { icon: PenTool, name: "Branding Kit", description: "Complete design system" },
        { icon: Video, name: "Video Editing", description: "Reels, Shorts, Promo videos" },
      ],
    },
    {
      category: "Social Media Growth (High Demand)",
      services: [
        { icon: TrendingUp, name: "Real Followers Growth", description: "Worldwide audience expansion" },
        { icon: Star, name: "Likes Boost", description: "Real engagement increase" },
        { icon: Rocket, name: "Reel Views Boost", description: "Video visibility enhancement" },
        { icon: MessageCircle, name: "Comments Boost", description: "Real engagement from community" },
      ],
    },
    {
      category: "Online Marketing Services",
      services: [
        { icon: Megaphone, name: "Google Ads Setup", description: "Lead generation campaigns" },
        { icon: Share2, name: "Facebook/Instagram Ads", description: "Targeted advertising" },
        { icon: TrendingUp, name: "Retargeting Ads", description: "Convert warm leads" },
        { icon: Mail, name: "Email Marketing", description: "Automation & strategy" },
      ],
    },
    {
      category: "SEO & E-commerce Services",
      services: [
        { icon: Search, name: "On-page SEO", description: "Content optimization" },
        { icon: Zap, name: "Website Speed Optimization", description: "Performance tuning" },
        { icon: ShoppingCart, name: "Shopify Store Setup", description: "Complete e-commerce solution" },
        { icon: TrendingUp, name: "Local SEO Ranking", description: "Google Maps optimization" },
      ],
    },
    {
      category: "Content Creation Services",
      services: [
        { icon: Video, name: "Reels/TikTok/Shorts", description: "Viral content creation" },
        { icon: Video, name: "Promotional Videos", description: "Marketing videos" },
        { icon: PenTool, name: "Social Media Posters", description: "Eye-catching designs" },
        { icon: PenTool, name: "Creative Captions", description: "Engaging copy writing" },
      ],
    },
  ]

  export const topServices = [
    { name: "Google Business Setup", demand: "Highest" },
    { name: "Social Media Followers", demand: "Highest" },
    { name: "Website Development", demand: "Very High" },
    { name: "SEO Ranking", demand: "Very High" },
    { name: "Google Ads", demand: "Very High" },
    { name: "Logo & Branding", demand: "High" },
    { name: "Reels/TikTok Views", demand: "High" },
    { name: "WhatsApp Business Setup", demand: "High" },
  ]

  export const portfolio = [
    {
      title: "ABSMD – Business & Medical Services",
      category: "Corporate Website",
      shortDesc: "Professional corporate website for medical & business services.",
      fullDesc:
        "ABSMD is a US-based corporate website designed for medical and business services. The project focuses on trust-building UI, clear service presentation, SEO optimization, and responsive performance. The layout is structured to convert visitors into leads while maintaining a clean, healthcare-grade professional appearance. Key features include: clear service pages, contact form with lead capture, performance optimization, and mobile-first UX.",
      image: "absmd.png",
      url: "https://absmd.us",
    },
    {
      title: "Asrar Salon",
      category: "Salon & Beauty",
      shortDesc: "Luxury beauty salon website with premium branding.",
      fullDesc:
        "Asrar Salon is a high-end beauty and grooming website crafted with a luxury-first design approach. The website highlights salon services, brand identity, and customer experience with smooth animations, mobile optimization, and local SEO to attract premium clients. Features include service pages, booking CTA, gallery, and locally-optimized content.",
      image: "salon.png",
      url: "https://asrarsalon.com",
    },
    {
      title: "Hoda Shine Services",
      category: "Cleaning Services",
      shortDesc: "Service-based website focused on lead generation.",
      fullDesc:
        "Hoda Shine Services is a professional cleaning services website designed to convert visitors into customers. The site showcases offered services, pricing outline, and an easy contact flow, as well as local SEO focus to capture nearby leads. Built for speed and clear conversion funnels.",
      image: "cleaning.png",
      url: "https://hodashineservices.com",
    },
    {
      title: "Quotation Management System",
      category: "Web Application",
      shortDesc: "Dynamic system for generating business quotations.",
      fullDesc:
        "A custom-built quotation management web application that allows businesses to create, manage, and export professional quotations digitally. The system improves accuracy, speeds up proposal generation, supports PDF exports, and provides a user-friendly dashboard for tracking quotes and client communication.",
      image: "quotation.png",
      url: "https://quotation.bim.africa",
    },
    {
      title: "BIM Africa",
      category: "Corporate Platform",
      shortDesc: "Large-scale digital services platform.",
      fullDesc:
        "BIM Africa is a content-driven corporate platform offering web services, SEO-focused articles, and business solutions across markets. The site emphasizes content discoverability, optimized article structure, and performance for long-form content and service pages. Built to support growth and regional SEO.",
      image: "bim.png",
      url: "https://bim.africa",
    },
    {
      title: "Construction Management App",
      category: "Web Application",
      shortDesc: "Modern construction-focused web application.",
      fullDesc:
        "This construction web application (Next.js) highlights services, projects, and workflows for construction businesses. Emphasis is on responsiveness, performance, and clear presentation of services and case studies. Includes service pages, contact forms, and intuitive navigation for client audiences.",
      image: "construction.png",
      url: "https://construction-mu-sandy.vercel.app",
    },
    {
      title: "Mauritius Travel & Tours",
      category: "Travel Website",
      shortDesc: "Tourism website promoting travel packages.",
      fullDesc:
        "Mauritius Travel & Tours is a tourism-focused website designed to promote destinations, travel packages, and booking inquiries. It uses immersive visuals, clear package breakdowns, and SEO-optimized copy to attract international visitors. Features include package galleries, enquiry forms, and performance-optimized imagery.",
      image: "/travel.png",
      url: "https://mauritiustraveltour.com",
    },
  ]

  export const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      role: "E-commerce Founder",
      content:
        "Nuvera transformed our online store. The website is stunning, and our sales increased 300% in the first month!",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      role: "Brand Manager",
      content: "Their branding services created the perfect identity for our startup. Truly professional and creative!",
      rating: 5,
    },
    {
      name: "Hassan Ali",
      role: "Business Owner",
      content: "Google Business setup and social media growth services are exceptional. Highly recommended!",
      rating: 5,
    },
  ]

  export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  export const  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }
