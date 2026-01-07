import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GlassCard from "@/components/GlassCard";

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
    <section className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Everything you need to know about participating in LovHack.
          </p>
        </div>

        <GlassCard className="p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </GlassCard>
      </div>
    </section>
  );
};

export default FAQSection;
