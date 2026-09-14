import { run } from "@openai/agents";
import { agent } from "@/lib/ai/agent";
import { z } from "zod";

const bodySchema = z.object({
  message: z
    .string()
    .min(1)
    .max(10_000)
    .describe("The message to send to the agent"),
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  let json: unknown;

  try {
    json = await request.json();
  } catch (error) {
    return Response.json(
      { error: `request is not valid JSON: ${error}` },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "send a message between 1 and 10,000 characters" },
      { status: 400 },
    );
  }

  try {
    const result = await run(agent, parsed.data.message);
    const response =
      result.finalOutput || "I'm sorry, I'm not sure what you mean.";
    return Response.json({ response });
  } catch (error) {
    return Response.json(
      { error: `failed to run agent: ${error}` },
      { status: 500 },
    );
  }
}
