import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { Resume } from '../resumes/schemas/resume.schema';

@Injectable()
export class MatchingService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
  ) {}

  async findMatchesForJob(jobId: string) {
    const job = await this.jobModel.findById(jobId).exec();
    if (!job) return [];

    const resumes = await this.resumeModel.find().exec();

    // Basic matching logic:
    const matches = resumes
      .map((resume) => {
        const skillsMatched = resume.skills.filter((skill) =>
          job.requiredSkills.includes(skill),
        ).length;

        const skillsScore = skillsMatched / job.requiredSkills.length;

        let experienceYears = 0;
        if (resume.experience && Array.isArray(resume.experience)) {
          experienceYears = resume.experience.reduce((total, exp) => {
            const match = exp.duration.match(/\d+/);
            return total + (match ? parseInt(match[0], 10) : 0);
          }, 0);
        }

        const experienceMatch = job.experienceRequired
          ? experienceYears >= job.experienceRequired
          : true;

        const score = experienceMatch ? skillsScore : 0;

        return { resume, score };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score);

    return matches;
  }
}
