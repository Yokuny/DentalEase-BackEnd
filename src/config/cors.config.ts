export const allowedOrigins = ["http://localhost:3000", "https://dental-ease.vercel.app"];

export const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
