import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();

const jwtAudience = process.env.AUTH0_AUDIENCE ?? "";
const jwtIssuerBaseUrl = process.env.AUTH0_MANAGEMENT_API_URL ?? "";

const jwtCheck = auth({
  audience: jwtAudience,
  issuerBaseURL: jwtIssuerBaseUrl,
  tokenSigningAlg: "RS256",
});

const AuthRouter = Router();

AuthRouter.get("/auth/authorize", jwtCheck, AuthController.authorize);

export { AuthRouter };
