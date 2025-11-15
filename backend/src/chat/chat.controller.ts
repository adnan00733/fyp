import { Controller, Post, Body, Req, UseGuards, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Send message or offer
  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(@Req() req: Request, @Body() body: CreateChatDto) {
    const anyReq: any = req;
    const userId = anyReq.user.sub;
    const roles: string[] = anyReq.user.roles;

    // Determine role
    let senderRole: 'investor' | 'entrepreneur';
    if (roles.includes('investor')) senderRole = 'investor';
    else if (roles.includes('entrepreneur')) senderRole = 'entrepreneur';
    else throw new Error('Invalid user role');

    return this.chatService.sendMessage(userId, senderRole, body);
  }

  // Get all chats for an idea
  @UseGuards(JwtAuthGuard)
  @Get('idea/:ideaId')
  async getChats(@Param('ideaId') ideaId: string) {
    return this.chatService.getIdeaChats(ideaId);
  }
}
