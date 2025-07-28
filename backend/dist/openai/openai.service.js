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
var OpenAIService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let OpenAIService = OpenAIService_1 = class OpenAIService {
    openai;
    logger = new common_1.Logger(OpenAIService_1.name);
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async parseResume(text) {
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
        }
        catch (error) {
            this.logger.error('Failed to parse JSON from OpenAI response', error);
            return null;
        }
    }
};
exports.OpenAIService = OpenAIService;
exports.OpenAIService = OpenAIService = OpenAIService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OpenAIService);
//# sourceMappingURL=openai.service.js.map