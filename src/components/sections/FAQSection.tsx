import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Start with some FAQs open by default
  const [openItems, setOpenItems] = useState<number[]>([0, 3]);

  const faqs = [
    {
      question: "Do I need coding experience?",
      answer: "Not at all! LovHack is beginner-friendly. You can use AI tools like Lovable, low-code platforms, or learn as you go. Many of our participants build their first project at LovHack.",
      size: "small",
    },
    {
      question: "Can I join without a team?",
      answer: "Absolutely! You can participate solo, or join our Discord to find teammates before or during the hackathon. We have dedicated channels for team formation.",
      size: "medium",
    },
    {
      question: "What can I build?",
      answer: "Anything you want! Web apps, AI tools, games, productivity tools, browser extensions — if you can build it in 48 hours, it counts. We encourage creativity and experimentation.",
      size: "medium",
    },
    {
      question: "Is it really free?",
      answer: "Yes! LovHack is completely free to participate. Our sponsors provide tools and prizes, so you can focus on building without any cost.",
      size: "small",
    },
    {
      question: "What tools can I use?",
      answer: "You can use any tools you want. Many participants use AI-powered tools like Lovable, Creao, and others from our sponsors. Traditional coding is also welcome!",
      size: "medium",
    },
    {
      question: "How does judging work?",
      answer: "Projects are judged on creativity, execution, impact, and presentation. We have categories for different types of projects, so there are multiple ways to win.",
      size: "large",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bento grid items staggered entrance
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".faq-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Get grid classes based on FAQ size
  const getGridClasses = (size: string, index: number) => {
    if (size === "large") return "col-span-2 md:col-span-2";
    if (size === "small") return "col-span-2 sm:col-span-1";
    return "col-span-2 sm:col-span-1 md:col-span-1";
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 md:mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-4 sm:mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 px-4">
            Everything you need to know about participating in LovHack.
          </p>
        </div>

        {/* Bento Grid FAQ */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className={`faq-item ${getGridClasses(faq.size, index)} opacity-0`}
              >
                <div
                  onClick={() => toggleItem(index)}
                  className={`h-full bg-white/50 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/40 shadow-glass p-4 sm:p-5 md:p-6 cursor-pointer transition-all duration-500 hover:bg-white/70 hover:shadow-lg ${isOpen ? 'bg-white/70' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground flex-1">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-foreground/50 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-xs sm:text-sm md:text-base text-foreground/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
