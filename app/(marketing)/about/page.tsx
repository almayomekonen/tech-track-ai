import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/ui/badge";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Separator from "@/components/ui/separator";

const princibles = [
  {
    title: "Product before model",
    body: "If the pages feel unfinished, nobody will trust the agent",
  },
  {
    title: "Trust before automation",
    body: "An agent should make every action understandable before it makes anything automatic",
  },
  {
    title: "Outcome before intelligence",
    body: "Users do not care how smart the agent is; they care whether it gets the job done",
  },
  {
    title: "Human control always",
    body: "The agent should act with confidence, but the user should always feel in control",
  },
];

const questions = [
  {
    value: "Agent",
    q: "What is an agent?",
    a: "An agent is software that can understand a goal, decide what to do, and take actions on your behalf.",
  },
  {
    value: "Autonomy",
    q: "How is an agent different from a chatbot?",
    a: "A chatbot mainly responds to messages. An agent can plan, use tools, perform tasks, and continue working toward a goal.",
  },
  {
    value: "Context",
    q: "Why does an agent need context?",
    a: "Context helps the agent understand your business, users, history, and preferences so its decisions are relevant instead of generic.",
  },
  {
    value: "Control",
    q: "Should an agent act without permission?",
    a: "Only when you allow it. A good agent makes its actions predictable, gives you control over important decisions, and asks for approval when needed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="space-y-2">
          <Badge variant="outline">About Our Agent</Badge>
          <h1 className="text-4xl font-bold">
            A studio we can grow our agent inside.
          </h1>
          <p className="text-lg">
            We are a team of developers who are passionate about building
            software that is easy to use and understand.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {princibles.map((princible) => (
            <Card key={princible.title}>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {princible.title}
                </CardTitle>
              </CardHeader>

              <CardContent>{princible.body}</CardContent>
            </Card>
          ))}
        </div>
        <Separator className="my-8" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground">
              Get answers to common questions about our agent.
            </p>
          </div>

          <Accordion defaultValue={["what-is-an-agent"]} className="max-w-lg">
            {questions.map((question) => (
              <AccordionItem key={question.value} value={question.value}>
                <AccordionTrigger>{question.q}</AccordionTrigger>
                <AccordionContent>{question.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
