import { JobsService } from './jobs.service';
import { MatchingService } from './matching.service';
declare class CreateJobDto {
    title: string;
    description: string;
    requiredSkills: string[];
    experienceRequired?: number;
}
export declare class JobsController {
    private readonly jobsService;
    private readonly matchingService;
    constructor(jobsService: JobsService, matchingService: MatchingService);
    create(jobData: CreateJobDto): Promise<import("./schemas/job.schema").Job>;
    findAll(): Promise<import("./schemas/job.schema").Job[]>;
    findOne(id: string): Promise<import("./schemas/job.schema").Job | null>;
    delete(id: string): Promise<any>;
    getMatches(id: string): Promise<{
        score: number;
        resume: import("mongoose").Document<unknown, {}, import("../resumes/schemas/resume.schema").Resume, {}> & import("../resumes/schemas/resume.schema").Resume & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }[]>;
}
export {};
