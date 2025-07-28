"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resume_schema_1 = require("./schemas/resume.schema");
const openai_service_1 = require("../openai/openai.service");
const pdfParse = require("pdf-parse");
let ResumesService = class ResumesService {
    resumeModel;
    openaiService;
    constructor(resumeModel, openaiService) {
        this.resumeModel = resumeModel;
        this.openaiService = openaiService;
    }
    async extractText(file) {
        if (file.mimetype === 'application/pdf') {
            try {
                const data = await pdfParse(file.buffer);
                return data.text;
            }
            catch (err) {
                console.error('PDF parsing error:', err);
                return '';
            }
        }
        console.warn(`Unsupported file type for text extraction: ${file.mimetype}`);
        return '';
    }
    async parseAndSave(file) {
        const rawText = await this.extractText(file);
        if (!rawText) {
            console.warn(`No text extracted from file: ${file.originalname}`);
            return null;
        }
        const parsed = await this.openaiService.parseResume(rawText);
        if (!parsed)
            return null;
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
};
exports.ResumesService = ResumesService;
exports.ResumesService = ResumesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resume_schema_1.Resume.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        openai_service_1.OpenAIService])
], ResumesService);
//# sourceMappingURL=resumes.service.js.map