import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea, IdeaDocument } from './schemas/idea.schema';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class IdeasService {
    constructor(
        @InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>,
    ) { }

    async createIdea(data, userId: string, files: string[]) {
        return this.ideaModel.create({
            ...data,
            attachments: files,
            userId,
            status: 'public',
        });
    }

    async updateIdea(id: string, data, userId: string, newFiles?: string[]) {
        const idea = await this.ideaModel.findById(id);
        if (!idea) throw new NotFoundException('Idea not found');

        if (idea.userId.toString() !== userId)
            throw new ForbiddenException('Not allowed');

        // 🔥 Update all non-file fields
        Object.assign(idea, data);

        // 🔥 If user attached new files → append them
        if (newFiles && newFiles.length > 0) {
            idea.attachments = [...idea.attachments, ...newFiles];
        }

        return idea.save();
    }

    async deleteIdea(id: string, userId: string) {
        const idea = await this.ideaModel.findById(id);
        if (!idea) throw new NotFoundException('Idea not found');

        if (idea.userId.toString() !== userId)
            throw new ForbiddenException('Not allowed');

        // Delete all attached files from disk
        for (const filename of idea.attachments) {
            const filePath = join(__dirname, '../../uploads/ideas', filename);
            if (existsSync(filePath)) {
                unlinkSync(filePath);
            }
        }

        // Delete the idea from DB
        await idea.deleteOne();

        return { message: 'Idea and all attachments deleted' };
    }

    async listIdeas(page: number) {
        const limit = 15;
        const skip = (page - 1) * limit;

        return this.ideaModel
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }

    async deleteIdeaFile(ideaId: string, filename: string, userId: string) {
        const idea = await this.ideaModel.findById(ideaId);
        if (!idea) throw new NotFoundException('Idea not found');

        if (idea.userId.toString() !== userId)
            throw new ForbiddenException('Not allowed');

        // Check if file exists in attachments
        if (!idea.attachments.includes(filename))
            throw new NotFoundException('File not found in idea');

        // Remove from attachments array
        idea.attachments = idea.attachments.filter((f) => f !== filename);

        // Delete physical file from server
        const filePath = join(__dirname, '../../uploads/ideas', filename);
        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }

        return idea.save();
    }
    async updateIdeaStatus(ideaId: string, status: 'public' | 'validated' | 'revision', userId: string) {
        const idea = await this.ideaModel.findById(ideaId);
        if (!idea) throw new NotFoundException('Idea not found');

        // Optional: Only owner or admin can update status
        if (idea.userId.toString() !== userId)
            throw new ForbiddenException('Not allowed to update status');

        idea.status = status;
        return idea.save();
    }

}
