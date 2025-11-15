import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

export type UserRole = 'investor' | 'entrepreneur';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: Types.ObjectId, ref: 'Idea', required: true })
  ideaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ type: String, enum: ['investor', 'entrepreneur'], required: true })
  senderRole: UserRole;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Number }) // optional offer amount
  offerAmount?: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
