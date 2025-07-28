"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const resumes_controller_1 = require("./resumes/resumes.controller");
const resumes_service_1 = require("./resumes/resumes.service");
const resume_schema_1 = require("./resumes/schemas/resume.schema");
const openai_service_1 = require("./openai/openai.service");
const jobs_module_1 = require("./jobs/jobs.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const uri = configService.get('MONGODB_URI');
                    if (!uri) {
                        throw new Error('MONGODB_URI is not defined in environment variables');
                    }
                    return {
                        uri,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: resume_schema_1.Resume.name, schema: resume_schema_1.ResumeSchema }]),
            jobs_module_1.JobsModule,
        ],
        controllers: [resumes_controller_1.ResumesController],
        providers: [resumes_service_1.ResumesService, openai_service_1.OpenAIService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map