import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { Idea, IdeaDocument } from '../ideas/schemas/idea.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>,
  ) {}

  async sendMessage(
    senderId: string,
    senderRole: 'investor' | 'entrepreneur',
    dto: CreateChatDto,
  ) {
    const idea = await this.ideaModel.findById(dto.ideaId);
    if (!idea) throw new NotFoundException('Idea not found');

    // Only investor or idea owner can send messages
    if (senderRole === 'entrepreneur' && idea.userId.toString() !== senderId) {
      throw new ForbiddenException('Not allowed to send message');
    }

    return this.chatModel.create({
      ideaId: dto.ideaId,
      senderId,
      senderRole,
      message: dto.message,
      offerAmount: dto.offerAmount,
    });
  }

  async getIdeaChats(ideaId: string) {
    return this.chatModel.find({ ideaId }).sort({ createdAt: 1 });
  }
}
