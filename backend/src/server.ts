import app from "./app";
import { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";

dotenv.config();

// Exportando o Express como uma função handler para Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
