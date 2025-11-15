import {
    Body,
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    Req,
    Put,
    Param,
    Delete,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IdeasService } from './ideas.service';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('ideas')
export class IdeasController {
    constructor(private ideasService: IdeasService) { }

    // ----------------------------
    // CREATE IDEA
    // ----------------------------
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(
        FilesInterceptor('attachments', 10, {
            storage: diskStorage({
                destination: './uploads/ideas',
                filename: (req, file, cb) => {
                    const filename = `${uuid()}-${file.originalname}`;
                    cb(null, filename);
                },
            }),
        }),
    )
    async createIdea(
        @Req() req: Request,
        @Body() body,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        const anyReq: any = req;
        const userId = anyReq.user?.sub;
        if (!userId) throw new Error('User not found in request');

        const fileNames = (files || []).map((f) => f.filename);

        return this.ideasService.createIdea(body, userId, fileNames);
    }

    // ----------------------------
    // UPDATE IDEA (WITH FILES)
    // ----------------------------
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(
        FilesInterceptor('attachments', 10, {
            storage: diskStorage({
                destination: './uploads/ideas',
                filename: (req, file, cb) => {
                    const filename = `${uuid()}-${file.originalname}`;
                    cb(null, filename);
                },
            }),
        }),
    )
    async updateIdea(
        @Param('id') id: string,
        @Body() body,
        @Req() req: Request,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        const anyReq: any = req;
        const userId = anyReq.user?.sub;

        const newFileNames = (files || []).map((f) => f.filename);

        return this.ideasService.updateIdea(id, body, userId, newFileNames);
    }

    // ----------------------------
    // DELETE IDEA
    // ----------------------------
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteIdea(@Param('id') id: string, @Req() req: Request) {
        const anyReq: any = req;
        return this.ideasService.deleteIdea(id, anyReq.user.sub);
    }

    // ----------------------------
    // LIST IDEAS
    // ----------------------------
    @Get('list')
    async listIdeas(@Query('page') page = 1) {
        return this.ideasService.listIdeas(Number(page));
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':ideaId/file')
    async deleteIdeaFile(
        @Param('ideaId') ideaId: string,
        @Query('filename') filename: string,
        @Req() req: any,
    ) {
        const userId = req.user.sub;
        return this.ideasService.deleteIdeaFile(ideaId, filename, userId);
    }
}
