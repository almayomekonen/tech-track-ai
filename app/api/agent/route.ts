import { run } from "@openai/agents";
import { agent } from "@/lib/ai/agent";
import { z } from "zod";
import { auth } from "@/lib/authentication";
import { saveMessages } from "@/lib/chat-history";

const bodySchema = z.object({
  message: z
    .string()
    .min(1)
    .max(10000)
    .describe("The message to send to the agent"),
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  console.log(request);

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
    const resultMessage = await run(agent, parsed.data.message);

    const response =
      resultMessage.finalOutput || "I'm sorry, I'm not sure what you mean.";

    const toolUsed = resultMessage.newItems.flatMap((item) =>
      item.type === "tool_call_item" && item.rawItem.type === "function_call"
        ? [{ name: item.rawItem.name, input: item.rawItem.arguments }]
        : [],
    );

    const session = await auth();

    const userEmail = session?.user?.email;
    if (userEmail) {
      try {
        await saveMessages(userEmail, [
          { role: "user", content: parsed.data.message },
          { role: "assistant", content: response, toolUsed },
        ]);
      } catch (error) {
        console.log(error, "Messages failed to save");
      }
    }
    return Response.json({ response, toolUsed, userEmail });
  } catch (error) {
    return Response.json(
      { error: `failed to run agent: ${error}` },
      { status: 500 },
    );
  }
}
