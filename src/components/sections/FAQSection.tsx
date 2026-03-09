import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "Do I need coding experience to participate?",
      answer: "Not at all! LovHack is beginner-friendly. You can use AI tools like Lovable, low-code platforms, or learn as you go. Many of our participants build their first project at LovHack.",
    },
    {
      question: "Can I join without a team?",
      answer: "Absolutely! You can participate solo, or join our Discord to find teammates before or during the hackathon. We have dedicated channels for team formation.",
    },
    {
      question: "What can I build?",
      answer: "Anything you want! Web apps, AI tools, games, productivity tools, browser extensions. If you can build it during the hackathon, it counts. We encourage creativity and experimentation.",
    },
    {
      question: "Is it really free?",
      answer: "Yes! LovHack is completely free to participate. Our sponsors provide tools and prizes, so you can focus on building without any cost.",
    },
    {
      question: "What tools can I use?",
      answer: "You can use any tools you want. Many participants use AI-powered tools like Lovable, Creao, and others from our sponsors. Traditional coding is also welcome!",
    },
    {
      question: "How does judging work?",
      answer: "Projects are judged on creativity, execution, impact, and presentation. We have categories for different types of projects, so there are multiple ways to win.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Accordion items staggered entrance
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll(".faq-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    const content = document.getElementById(`faq-content-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);

    if (content && icon) {
      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

      if (isOpen) {
        gsap.to(content, { maxHeight: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
        gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.set(content, { maxHeight: "auto" });
        const height = content.scrollHeight;
        gsap.fromTo(content,
          { maxHeight: 0, opacity: 0 },
          { maxHeight: height, opacity: 1, duration: 0.4, ease: "power2.inOut" }
        );
        gsap.to(icon, { rotation: 180, duration: 0.3, ease: "power2.out" });
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 md:mb-16 opacity-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 px-4">
            Everything you need to know about participating in LovHack.
          </p>
        </div>

        {/* Accordion */}
        <div ref={accordionRef}>
          <GlassCard className="p-4 sm:p-6 md:p-8 backdrop-blur-2xl">
            <div className="divide-y divide-white/20">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item opacity-0">
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 md:py-6 text-left group"
                  >
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      id={`faq-icon-${index}`}
                      className="w-5 h-5 text-foreground/50 flex-shrink-0 transition-colors duration-300 group-hover:text-primary"
                    />
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    className="overflow-hidden"
                    style={{ maxHeight: 0, opacity: 0 }}
                  >
                    <p className="text-sm sm:text-base text-foreground/70 pb-4 sm:pb-5 md:pb-6 pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
