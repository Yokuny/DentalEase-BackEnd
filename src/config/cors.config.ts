export const allowedOrigins = ["http://localhost:3000", "https://dental-ease.vercel.app", "https://www.dentalease.com.br"];

export const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
  allowedHeaders: ["Authorization", "Cookie", "Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
