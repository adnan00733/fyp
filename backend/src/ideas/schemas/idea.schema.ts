import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IdeaDocument = Idea & Document;
export type IdeaStatus = 'public' | 'validated' | 'revision';

@Schema({ timestamps: true })
export class Idea {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    market: string;

    @Prop({ required: true })
    problemStatement: string;

    @Prop({ required: true })
    solution: string;

    @Prop({ type: [String], default: [] })
    attachments: string[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;
    @Prop({
        type: String,
        enum: ['public', 'validated', 'revision'],
        default: 'public'
    })
    status: IdeaStatus;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
