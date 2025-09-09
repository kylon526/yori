import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = env.MONGODB_URI!;
let client: MongoClient;

if (!globalThis._mongoClientPromise) {
	client = new MongoClient(uri);
	globalThis._mongoClientPromise = client.connect();
}

export const db = (await globalThis._mongoClientPromise).db('authdb');
