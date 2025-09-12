import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI!;
let client: MongoClient;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}

export const db = (await globalThis._mongoClientPromise).db("yori");

async function createTTLIndices() {
  await db
    .collection("mfa")
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}

createTTLIndices().catch(console.error);
