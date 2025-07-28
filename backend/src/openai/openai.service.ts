import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;
  private readonly logger = new Logger(OpenAIService.name);

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async parseResume(text: string) {
    const prompt = `
You are a resume parser. Extract the following from the text and return only JSON:
{
  fullName: string,
  email: string,
  phone: string,
  skills: string[],
  education: [{ degree: string, school: string, year: string }],
  experience: [{ role: string, company: string, duration: string }]
}

Resume:
"""
${text}
"""
Only return JSON.
    `.trim();

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = completion.choices?.[0]?.message?.content;

      if (!content) {
        this.logger.warn('OpenAI returned empty content.');
        return null;
      }

      return JSON.parse(content);
    } catch (error) {
      this.logger.error('Failed to parse JSON from OpenAI response', error);
      return null;
    }
  }
}
