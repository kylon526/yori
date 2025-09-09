import { db } from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { User } from './types';
import { env } from '$env/dynamic/private';

const users = db.collection<User>('users');

export async function registerUser(email: string, password: string) {
	const existing = await users.findOne({ email });
	if (existing) throw new Error('User already exists');

	const hashed = await bcrypt.hash(password, 10);
	const newUser = { email, password: hashed };
	await users.insertOne(newUser);
	return newUser;
}

export async function loginUser(email: string, password: string) {
	const user = await users.findOne({ email });
	if (!user) throw new Error('Invalid credentials');

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new Error('Invalid credentials');

	const token = jwt.sign({ email: user.email }, env.JWT_SECRET!, {
		expiresIn: '1h'
	});
	return token;
}
