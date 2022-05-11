import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackRequest {
  type: string,
  comment: string,
  screenshot?: string,
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) { }

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type, comment, screenshot
    })

    await this.mailAdapter.sendMail({
      subject: `[${type}] Novo feedback`,
      body: [
        '<div>',
        `<p>feedback type: ${type}</p>`,
        `<p>comment: ${comment}</p>`,
        screenshot ? `<img width="300px" src=${screenshot} alt="screenshot" />` : '',
        '<div/>',
      ].join(''),
    })
  }
}