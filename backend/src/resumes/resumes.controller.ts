import { Express } from 'express';
import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { Resume } from './schemas/resume.schema';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    const results: Resume[] = [];


    for (const file of files) {
      const saved = await this.resumesService.parseAndSave(file);
      if (saved) results.push(saved);
    }

    return results;
  }

  @Get()
  async findAll() {
    return this.resumesService.findAll();
  }
}
