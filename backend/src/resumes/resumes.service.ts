import { Express } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from './schemas/resume.schema';
import { OpenAIService } from '../openai/openai.service';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private readonly openaiService: OpenAIService,
  ) {}

  async extractText(file: Express.Multer.File): Promise<string> {
    if (file.mimetype === 'application/pdf') {
      try {
        const data = await pdfParse(file.buffer);
        return data.text;
      } catch (err) {
        console.error('PDF parsing error:', err);
        return '';
      }
    }

    // TODO: Add support for DOC/DOCX, TXT etc. For now, return empty string for unsupported types.
    console.warn(`Unsupported file type for text extraction: ${file.mimetype}`);
    return '';
  }

  async parseAndSave(file: Express.Multer.File) {
    const rawText = await this.extractText(file);

    if (!rawText) {
      console.warn(`No text extracted from file: ${file.originalname}`);
      return null;
    }

    const parsed = await this.openaiService.parseResume(rawText);
    if (!parsed) return null;

    const resume = new this.resumeModel({
      ...parsed,
      rawText,
      fileName: file.originalname,
      uploadedAt: new Date(),
    });

    return resume.save();
  }

  async findAll() {
    return this.resumeModel.find().sort({ uploadedAt: -1 }).exec();
  }
}
