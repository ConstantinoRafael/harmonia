import jwt from "jsonwebtoken";

export const generateToken = (payload: any) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || "default_secret";

  return jwt.verify(token, secret);
};
