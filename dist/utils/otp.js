"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
exports.generateOTP = generateOTP;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("../constants/logger"));
const sendVerificationEmail = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: `"Codekpi" <${process.env.APP_EMAIL}>`,
        to: email,
        subject: "Your Verification Code",
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2563eb;">🔐 Verification Code</h2>
        <p>Here is your verification code:</p>
        <div style="background: #f3f4f6; border-radius: 8px; padding: 10px 20px; display: inline-block; font-size: 1.5em; letter-spacing: 2px; margin-top: 10px;">
          <strong>${code}</strong>
        </div>
        <p style="margin-top: 20px; color: #6b7280;">This code will expire in 10 minutes.</p>
      </div>
    `,
    };
    yield transporter.sendMail(mailOptions);
    logger_1.default.info("Verification email sent", { email });
});
exports.sendVerificationEmail = sendVerificationEmail;
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
