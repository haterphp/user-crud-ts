import {Schema, model} from "mongoose";
import * as crypto from "crypto";

interface UserI {
    name: string;
    surname: string;
    email: string;
    password: string;
}

const schema = new Schema<UserI>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        set: (password: string) => {
            const hash = crypto.randomBytes(16).toString('hex');
            return hash + ":" + crypto.pbkdf2Sync(password, hash, 1000, 64, 'sha512').toString('hex');
        }
    },
})

export default model<UserI>('User', schema);
