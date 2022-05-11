import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackService } from './services/submitFeedback';
import { PrismaFeedbackRepositories } from './repositories/prisma/prisma-feedbacks-repository';
import { NodeMailerMailerAdapter } from './adapters/node-mailer/nodemailer-mailer-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaRepository = new PrismaFeedbackRepositories();
  const nodemailer = new NodeMailerMailerAdapter();

  const submitFeedback = new SubmitFeedbackService(
    prismaRepository,
    nodemailer,
  );

  submitFeedback.execute({ type, comment, screenshot });

  return res.status(201).send();
})