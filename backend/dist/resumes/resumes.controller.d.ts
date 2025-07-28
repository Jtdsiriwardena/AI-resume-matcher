import { ResumesService } from './resumes.service';
import { Resume } from './schemas/resume.schema';
export declare class ResumesController {
    private readonly resumesService;
    constructor(resumesService: ResumesService);
    uploadMultiple(files: Express.Multer.File[]): Promise<Resume[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Resume, {}> & Resume & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
