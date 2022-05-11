"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerMailerAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b7d5b0cc4232de",
        pass: "aa79949b06c1d9"
    }
});
class NodeMailerMailerAdapter {
    async sendMail({ body, subject }) {
        await transport.sendMail({
            from: 'me <carlos@email.com>',
            to: 'you <you@gmail.com>',
            subject,
            html: body,
        });
    }
}
exports.NodeMailerMailerAdapter = NodeMailerMailerAdapter;
