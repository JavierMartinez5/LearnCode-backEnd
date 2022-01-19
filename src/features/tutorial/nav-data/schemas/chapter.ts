import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type IChapterDocument = Chapter & Document;

@Schema()
export class Chapter {

    @Prop()
    sectionId: string

    @Prop()
    position: number

    @Prop()
    chapterTitle: string
    
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);