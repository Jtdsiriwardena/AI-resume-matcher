import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MatchingService } from './matching.service';

// You can create DTOs for type safety (optional)
class CreateJobDto {
  title: string;
  description: string;
  requiredSkills: string[];
  experienceRequired?: number;
}

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly matchingService: MatchingService,
  ) {}

  @Post()
  async create(@Body() jobData: CreateJobDto) {
    return this.jobsService.create(jobData);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobsService.delete(id);
  }

  // New endpoint to get matched candidates for a job
  @Get(':id/matches')
  async getMatches(@Param('id') id: string) {
    const matches = await this.matchingService.findMatchesForJob(id);
    return matches.map(m => ({
      score: m.score,
      resume: m.resume,
    }));
  }
}
