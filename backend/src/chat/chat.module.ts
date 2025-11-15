import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Idea, IdeaSchema } from '../ideas/schemas/idea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]), // needed to reference ideas
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
