import { getMongoCollection } from "./mongodb";

export type MessageDoc = {
  userEmail: string;
  role: "user" | "assistant";
  content: string;
  toolUsed?: { name: string; input: string }[];
  createdAt: Date;
};

async function messagesCollection() {
  return getMongoCollection<MessageDoc>("messages");
}

export async function saveMessages(
  userEmail: string,
  messages: Omit<MessageDoc, "userEmail" | "createdAt">[],
) {
  const messagesToSave = messages.map((message, index) => ({
    ...message,
    userEmail,
    createdAt: new Date(Date.now() + index),
  }));

  const collection = await messagesCollection();
  await collection.insertMany(messagesToSave);
}

export async function getHistory(limit = 40, userEmail: string) {
  const messages = await messagesCollection();

  const newestMessages = messages
    .find({ userEmail })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return (await newestMessages).reverse();
}
