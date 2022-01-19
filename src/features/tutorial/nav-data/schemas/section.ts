import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ISectionDocument = Section & Document;

@Schema()
export class Section {

    @Prop()
    tutorialId: string

    @Prop()
    sectionTitle: string

    @Prop()
    position: number

}

export const SectionSchema = SchemaFactory.createForClass(Section);