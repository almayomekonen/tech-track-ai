import { Button, buttonVariants } from "@/components/ui/button";
import Card, {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const plans = [
  {
    name: "Free",
    price: "$0",
    details: "Get started with AI agents and explore the platform.",
    features: [
      "Unlimited AI agents",
      "Custom usage limits",
      "Advanced security and permissions",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "Enterprise-grade SLA",
    ],
    cta: "Get Started",
    href: "/login",
  },
  {
    name: "Pro",
    price: "$29",
    details: "Build, automate, and scale AI agents for your business.",
    features: [
      "Unlimited AI agents",
      "Custom usage limits",
      "Advanced security and permissions",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "Enterprise-grade SLA",
    ],
    cta: "Start Free Trial",
    href: "/login",
  },
  {
    name: "Enterprise",
    price: "Custom",
    details: "Powerful AI agent infrastructure for teams.",
    features: [
      "Unlimited AI agents",
      "Custom usage limits",
      "Advanced security and permissions",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "Enterprise-grade SLA",
    ],
    cta: "Contact Sales",
    href: "/login",
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto px-4 py-10">
        <Badge className="mb-3 " variant="outline">
          Pricing
        </Badge>
        <h1 className="text-4xl font-bold mb-3 text-center">
          Simple while we build.
        </h1>
        <p className="text-center text-lg">
          We&apos;re working hard to bring you the best pricing options. Stay
          tuned!
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-2xl font-bold mb-3">{plan.price}</p>
              <CardDescription>{plan.details}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Link
                className={cn(
                  buttonVariants({
                    variant: plan.details ? "default" : "outline",
                  }),
                  "w-full",
                )}
                href={plan.href}
              >
                {plan.cta}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
