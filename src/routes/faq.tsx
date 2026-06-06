import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/mock";

export const Route = createFileRoute("/faq")({ component: FAQ });

function FAQ() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteShell>
  );
}
