import * as jwt from "jsonwebtoken";
import { MissingToken } from "../error/BandErrors";
export class Authenticator {
  public generateToken(input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
      const result = {
        id: payload.id,
        role: payload.role
      };
      return result;
      
    } catch (error:any) {
      throw new MissingToken()
    }
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}