// lib/db.ts
import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI!;
let client: MongoClient;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, {
    tls: true,
  });
  globalThis._mongoClientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await globalThis._mongoClientPromise!;
  return client.db("yori");
}

export async function createTTLIndices() {
  const db = await getDb();
  await db
    .collection("mfa")
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}
