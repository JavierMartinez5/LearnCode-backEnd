import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    userName: string

    @Prop()
    email: string

    @Prop()
    role: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

// export const userSchema: mongoose.Schema = new mongoose.Schema({
//     createdAt: {
//         type: Date,
//         required: true,
//         default: Date.now,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: false
//     },
//     accessToken: {
//         type: String,
//         required: true,
//         default: ''
//     },
//     name: {
//         type: String,
//         required: false
//     },
// });

// export interface User {
//     readonly createdAt: Date;
//     email: string;
//     password?: string;
//     readonly accessToken: string;
//     name: string;
// }

// export interface IUser extends mongoose.Document, User {
//     _id: mongoose.Types.ObjectId;
// }