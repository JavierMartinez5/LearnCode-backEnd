import { ReturnedJWT } from "src/features/auth/interfaces";

export interface RequestFromJWT {
  user: ReturnedJWT
}