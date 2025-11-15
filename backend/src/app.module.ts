import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/fyp'),
    UsersModule,
    AuthModule,
    IdeasModule,
  ],
})
export class AppModule {}

