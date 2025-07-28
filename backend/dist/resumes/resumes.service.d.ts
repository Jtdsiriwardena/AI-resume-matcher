import { Model } from 'mongoose';
import { Resume } from './schemas/resume.schema';
import { OpenAIService } from '../openai/openai.service';
export declare class ResumesService {
    private resumeModel;
    private readonly openaiService;
    constructor(resumeModel: Model<Resume>, openaiService: OpenAIService);
    extractText(file: Express.Multer.File): Promise<string>;
    parseAndSave(file: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, Resume, {}> & Resume & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Resume, {}> & Resume & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
