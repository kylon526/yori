// scripts/ingest.ts
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { getDb } from "./db.ts";
import facts from "./facts.ts";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

async function ingest() {
  const db = await getDb();
  console.log(`Ingesting ${facts.length} manual chunks...`);

  for (const f of facts) {
    const { embedding } = (await embed({
      model: openai.textEmbedding("text-embedding-3-small"),
      value: f.content,
    })) as { embedding: number[] };

    await db
      .collection("facts")
      .updateOne(
        { content: f.content },
        { $set: { ...f, embedding, updatedAt: new Date() } },
        { upsert: true }
      );
  }

  console.log("Manual ingestion complete!");
  process.exit(0);
}

ingest().catch((err) => {
  console.error(err);
  process.exit(1);
});
