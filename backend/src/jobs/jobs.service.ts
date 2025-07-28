import { Express } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schemas/job.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  async create(jobData: Partial<Job>): Promise<Job> {
    const job = new this.jobModel(jobData);
    return job.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Job | null> {
  return this.jobModel.findById(id).exec();
}


  async delete(id: string): Promise<any> {
    return this.jobModel.deleteOne({ _id: id }).exec();
  }
}
