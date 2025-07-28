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
exports.MatchingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_schema_1 = require("./schemas/job.schema");
const resume_schema_1 = require("../resumes/schemas/resume.schema");
let MatchingService = class MatchingService {
    jobModel;
    resumeModel;
    constructor(jobModel, resumeModel) {
        this.jobModel = jobModel;
        this.resumeModel = resumeModel;
    }
    async findMatchesForJob(jobId) {
        const job = await this.jobModel.findById(jobId).exec();
        if (!job)
            return [];
        const resumes = await this.resumeModel.find().exec();
        const matches = resumes
            .map((resume) => {
            const skillsMatched = resume.skills.filter((skill) => job.requiredSkills.includes(skill)).length;
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
};
exports.MatchingService = MatchingService;
exports.MatchingService = MatchingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __param(1, (0, mongoose_1.InjectModel)(resume_schema_1.Resume.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MatchingService);
//# sourceMappingURL=matching.service.js.map