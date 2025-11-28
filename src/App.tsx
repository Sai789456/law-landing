import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import banner1 from "./assets/images/banner/banner1.jpg";
import banner2 from "./assets/images/banner/banner2.jpg";
import banner3 from "./assets/images/banner/banner3.jpg";
import contact from "./assets/images/contact/contact.jpg";
import service1 from "./assets/images/service/service-1.webp";
import service2 from "./assets/images/service/service-2.webp";
import service3 from "./assets/images/service/service-3.webp";
import service4 from "./assets/images/service/service-4.webp";
import service5 from "./assets/images/service/service-5.webp";
import service6 from "./assets/images/service/service-6.webp";
import portfolio1 from "./assets/images/portfolio/portfolio-1.jpg";
import portfolio2 from "./assets/images/portfolio/portfolio-2.jpg";
import portfolio3 from "./assets/images/portfolio/portfolio-3.jpg";
import portfolio4 from "./assets/images/portfolio/portfolio-4.jpg";
import portfolio5 from "./assets/images/portfolio/portfolio-5.jpg";
import portfolio6 from "./assets/images/portfolio/portfolio-6.jpg";

declare global {
  interface Window {
    AOS: any;
  }
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  const heroSlides = [
    {
      badge: "Legal Experts",
      title: "Professional legal expertise",
      subtitle:
        "Euismod elementum nisi quis eleifend quam adipiscing vitae proin mauris augue. Scelerisque eu ultrices vitae auctor ut ornare lectus sit amet est.",
    },
    {
      badge: "Legal Experts",
      title: "Expert legal solutions for your needs",
      subtitle:
        "Trusted legal professionals providing comprehensive services to protect your rights and interests with years of experience and expertise.",
    },
    {
      badge: "Legal Experts",
      title: "Your trusted legal partner",
      subtitle:
        "Dedicated to delivering exceptional legal services with integrity, professionalism, and a commitment to achieving the best outcomes.",
    },
  ];

  const heroBannerImages = [banner1, banner2, banner3];

  const features = [
    {
      icon: "fa-scale-balanced",
      title: "Professional Service",
      text: "Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Augue mauris augue neque gravida in. Scelerisque.",
    },
    {
      icon: "fa-building-columns",
      title: "Quick & Positive Result",
      text: "Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Augue mauris augue neque gravida in. Scelerisque.",
    },
    {
      icon: "fa-gavel",
      title: "Top Legal Expert",
      text: "Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Augue mauris augue neque gravida in. Scelerisque.",
    },
  ];

  const practiceAreas = [
    { icon: "fa-heart", title: "Family Law", category: "family" },
    { icon: "fa-shield-halved", title: "Criminal Law", category: "criminal" },
    { icon: "fa-file-contract", title: "Civil Law", category: "civil" },
    {
      icon: "fa-graduation-cap",
      title: "Education Law",
      category: "education",
    },
    {
      icon: "fa-briefcase",
      title: "Cases Successions",
      category: "successions",
    },
    { icon: "fa-home", title: "Real Estate Law", category: "estate" },
  ];

  const practiceAreaImages = [
    service1,
    service2,
    service3,
    service4,
    service5,
    service6,
  ];

  const portfolioItems = [
    { category: "family", title: "Family Law Case" },
    { category: "family", title: "Family Lawyer" },
    { category: "criminal", title: "Criminal Law Case" },
    { category: "personal", title: "Personal Law Case" },
    { category: "criminal", title: "Courtroom Case" },
    { category: "personal", title: "Consultation Case" },
  ];

  const categoryPdfMap: Record<string, string> = {
    family: "pdfs/family.pdf",
    criminal: "pdfs/criminal.pdf",
    personal: "pdfs/personal.pdf",
  };

  const portfolioImages: string[] = [
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
    portfolio6,
  ];

  const testimonials = [
    {
      name: "Patrick Wilson",
      role: "CEO, TechCorp",
      text: "There are many variations of passages of Lorem Ipsum but the humour, or randomised words which don't looki are going to use a passage Lorem ipsum dolor sit conse pisicing elit sed do eiusmod",
    },
    {
      name: "Alex Smith",
      role: "Founder, StartUp",
      text: "There are many variations of passages of Lorem Ipsum but the humour, or randomised words which don't looki are going to use a passage Lorem ipsum dolor sit conse pisicing elit sed do eiusmod",
    },
    {
      name: "Sarah Jones",
      role: "Director, LegalAid",
      text: "Excellent service! The team was very professional and helped me win my case. I highly recommend them to anyone in need of legal assistance.",
    },
    {
      name: "Michael Brown",
      role: "Manager, Business Inc.",
      text: "I was very impressed with the level of expertise and dedication shown by the lawyers. They went above and beyond to ensure a positive outcome.",
    },
    {
      name: "Emily Davis",
      role: "Entrepreneur",
      text: "Professional, knowledgeable, and compassionate. They guided me through a difficult legal process with ease and confidence.",
    },
    {
      name: "David Wilson",
      role: "Consultant",
      text: "Top-notch legal representation. They were always available to answer my questions and kept me informed throughout the entire process.",
    },
  ];

  const testimonialPages = Math.ceil(testimonials.length / 2);

  const blogPosts = [
    { title: "Duis Aute Irure Dolor In Reprehenderit", date: null },
    { title: "What Lawyer Can Do For You?", date: "June 16, 2022" },
    { title: "Justice May For You If You Are Innocent", date: null },
    { title: "Who Can A Victim Sue After A Car Accident?", date: null },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialPages);
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonialPages]);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target as HTMLDivElement;
            const width = bar.getAttribute("data-width");
            if (width) {
              bar.style.width = width + "%";
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    progressBarsRef.current.forEach((bar) => {
      if (bar) observer.observe(bar);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // AOS INIT (using CDN)
  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
        offset: 120,
      });
    }
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    offset: number = 100
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handlePortfolioFilter = (filter: string) => {
    setPortfolioLoading(true);
    setActiveFilter(filter);
    setTimeout(() => {
      setPortfolioLoading(false);
    }, 500);
  };

  const handlePortfolioClick = (item: { category: string; title: string }) => {
    const pdfPath = categoryPdfMap[item.category];
    if (pdfPath) {
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = `${item.category}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn("No PDF mapped for category:", item.category);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    offset: number = 100
  ) => {
    handleSmoothScroll(e, targetId, offset);
    setIsMobileNavOpen(false);
  };

  // ========== SECTION FUNCTIONS ==========

  const renderHeader = () => (
    <header className="bg-bg-dark sticky top-0 z-50 border-b border-[#262626]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 text-lg md:text-xl font-semibold text-primary">
            <div className="w-9 h-9 rounded-full border border-primary flex items-center justify-center text-base">
              <i className="fa-solid fa-pen"></i>
            </div>
            <span>Respet</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "home")}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Home
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary"></span>
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Services
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, "skills", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Skills
            </a>
            <a
              href="#resume"
              onClick={(e) => handleNavClick(e, "resume", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Resume
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, "portfolio", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Portfolio
            </a>
            <a
              href="#testimonial"
              onClick={(e) => handleNavClick(e, "testimonial", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Testimonial
            </a>
            <a
              href="#blog"
              onClick={(e) => handleNavClick(e, "blog", -50)}
              className="text-xs md:text-sm font-medium text-white hover:text-white relative pb-1"
            >
              Blog
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact", -50)}
              className="bg-gold text-white px-5 py-2.5 rounded-md text-xs md:text-sm font-medium hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Let&apos;s Talk
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
  type="button"
  className="inline-flex lg:hidden items-center justify-center w-9 h-9 
             rounded-md border border-white/20 text-white 
             bg-bg-dark hover:bg-white/5 transition"
  onClick={() => setIsMobileNavOpen((prev) => !prev)}
  aria-label="Toggle navigation"
>
  {isMobileNavOpen ? (
    <i className="fa-solid fa-xmark text-lg"></i>
  ) : (
    <i className="fa-solid fa-bars text-lg"></i>
  )}
</button>

        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
            isMobileNavOpen ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-2 pb-4 pt-1 border-t border-white/10">
            {[
              { label: "Home", id: "home", offset: 100 },
              { label: "About", id: "about", offset: -50 },
              { label: "Services", id: "services", offset: -50 },
              { label: "Skills", id: "skills", offset: -50 },
              { label: "Resume", id: "resume", offset: -50 },
              { label: "Portfolio", id: "portfolio", offset: -50 },
              { label: "Testimonial", id: "testimonial", offset: -50 },
              { label: "Blog", id: "blog", offset: -50 },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id, link.offset)}
                className="text-sm font-medium text-text-muted hover:text-white py-1.5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact", -50)}
              className="mt-2 bg-gold text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg w-full text-center"
            >
              Let&apos;s Talk
            </a>
          </nav>
        </div>
      </div>
    </header>
  );

  const renderContactBar = () => (
    <div className="bg-white border-b border-gray-200 py-2">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3">
          {/* LEFT COLUMN: Contact Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gold font-medium">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-gold text-xs"></i>
              +032 (456)586 876
            </span>

            <span className="hidden sm:inline text-gray-300">|</span>

            <span className="flex items-center gap-2">
              <i className="fa-regular fa-envelope text-gold text-xs"></i>
              info.me@gmail.com
            </span>

            <span className="hidden lg:inline text-gray-300">|</span>

            <span className="hidden lg:flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-gold text-xs"></i>
              New Delhi Assembly
            </span>
          </div>

          {/* RIGHT COLUMN: Social Icons */}
          <div className="flex sm:justify-end justify-start items-center gap-3">
            <a
              href="#"
              className="text-gold text-base hover:text-gold transition w-6 h-6 flex items-center justify-center"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gold text-base hover:text-gold transition w-6 h-6 flex items-center justify-center"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gold text-base hover:text-gold transition w-6 h-6 flex items-center justify-center"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="#"
              className="text-gold text-base hover:text-gold transition w-6 h-6 flex items-center justify-center"
            >
              <i className="fa-brands fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHeroSection = () => (
    <section
      id="home"
      data-aos="fade-up"
      className="relative w-full overflow-visible bg-white mb-0 pb-0"
    >
      <div className="relative w-full h-full overflow-visible min-h-[600px] md:min-h-[800px]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${
                heroBannerImages[index] || heroBannerImages[0]
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "4rem 0 10rem 0",
              minHeight: "600px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-transparent z-[1]"></div>
            <div
              className="hidden md:block absolute bottom-0 left-0 right-0 w-full h-[150px] bg-gradient-to-t from-white/40 via-white/20 to-transparent z-[2] pointer-events-none"
              style={{
                clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>

            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-[3] grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="uppercase tracking-widest text-xs md:text-sm text-white mb-4 flex items-center justify-center lg:justify-start gap-3 font-semibold font-poppins drop-shadow-[0_1px_5px_rgba(0,0,0,0.3)]">
                  <span className="hidden md:block w-11 h-0.5 bg-gold-light"></span>
                  {slide.badge}
                  <span className="hidden md:block w-11 h-0.5 bg-gold-light"></span>
                </div>
                <h1 className="text-[2.3rem] md:text-[3.5rem] leading-tight mb-5 text-white font-bold font-playfair drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-white text-sm md:text-base max-w-[32rem] mx-auto lg:mx-0 mb-8 opacity-95 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
                  {slide.subtitle}
                </p>
              </div>
              <div className="relative hidden lg:flex min-h-[400px] w-full items-center justify-center bg-transparent">
                <div className="absolute right-[60%] top-[60%] w-[60px] h-[60px] rounded-full bg-gold-light border-2 border-white/30 flex items-center justify-center cursor-pointer shadow-[0_0_0_15px_rgba(191,163,124,0.2),0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 z-[15] text-white font-bold text-xs tracking-widest hover:scale-110 hover:shadow-[0_0_0_18px_rgba(191,163,124,0.3),0_6px_20px_rgba(0,0,0,0.4)] hover:bg-gold-dark">
                  PLAY
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Navigation – hide on small screens */}
      <div className="hidden xl:flex absolute right-[225px] top-[39%] -translate-y-1/2 flex-col gap-0 z-[15] items-center">
        <div className="absolute left-1/2 -top-[60px] -translate-x-1/2 w-[1.5px] h-[60px] bg-gold z-[1] pointer-events-none"></div>
        <div className="absolute left-1/2 -bottom-[60px] -translate-x-1/2 w-[1.5px] h-[60px] bg-gold z-[1] pointer-events-none"></div>
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
            )
          }
          className="w-[30px] h-[30px] border-none text-white cursor-pointer flex items-center justify-center text-base transition-all duration-300 relative rounded-t-md z-[2] m-0 bg-gold shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:bg-gold hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
          }
          className="w-[30px] h-[30px] border-none text-white cursor-pointer flex items-center justify-center text-base transition-all duration-300 relative rounded-b-md z-[2] m-0 bg-gold shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:bg-gold-dark hover:translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Feature Cards */}
      <div className="p-0 -mt-[120px] md:-mt-[200px] relative z-[15] bg-transparent pb-10 md:pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-[950px] relative z-[16] p-0 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 max-w-[950px] mx-auto relative z-[16] p-0 w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`p-8 md:p-12 rounded-none transition-all duration-300 text-center flex flex-col items-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] ${
                  index === activeFeature
                    ? "bg-gold shadow-[0_6px_25px_rgba(0,0,0,0.2)] opacity-100"
                    : "bg-gold opacity-70 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(181,154,109,0.4)] hover:bg-[#c4a876]"
                }`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/90 bg-white/10 flex items-center justify-center text-[1.7rem] md:text-[2rem] mb-6 text-white/95">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-white/95">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderAboutSection = () => (
    <section id="about" data-aos="fade-up" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-12 items-center w-full">
          <div className="relative rounded-2xl overflow-visible mb-6 lg:mb-0">
            <div
              className="hidden sm:flex absolute -left-[35px] top-1/2 -translate-y-1/2 w-[35px] h-[220px] md:h-[300px] bg-gold items-center justify-center z-10 rounded-tl-lg rounded-bl-lg"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <span className="text-white text-xs md:text-sm font-semibold tracking-widest rotate-180 whitespace-nowrap">
                +91234561890
              </span>
            </div>
            <img
              src={contact}
              alt="About Us"
              className="w-full h-[320px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target) target.src = contact;
              }}
            />
            <div className="absolute bottom-5 right-5 bg-white p-4 md:p-6 rounded-lg flex items-center gap-4 z-[5] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <div className="flex flex-col gap-1 text-gold text-lg md:text-xl">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <div>
                <div className="text-[1.5rem] md:text-[2rem] font-bold text-text-dark leading-none">
                  2023+
                </div>
                <div className="text-xs md:text-sm text-text-dark mt-1">
                  Success Case
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="uppercase tracking-widest text-xs text-gold-light mb-3 inline-flex items-center gap-3 font-semibold font-poppins">
              <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
              About Us
              <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
            </div>
            <h2 className="text-[1.9rem] md:text-[2rem] leading-tight mb-4 text-text-dark font-bold font-playfair">
              Best solutions for legal problems
            </h2>
            <p className="text-gray-600 text-sm md:text-[0.95rem] leading-relaxed mb-6">
              Euismod elementum nisi quis eleifend quam adipiscing vitae proin
              mauris augue. Scelerisque eu ultrices vitae auctor ut ornare
              lectus sit amet est. Placerat vestibulum lectus mauris ultrices
              eros in cursus turpis massa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 my-6 md:my-8">
              <div>
                <h4 className="text-base md:text-lg mb-2 text-text-dark">
                  Legal Advice
                </h4>
                <p className="text-xs md:text-sm text-gray-600">
                  Euismod elementum nisi quis eleifend quam adipiscing vitae
                  proin mauris augue.
                </p>
              </div>
              <div>
                <h4 className="text-base md:text-lg mb-2 text-text-dark">
                  Our Mission
                </h4>
                <p className="text-xs md:text-sm text-gray-600">
                  Euismod elementum nisi quis eleifend quam adipiscing vitae
                  proin mauris augue.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-6 md:mt-8">
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden">
                <img
                  src={contact}
                  alt="Zoben Carloas"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = contact;
                  }}
                />
              </div>
              <div>
                <div className="font-semibold text-text-dark text-sm md:text-base">
                  Zoben Carloas
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Chairman, Lawride
                </div>
              </div>
              <button
                className="
      bg-gold text-white px-4 md:px-6 py-3 md:py-4 rounded-md 
      text-xs md:text-sm font-medium hover:bg-primary-dark 
      transition-all duration-300 shadow-md hover:shadow-lg 
      hover:-translate-y-0.5 flex items-center gap-2 
      md:ml-auto  /* ← only on medium screens and up */
      border-none"
              >
                Explore more
                <i className="fa-solid fa-arrow-right-long text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderServicesSection = () => (
    <section
      id="services"
      data-aos="fade-up"
      className="practice-section py-16 md:py-20"
    >
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="section-header text-center mb-10 md:mb-14">
          <div className="section-badge">Services</div>
          <h2 className="section-title text-xl md:text-2xl lg:text-[2.1rem]">
            We are here to fight against any violance with experience
          </h2>
        </div>
        <div className="practice-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {practiceAreas.map((area, index) => (
            <div
              key={index}
              className="practice-card"
              style={
                {
                  "--bg-image": `url(${practiceAreaImages[index]})`,
                } as React.CSSProperties
              }
            >
              <div className="practice-content-default">
                <div className="practice-icon">
                  <i className={`fa-solid ${area.icon}`}></i>
                </div>
                <h3>{area.title}</h3>
                <p>
                  Euismod elementum nisi quis eleifend quam adipiscing vitae
                  proin mauris augue.
                </p>
              </div>
              <div className="practice-content-hover">
                <h3>{area.title}</h3>
                <p>
                  Euismod elementum nisi quis eleifend quam adipiscing vitae
                  proin mauris augue.
                </p>
                {area.category === "criminal" ? (
                  <button className="btn-practice-criminal-explore">
                    Explore More{" "}
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                ) : area.category === "family" ? (
                  <button className="btn-practice-family-learn">
                    Learn More <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                ) : area.category === "civil" ? (
                  <button className="btn-practice-civil-learn">
                    Learn More <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                ) : area.category === "education" ? (
                  <button className="btn-practice-education-learn">
                    Learn More <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                ) : area.category === "successions" ? (
                  <button className="btn-practice-successions-learn">
                    Learn More <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                ) : (
                  <button className="btn-practice-estate-learn">
                    Learn More <i className="fa-solid fa-arrow-right-long"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderSkillsSection = () => (
    <section id="skills" data-aos="fade-up" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center w-full">
          <div className="lg:pr-8">
            <div className="uppercase tracking-widest text-xs text-gold-light mb-3 inline-flex items-center gap-3 font-semibold font-poppins">
              <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
              Law and Experience
              <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
            </div>
            <h2 className="text-[2rem] md:text-[2.5rem] leading-tight mb-4 text-text-dark font-bold font-playfair">
              Law cases we handle.
            </h2>
            <p className="text-gray-600 text-sm md:text-[0.95rem] leading-relaxed mb-6">
              Euismod elementum nisi quis eleifend quam adipiscing vitae proin
              mauris augue. Scelerisque eu ultrices vitae auctor ut ornare
              lectus sit amet est.
            </p>
            <div className="my-8 md:my-10">
              {[
                { label: "Family Lawyer", percent: 95 },
                { label: "Personal Lawyer", percent: 80 },
                { label: "Criminal Lawyer", percent: 98 },
                { label: "Corporate Lawyer", percent: 90 },
              ].map((item, index) => (
                <div key={index} className="mb-8 md:mb-10 last:mb-0">
                  <div className="flex justify-between items-center mb-3 text-[0.9rem] md:text-[0.95rem] font-semibold text-text-dark">
                    <span>{item.label}</span>
                    <span className="text-xs md:text-sm font-medium text-gray-600">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      ref={(el) => {
                        if (el) progressBarsRef.current[index] = el;
                      }}
                      data-width={item.percent}
                      className="h-full bg-gold rounded-full transition-all duration-[1200ms] ease-out"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-gold text-white px-5 md:px-6 py-3 md:py-4 rounded-md text-xs md:text-sm font-medium hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 mt-4 border-none">
              Contact Now{" "}
              <i className="fa-solid fa-arrow-right-long text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
            </button>
          </div>
          <div className="relative rounded-[10px] overflow-visible mt-8 lg:mt-0">
            <img
              src={contact}
              alt="Statistics"
              className="w-full h-[320px] sm:h-[400px] md:h-[500px] object-cover rounded-[10px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = contact;
              }}
            />
            <div className="absolute bottom-[20px] md:bottom-[30px] right-[20px] md:right-[30px] bg-white p-4 md:p-6 px-6 md:px-7 rounded-lg flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-[2]">
              <div className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full border-2 border-gold flex items-center justify-center text-xl md:text-2xl text-gold bg-gold/10 flex-shrink-0">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <div className="flex flex-col">
                <div className="text-[1.6rem] md:text-[2rem] font-bold text-text-dark leading-tight">
                  2500+
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-medium mt-1">
                  Case Face
                </div>
              </div>
            </div>
            <div
              className="hidden md:block absolute -right-[35px] top-1/2 -translate-y-1/2 w-[35px] h-[300px] bg-gold rounded-tr-lg rounded-br-lg"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <div className="text-white font-semibold text-xs tracking-widest py-6 flex items-center justify-center">
                +91234561890
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderResumeSection = () => (
    <section
      id="resume"
      data-aos="fade-up"
      className="py-16 md:py-[5.5rem] bg-bg-section"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-8 md:mb-10">
          <div className="uppercase tracking-widest text-xs text-gold-light mb-3 inline-flex items-center gap-3 font-semibold font-poppins">
            <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
            My Resume
            <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
          </div>
          <h2 className="text-[2rem] md:text-[2.5rem] leading-tight mb-0 text-text-dark font-bold font-playfair">
            My career presentation study & knowledge
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start mt-5 relative">
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gold rounded-full z-[1] pointer-events-none shadow-[0_0_2px_rgba(181,154,109,0.3)]"></div>

          <div className="relative">
            <h3 className="text-xl md:text-2xl mb-4 md:mb-6 text-text-dark font-bold leading-tight">
              Experiences
            </h3>
            <div className="relative">
              {[
                {
                  period: "2014 - Now",
                  title: "Director of Kyros & Co",
                  company: "Kyros & Co Law Firm",
                  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis vero officia enim impedit voluptatem dignissimos, ratione est alias rerum aperiam.",
                },
                {
                  period: "2010 - 2014",
                  title: "Senior Lawyer",
                  company: "Morgan Law Firm",
                  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis vero officia enim impedit voluptatem dignissimos, ratione est alias rerum aperiam.",
                },
                {
                  period: "2008 - 2010",
                  title: "Junior Lawyer",
                  company: "Smith Law Firm",
                  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis vero officia enim impedit voluptatem dignissimos, ratione est alias rerum aperiam.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative mb-8 md:mb-10 last:mb-0 z-[3] w-full"
                >
                  <div className="hidden md:block absolute top-[11px] -right-[1.75rem] w-3 h-3 rounded-full bg-gold border-[3px] border-bg-section z-[4] translate-x-1/2 shadow-[0_0_2px_rgba(181,154,109,0.2)]"></div>
                  <div className="block w-full max-w-full bg-gold text-white py-2 px-4 text-xs font-semibold relative mb-0 mt-0 text-left box-border md:pr-[calc(1rem+12px)]">
                    {item.period}
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-solid border-t-[6px] border-b-[6px] border-l-[12px] border-t-transparent border-b-transparent border-l-gold"></div>
                  </div>
                  <div className="bg-white py-4 md:py-5 px-4 md:px-6 border border-black/5 w-full mt-0">
                    <h4 className="text-[1rem] md:text-[1.05rem] mb-1.5 text-text-dark font-bold leading-tight">
                      {item.title}
                    </h4>
                    <div className="text-xs md:text-sm text-gray-600 font-medium mb-3 leading-snug">
                      {item.company}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <h3 className="text-xl md:text-2xl mb-4 md:mb-6 text-text-dark font-bold leading-tight">
              Education
            </h3>
            <p className="text-xs md:text-[0.95rem] text-gray-600 leading-relaxed mb-4 md:mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tempor perferendis vero officia enim impedit voluptatem
              dignissimos, veniamki ratione est alias rerum aperiam, nam
            </p>
            <div className="relative">
              {[
                {
                  period: "2008 - 2010",
                  title: "Master in Law",
                  company: "New York University",
                  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis vero officia enim impedit voluptatem dignissimos, ratione est alias rerum aperiam.",
                },
                {
                  period: "2006 - 2008",
                  title: "Bachelor of Law",
                  company: "University of London",
                  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis vero officia enim impedit voluptatem dignissimos, ratione est alias rerum aperiam.",
                },
                {
                  period: "2004 - 2006",
                  title: "Law of College",
                  company: "University of Sydney",
                  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis vero officio enim impedit voluptatem dignissimos, ratione est alias rerum aperiam.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative mb-8 md:mb-10 last:mb-0 z-[3] w-full"
                >
                  <div className="hidden md:block absolute top-[11px] -left-[1.75rem] w-3 h-3 rounded-full bg-gold border-[3px] border-bg-section z-[4] -translate-x-1/2 shadow-[0_0_2px_rgba(181,154,109,0.2)]"></div>
                  <div className="block w-full max-w-full bg-gold text-white py-2 px-4 text-xs font-semibold relative mb-0 mt-0 text-left box-border md:pl-[calc(1rem+12px)]">
                    {item.period}
                    <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-solid border-t-[6px] border-b-[6px] border-r-[12px] border-t-transparent border-b-transparent border-r-gold"></div>
                  </div>
                  <div className="bg-white py-4 md:py-5 px-4 md:px-6 border border-black/5 w-full mt-0">
                    <h4 className="text-[1rem] md:text-[1.05rem] mb-1.5 text-text-dark font-bold leading-tight">
                      {item.title}
                    </h4>
                    <div className="text-xs md:text-sm text-gray-600 font-medium mb-3 leading-snug">
                      {item.company}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPortfolioSection = () => (
    <section
      id="portfolio"
      data-aos="fade-up"
      className="py-16 md:py-20 bg-white"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-8 md:mb-10">
          <div className="uppercase tracking-widest text-xs text-gold-light mb-3 inline-flex items-center gap-3 font-semibold font-poppins">
            <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
            Discover The Best Works
            <span className="hidden sm:block w-10 h-0.5 bg-gold-light"></span>
          </div>
          <h2 className="text-[2rem] md:text-[2.5rem] leading-tight mb-0 text-text-dark font-bold font-playfair">
            Check our portfolio which Is built with our experience
          </h2>
        </div>
        <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-12 flex-wrap">
          {["all", "family", "criminal", "personal"].map((filter) => (
            <button
              key={filter}
              onClick={() => handlePortfolioFilter(filter)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-medium transition-all duration-300 font-poppins ${
                activeFilter === filter
                  ? "bg-gold text-white border-none"
                  : "bg-white border border-gold text-gold hover:bg-gold hover:text-white hover:border-none"
              }`}
            >
              {filter === "all"
                ? "All Cases"
                : filter === "family"
                ? "Family Law"
                : filter === "criminal"
                ? "Criminal Law"
                : "Personal Law"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[22px] max-w-[1100px] mx-auto w-full relative">
          {portfolioLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-md">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gold font-semibold text-xs md:text-sm">
                  Loading...
                </p>
              </div>
            </div>
          )}
          {portfolioItems
            .filter(
              (item) => activeFilter === "all" || item.category === activeFilter
            )
            .map((item, index) => {
              const originalIndex = portfolioItems.indexOf(item);
              return (
                <div
                  key={index}
                  className="relative rounded-md overflow-hidden aspect-square transition-all duration-300 cursor-pointer border border-black/8 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(181,154,109,0.2)] hover:border-[3px] hover:border-white"
                  onClick={() => handlePortfolioClick(item)}
                >
                  <img
                    src={portfolioImages[originalIndex]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = contact;
                    }}
                  />
                  <div className="absolute inset-0 bg-[rgba(181,154,109,0.35)] flex flex-col items-center justify-center p-4 md:p-6 transition-opacity duration-300 z-[2] backdrop-sepia-[20%] opacity-0 hover:opacity-100">
                    <h4 className="text-white text-base md:text-lg font-medium mb-1 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-center">
                      {item.title}
                    </h4>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );

  const renderTestimonialSection = () => (
    <section
      id="testimonial"
      data-aos="fade-up"
      className="py-16 md:py-20 bg-bg-section"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-3 md:mb-4">
            <span className="text-gold text-xs md:text-sm font-normal uppercase tracking-widest">
              Testimonial
            </span>
          </div>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-dark text-center mb-0 font-playfair">
            Words from my clients
          </h2>
        </div>
        <div className="max-w-[1000px] mx-auto relative mb-10 md:mb-12">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {Array.from({ length: testimonialPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full flex-shrink-0"
                >
                  {testimonials
                    .slice(pageIndex * 2, pageIndex * 2 + 2)
                    .map((testimonial, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="bg-white p-6 md:p-10 px-5 md:px-8 rounded-lg relative border border-[#d4a574] flex flex-col min-h-[240px] md:min-h-[280px] w-full mb-6 md:mb-8">
                          <div className="text-[4rem] md:text-[5rem] text-[#d0d0d0] leading-none mb-0 font-serif font-light -mt-1 md:-mt-2">
                            "
                          </div>
                          <p className="text-[0.9rem] md:text-[0.95rem] text-gray-800 leading-relaxed mb-4 md:mb-6 font-poppins flex-grow pl-0 -mt-4 md:-mt-6">
                            {testimonial.text}
                          </p>
                          <div className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[11px] border-r-[11px] border-t-[11px] border-l-transparent border-r-transparent border-t-[#d4a574] z-[1]">
                            <div className="absolute bottom-[1px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white z-[2]"></div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 md:gap-3 mt-0">
                          <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full overflow-hidden border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                            <img
                              src={contact}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = contact;
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-text-dark text-sm md:text-base mb-1">
                              {testimonial.name}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 font-normal">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* navigation buttons + dots */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-10">
            <button
              onClick={() =>
                setActiveTestimonial(
                  (prev) => (prev - 1 + testimonialPages) % testimonialPages
                )
              }
              className="bg-transparent border border-[#d4a574] text-primary w-[32px] h-[32px] md:w-[35px] md:h-[35px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-xs md:text-sm hover:bg-primary hover:text-white hover:border-primary"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="flex justify-center gap-2 items-center">
              {Array.from({ length: testimonialPages }).map((_, dot) => (
                <span
                  key={dot}
                  className="w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor:
                      dot === activeTestimonial ? "#c89b3c" : "transparent",
                    border: "1px solid",
                    borderColor:
                      dot === activeTestimonial ? "#c89b3c" : "#d0d0d0",
                    display: "inline-block",
                    minWidth: "10px",
                    minHeight: "10px",
                  }}
                  onClick={() => setActiveTestimonial(dot)}
                ></span>
              ))}
            </div>
            <button
              onClick={() =>
                setActiveTestimonial((prev) => (prev + 1) % testimonialPages)
              }
              className="bg-transparent border border-[#d4a574] text-primary w-[32px] h-[32px] md:w-[35px] md:h-[35px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-xs md:text-sm hover:bg-primary hover:text-white hover:border-primary"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderContactSection = () => (
    <section
      id="contact"
      data-aos="fade-up"
      className="py-16 md:py-20 bg-white"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
            <span className="text-gold text-xs md:text-sm font-normal uppercase tracking-widest">
              Contact
            </span>
          </div>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-text-dark text-center mb-0 font-playfair">
            Get In Touch With Us
          </h2>
        </div>
        <div className="w-full bg-white flex flex-col lg:flex-row relative overflow-hidden min-h-[400px] md:min-h-[500px] shadow-[0_15px_40px_rgba(0,0,0,0.05)] mx-auto rounded-sm">
          <div className="w-full lg:w-1/2 py-8 md:py-[50px] px-5 md:px-[50px] pt-[40px] md:pl-[45px] lg:-ml-5 z-10">
            <div className="text-gold-light font-bold text-xs md:text-sm mb-2.5 flex items-center">
              Get In Touch
              <span className="hidden sm:block w-[30px] h-0.5 bg-gold-light ml-2.5"></span>
            </div>
            <h1 className="font-playfair text-2xl md:text-4xl text-[#111] mb-2.5 font-bold">
              Interested in discussing?
            </h1>
            <p className="text-[#777] text-xs md:text-sm mb-6 md:mb-8 leading-normal">
              24/7 We&apos;re ready to help our dedicated customers for any
              Suports
            </p>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted!");
              }}
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-4 md:mb-5">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full py-3 md:py-3.5 px-3 md:px-4 border border-gray-200 rounded text-[12px] md:text-[13px] font-poppins text-gray-800 outline-none bg-white transition-all duration-300 focus:border-gold-light box-border"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full py-3 md:py-3.5 px-3 md:px-4 border border-gray-200 rounded text-[12px] md:text-[13px] font-poppins text-gray-800 outline-none bg-white transition-all duration-300 focus:border-gold-light box-border"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-4 md:mb-5">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full py-3 md:py-3.5 px-3 md:px-4 border border-gray-200 rounded text-[12px] md:text-[13px] font-poppins text-gray-800 outline-none bg-white transition-all duration-300 focus:border-gold-light box-border"
                  />
                </div>
                <div className="flex-1 relative">
                  <select
                    className="w-full py-3 md:py-3.5 px-3 md:px-4 border border-gray-200 rounded text-[12px] md:text-[13px] font-poppins text-gray-800 outline-none bg-white transition-all duration-300 focus:border-gold-light box-border appearance-none cursor-pointer pr-8 md:pr-10"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Family Law
                    </option>
                    <option value="criminal">Criminal Law</option>
                    <option value="business">Business Law</option>
                    <option value="civil">Civil Law</option>
                  </select>
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-[55%] text-sm md:text-base text-gray-400 pointer-events-none font-bold">
                    +
                  </div>
                </div>
              </div>
              <textarea
                placeholder="Your Message"
                className="h-[90px] md:h-[100px] resize-none mb-4 md:mb-5 w-full block py-3 md:py-3.5 px-3 md:px-4 border border-gray-200 rounded text-[12px] md:text-[13px] font-poppins text-gray-800 outline-none bg-white transition-all duration-300 focus:border-gold-light box-border"
              ></textarea>
              <button
                type="submit"
                className="bg-gold-light text-white border-none py-3 md:py-3.5 px-7 md:px-9 text-[12px] md:text-[13px] rounded cursor-pointer font-medium transition-all duration-300 font-poppins hover:bg-gold-dark"
              >
                Send Message &nbsp; →
              </button>
            </form>
          </div>
          {/* Right image area – hide on small screens */}
          <div
            className="hidden lg:block absolute top-0 right-0 h-full w-[58%] transform skew-x-[10deg] translate-x-[30px] origin-top-right overflow-hidden -mr-20 z-[1]"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 0, 0, 0.1), transparent)",
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[15px] z-[3] shadow-[4px_0_20px_rgba(191,163,124,0.6),inset_-2px_0_10px_rgba(212,184,148,0.3)]"
              style={{
                background:
                  "linear-gradient(180deg, #d4b894 0%, #bfa37c 50%, #a38863 100%)",
              }}
            ></div>
            <div
              className="absolute -left-[50px] top-[25px] bottom-[25px] w-10 z-[2] rounded-r-[60px] shadow-[4px_0_18px_rgba(191,163,124,0.4)] pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(212, 184, 148, 0.85) 0%, rgba(191, 163, 124, 0.85) 50%, rgba(163, 136, 99, 0.85) 100%)",
                clipPath: "ellipse(100% 85% at 0% 50%)",
              }}
            ></div>
            <img
              src={contact}
              className="w-[150%] h-full object-cover transform -skew-x-[10deg] -translate-x-[30px] origin-top-right"
              style={{
                filter: "brightness(1.02) contrast(1.05) saturate(1.1)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = contact;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderBlogSection = () => (
    <section
      id="blog"
      data-aos="fade-up"
      className="py-16 md:py-20 bg-bg-section"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-3 md:mb-4">
            <span className="hidden sm:block w-10 h-px bg-gold-light"></span>
            <span className="text-gold-light text-xs font-semibold uppercase tracking-widest">
              Discover The Best Works
            </span>
            <span className="hidden sm:block w-10 h-px bg-gold-light"></span>
          </div>
        </div>
        <h2 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-text-dark m-0 leading-tight text-center mb-8 md:mb-10">
          Learn something more from my latest news
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-[#e8e8e8] rounded-[10px] overflow-hidden flex flex-col sm:flex-row shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300 min-h-[200px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
            >
              <div className="w-full sm:w-[220px] min-w-[220px] h-[180px] sm:h-[200px] overflow-hidden relative flex-shrink-0">
                <img
                  src={practiceAreaImages[index % practiceAreaImages.length]}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = contact;
                  }}
                />
                {post.date && (
                  <div className="absolute top-[10px] left-[10px] md:top-[15px] md:left-[15px] bg-gold-light text-white py-1.5 md:py-2 px-3 md:px-4 rounded-md text-[10px] md:text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.2)] z-[2] tracking-wider">
                    {post.date}
                  </div>
                )}
              </div>
              <div className="py-5 md:py-7 px-5 md:px-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base md:text-lg mb-4 md:mb-5 text-text-dark font-bold leading-normal font-poppins mt-1 md:mt-2">
                    {post.title}
                  </h3>
                </div>
                <button className="bg-gold-light text-white border-none py-2.5 md:py-3 px-5 md:px-6 text-xs md:text-sm font-semibold rounded-md cursor-pointer transition-all duration-300 font-poppins self-start mt-auto shadow-[0_2px_6px_rgba(191,163,124,0.3)] hover:bg-gold-dark">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-bg-dark text-white pt-12 md:pt-16">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10">
          {/* ===== Left Column: Logo + Social + Text ===== */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 text-lg md:text-xl font-semibold text-gold-light mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gold-light flex items-center justify-center text-sm md:text-base text-gold-light">
                <i className="fa-solid fa-pen"></i>
              </div>
              <span>Respet</span>
            </div>
  
            {/* Icons + Text (Option 1) */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              {/* Social Icons */}
              <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-md flex items-center justify-center text-white no-underline transition-all duration-300 bg-gold-light hover:opacity-80 hover:-translate-y-0.5"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-md flex items-center justify-center no-underline transition-all duration-300 bg-gold-light text-white hover:opacity-80 hover:-translate-y-0.5"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-md flex items-center justify-center no-underline transition-all duration-300 bg-gold-light text-white hover:opacity-80 hover:-translate-y-0.5"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
  
              {/* Paragraph below icons on mobile, beside on md+ */}
              <p className="text-xs md:text-sm leading-relaxed text-white m-0 flex-1">
                Porme and Consulting is optimiz standing manufactured product
                and installation synergy. predo why professional business and
                porme and Consulting is optimi
              </p>
            </div>
          </div>
  
          {/* ===== Contact Info ===== */}
          <div>
            <h4 className="text-base md:text-lg mb-4 md:mb-5 text-white font-bold font-poppins">
              Contact Info
            </h4>
            <p className="text-xs md:text-sm mb-4 md:mb-6 leading-relaxed text-white">
              121 King Street Melbourne, 3000, Australia
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full py-2.5 md:py-3 px-3 md:px-4 border border-white/30 bg-black/30 rounded text-xs md:text-sm text-white font-poppins box-border placeholder:text-gray-400"
              />
              <button className="bg-gold-light text-white border-none py-2.5 md:py-3 px-4 md:px-6 text-xs md:text-sm font-semibold rounded cursor-pointer transition-all duration-300 font-poppins w-full box-border hover:bg-gold-dark">
                Subscribe
              </button>
            </div>
          </div>
  
          {/* ===== Click & Read ===== */}
          <div>
            <h4 className="text-base md:text-lg mb-4 md:mb-5 text-white font-bold font-poppins">
              Click &amp; Read
            </h4>
            <ul className="list-none p-0 m-0">
              {["Home", "About", "Pricing", "Blog", "Contact"].map((link) => (
                <li key={link} className="mb-2.5 md:mb-3.5">
                  <a
                    href="#"
                    className="text-xs md:text-sm text-white no-underline transition-colors duration-300 inline-flex items-center gap-2 hover:text-gold-light"
                  >
                    <span className="text-gray-400 text-[10px] md:text-xs mr-1">
                      {">"}
                    </span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* ===== Practice Area ===== */}
          <div>
            <h4 className="text-base md:text-lg mb-4 md:mb-5 text-white font-bold font-poppins">
              Practice Area
            </h4>
            <ul className="list-none p-0 m-0">
              {[
                "Family Law",
                "Criminal Law",
                "Personal Injury",
                "Real Estate Law",
                "Business Low",
              ].map((link) => (
                <li key={link} className="mb-2.5 md:mb-3.5">
                  <a
                    href="#"
                    className="text-xs md:text-sm text-white no-underline transition-colors duration-300 inline-flex items-center gap-2 hover:text-gold-light"
                  >
                    <span className="text-gray-400 text-[10px] md:text-xs mr-1">
                      {">"}
                    </span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      {/* Bottom bar */}
      <div className="bg-bg-dark py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="w-full h-px bg-white/20 mb-5 md:mb-8"></div>
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2.5 text-gold-light font-semibold text-lg md:text-xl">
              <i className="fa-solid fa-pen text-sm md:text-base"></i>
              <span>Respet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  

  // ========== MAIN RENDER ==========

  return (
    <div className="min-h-screen bg-white">
      {renderHeader()}
      {renderContactBar()}
      {renderHeroSection()}
      {renderAboutSection()}
      {renderServicesSection()}
      {renderSkillsSection()}
      {renderResumeSection()}
      {renderPortfolioSection()}
      {renderTestimonialSection()}
      {renderContactSection()}
      {renderBlogSection()}
      {renderFooter()}
    </div>
  );
}

export default App;
