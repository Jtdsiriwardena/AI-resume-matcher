import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { Resume } from '../resumes/schemas/resume.schema';
export declare class MatchingService {
    private jobModel;
    private resumeModel;
    constructor(jobModel: Model<Job>, resumeModel: Model<Resume>);
    findMatchesForJob(jobId: string): Promise<{
        resume: import("mongoose").Document<unknown, {}, Resume, {}> & Resume & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        score: number;
    }[]>;
}
