import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need coding experience to participate?",
      answer:
        "Not at all! LovHack is beginner-friendly. You can use AI tools like Lovable, low-code platforms, or learn as you go. Many of our participants build their first project at LovHack.",
    },
    {
      question: "Can I join without a team?",
      answer:
        "Absolutely! You can participate solo, or join our Discord to find teammates before or during the hackathon. We have dedicated channels for team formation.",
    },
    {
      question: "What can I build?",
      answer:
        "Anything you want! Web apps, AI tools, games, productivity tools, browser extensions — if you can build it in 48 hours, it counts. We encourage creativity and experimentation.",
    },
    {
      question: "Is it really free?",
      answer:
        "Yes! LovHack is completely free to participate. Our sponsors provide tools and prizes, so you can focus on building without any cost.",
    },
    {
      question: "What tools can I use?",
      answer:
        "You can use any tools you want. Many participants use AI-powered tools like Lovable, Creao, and others from our sponsors. Traditional coding is also welcome!",
    },
    {
      question: "How does judging work?",
      answer:
        "Projects are judged on creativity, execution, impact, and presentation. We have categories for different types of projects, so there are multiple ways to win.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 px-2">
            Everything you need to know about participating in LovHack.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <GlassCard className="p-6 sm:p-8 md:p-10 backdrop-blur-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <AccordionItem value={`item-${index}`} className="border-white/20">
                    <AccordionTrigger className="text-left text-base sm:text-lg text-foreground hover:text-primary py-5 sm:py-6 transition-colors duration-300">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base sm:text-lg text-foreground/70 pb-5 sm:pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </GlassCard>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default FAQSection;
