'use strict';

require('dotenv').config();

const express    = require('express');
const rateLimit  = require('express-rate-limit');
const cors       = require('cors');
const helmet     = require('helmet');
const { Resend } = require('resend');
const validator  = require('validator');

// Fail fast if any required env var is missing
const REQUIRED_ENV = [
  'RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'ALLOWED_ORIGIN',
];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
  console.error('Missing env vars:', missing.join(', '));
  process.exit(1);
}

// Create Resend client once at startup
const resend = new Resend(process.env.RESEND_API_KEY);

const app  = express();
const PORT = process.env.PORT || 3000;

// Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
app.use(helmet());

// Trust proxy headers (for rate limiting behind a reverse proxy)
app.set('trust proxy', 1);

// Only accept requests from the portfolio origin
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Cap payload size to prevent abuse
app.use(express.json({ limit: '10kb' }));

// 1 submission per IP per 10 seconds
const contactLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Please wait 10 seconds before submitting again.' },
});

app.post('/contact', contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body;

  // Honeypot: real users leave this blank; bots fill it
  if (website) {
    return res.json({ success: true }); // silent success
  }

  // Presence check
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Sanitize
  const cleanName    = validator.trim(String(name));
  const cleanEmail   = validator.trim(String(email));
  const cleanMessage = validator.trim(String(message));

  // Validate
  if (!validator.isLength(cleanName, { min: 1, max: 100 })) {
    return res.status(400).json({ error: 'Name must be 1–100 characters.' });
  }
  if (!validator.isEmail(cleanEmail)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (!validator.isLength(cleanMessage, { min: 1, max: 2000 })) {
    return res.status(400).json({ error: 'Message must be 1–2000 characters.' });
  }

  try {
    const { error } = await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      process.env.CONTACT_TO_EMAIL,
      replyTo: cleanEmail,
      subject: `Portfolio Contact - ${cleanName}`,
      text:    `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });
    if (error) throw error;
    res.json({ success: true, message: 'Your message has been sent!' });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.get('/ping', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Contact server running on port ${PORT}`);
});
