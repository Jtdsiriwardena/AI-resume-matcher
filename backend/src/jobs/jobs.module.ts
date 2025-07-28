import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import { Resume, ResumeSchema } from '../resumes/schemas/resume.schema';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MatchingService } from './matching.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
  ],
  controllers: [JobsController],
  providers: [JobsService, MatchingService],
  exports: [MatchingService],
})
export class JobsModule {}
