import { Job } from './schemas/job.schema';
import { Model } from 'mongoose';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<Job>);
    create(jobData: Partial<Job>): Promise<Job>;
    findAll(): Promise<Job[]>;
    findOne(id: string): Promise<Job | null>;
    delete(id: string): Promise<any>;
}
