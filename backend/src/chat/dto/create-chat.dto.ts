import { IsMongoId, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsMongoId()
  ideaId: string;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsNumber()
  offerAmount?: number;
}
