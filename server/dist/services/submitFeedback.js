"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackService = void 0;
class SubmitFeedbackService {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        await this.feedbacksRepository.create({
            type, comment, screenshot
        });
        await this.mailAdapter.sendMail({
            subject: `[${type}] Novo feedback`,
            body: [
                '<div>',
                `<p>feedback type: ${type}</p>`,
                `<p>comment: ${comment}</p>`,
                screenshot ? `<img width="300px" src=${screenshot} alt="screenshot" />` : '',
                '<div/>',
            ].join(''),
        });
    }
}
exports.SubmitFeedbackService = SubmitFeedbackService;
