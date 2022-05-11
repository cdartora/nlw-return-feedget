"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const submitFeedback_1 = require("./services/submitFeedback");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const nodemailer_mailer_adapter_1 = require("./adapters/node-mailer/nodemailer-mailer-adapter");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaRepository = new prisma_feedbacks_repository_1.PrismaFeedbackRepositories();
    const nodemailer = new nodemailer_mailer_adapter_1.NodeMailerMailerAdapter();
    const submitFeedback = new submitFeedback_1.SubmitFeedbackService(prismaRepository, nodemailer);
    submitFeedback.execute({ type, comment, screenshot });
    return res.status(201).send();
});
