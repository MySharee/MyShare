import argon2, { type HashOptions } from 'argon2';

const ARGON2_OPTIONS: HashOptions = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
};

export async function hashPassword(plainPassword: string): Promise<string> {
    return await argon2.hash(plainPassword, ARGON2_OPTIONS);
}

export async function verifyPassword(hash: string, plainPassword: string): Promise<boolean> {
    try {
        return await argon2.verify(hash, plainPassword);
    } catch {
        return false;
    }
}
