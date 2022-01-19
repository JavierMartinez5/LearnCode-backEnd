import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ITutorialDocument = Tutorial & Document;

@Schema()
export class Tutorial {

    @Prop()
    tutorialName: string
    
}

export const TutorialSchema = SchemaFactory.createForClass(Tutorial);