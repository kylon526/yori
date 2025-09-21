// import { openai } from "@ai-sdk/openai";
// import { getDb } from "@/lib/db";
// import { embed } from "ai";

// export async function retrieveFacts(query: string, k = 5) {
//   const db = await getDb();

//   const { embedding } = (await embed({
//     model: openai.textEmbedding("text-embedding-3-small"),
//     value: query,
//   })) as { embedding: number[] };

//   const results = await db
//     .collection("facts")
//     .aggregate([
//       {
//         $vectorSearch: {
//           queryVector: embedding,
//           path: "embedding",
//           numCandidates: 100,
//           limit: k,
//         },
//       },
//     ])
//     .toArray();

//   return results.map((r) => r.content ?? "");
// }

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { getDb } from "@/lib/db.ts";
import { ObjectId } from "mongodb";

interface Fact {
  _id: ObjectId;
  content: string;
  embedding: number[];
  type: string;
}

export async function getAllFacts(): Promise<Fact[]> {
  const db = await getDb();
  return db.collection<Fact>("facts").find({}).toArray();
}

export async function retrieveFactsManual(query: string, k = 5) {
  const facts = await getAllFacts();

  // get embedding for query
  const { embedding: queryEmbedding } = (await embed({
    model: openai.textEmbedding("text-embedding-3-small"),
    value: query,
  })) as { embedding: number[] };

  // compute similarity
  const scored = facts.map((f) => ({
    ...f,
    score: cosineSimilarity(f.embedding, queryEmbedding),
  }));

  // sort descending by score and pick top k
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map((f) => ({ content: f.content, type: f.type }));
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
