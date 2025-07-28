import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumesController } from './resumes/resumes.controller';
import { ResumesService } from './resumes/resumes.service';
import { Resume, ResumeSchema } from './resumes/schemas/resume.schema';
import { OpenAIService } from './openai/openai.service';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error('MONGODB_URI is not defined in environment variables');
        }
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    JobsModule,
  ],
  controllers: [ResumesController],
  providers: [ResumesService, OpenAIService],
})
export class AppModule {}
