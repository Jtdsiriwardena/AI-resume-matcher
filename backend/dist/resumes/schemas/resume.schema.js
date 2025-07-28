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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeSchema = exports.Resume = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Resume = class Resume extends mongoose_2.Document {
    fullName;
    email;
    phone;
    skills;
    education;
    experience;
    rawText;
    fileName;
    uploadedAt;
};
exports.Resume = Resume;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Resume.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Resume.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Resume.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Resume.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ degree: String, school: String, year: String }]),
    __metadata("design:type", Array)
], Resume.prototype, "education", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ role: String, company: String, duration: String }]),
    __metadata("design:type", Array)
], Resume.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Resume.prototype, "rawText", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Resume.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Resume.prototype, "uploadedAt", void 0);
exports.Resume = Resume = __decorate([
    (0, mongoose_1.Schema)()
], Resume);
exports.ResumeSchema = mongoose_1.SchemaFactory.createForClass(Resume);
//# sourceMappingURL=resume.schema.js.map