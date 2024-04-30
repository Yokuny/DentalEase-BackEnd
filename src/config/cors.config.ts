export const allowedOrigins = ["http://localhost:3000", "https://dental-ease.vercel.app", "https://www.dentalease.com.br"];

export const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
