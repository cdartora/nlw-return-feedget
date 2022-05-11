"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbackRepositories = void 0;
const prisma_1 = require("../../prisma");
class PrismaFeedbackRepositories {
    async create({ type, comment, screenshot }) {
        await prisma_1.prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    }
}
exports.PrismaFeedbackRepositories = PrismaFeedbackRepositories;
