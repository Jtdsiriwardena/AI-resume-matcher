import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Resume extends Document {
  @Prop() fullName: string;
  @Prop() email: string;
  @Prop() phone: string;
  @Prop([String]) skills: string[];

  @Prop([{ degree: String, school: String, year: String }])
  education: { degree: string; school: string; year: string }[];

  @Prop([{ role: String, company: String, duration: String }])
  experience: { role: string; company: string; duration: string }[];

  @Prop() rawText: string;
  @Prop() fileName: string;
  @Prop() uploadedAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
