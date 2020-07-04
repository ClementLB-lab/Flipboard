import bcrypt from "bcryptjs"

const saltRounds = 10;

export function hash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

export async function checkMatch(password: string, pwdHash: string): Promise<boolean> {
    return bcrypt.compare(password, pwdHash)
}