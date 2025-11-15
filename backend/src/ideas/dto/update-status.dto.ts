import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsIn(['public', 'validated', 'revision'], {
    message: 'Status must be one of: public, validated, revision',
  })
  status: 'public' | 'validated' | 'revision';
}
