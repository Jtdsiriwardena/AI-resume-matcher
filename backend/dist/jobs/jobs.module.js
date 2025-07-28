"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("./schemas/job.schema");
const resume_schema_1 = require("../resumes/schemas/resume.schema");
const jobs_service_1 = require("./jobs.service");
const jobs_controller_1 = require("./jobs.controller");
const matching_service_1 = require("./matching.service");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: job_schema_1.Job.name, schema: job_schema_1.JobSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: resume_schema_1.Resume.name, schema: resume_schema_1.ResumeSchema }]),
        ],
        controllers: [jobs_controller_1.JobsController],
        providers: [jobs_service_1.JobsService, matching_service_1.MatchingService],
        exports: [matching_service_1.MatchingService],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map