import { Document } from 'mongoose';
export declare class Resume extends Document {
    fullName: string;
    email: string;
    phone: string;
    skills: string[];
    education: {
        degree: string;
        school: string;
        year: string;
    }[];
    experience: {
        role: string;
        company: string;
        duration: string;
    }[];
    rawText: string;
    fileName: string;
    uploadedAt: Date;
}
export declare const ResumeSchema: import("mongoose").Schema<Resume, import("mongoose").Model<Resume, any, any, any, Document<unknown, any, Resume, any> & Resume & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resume, Document<unknown, {}, import("mongoose").FlatRecord<Resume>, {}> & import("mongoose").FlatRecord<Resume> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
