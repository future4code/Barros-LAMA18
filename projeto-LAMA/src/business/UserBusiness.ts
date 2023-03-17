import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import {
  IncompleteUserDataLogin,
  IncompleteUserDataSignup,
  InvalidEmail,
  InvalidName,
  InvalidPassword,
} from "../error/UserErrors";
import { BaseError } from "../error/BaseError";

export class UserBusiness {
  
  public userDatabase = new UserDatabase();
  public idGenerator = new IdGenerator();
  public hashManager = new HashManager();
  public authenticator = new Authenticator();
  
  async createUser(user: UserInputDTO): Promise<string> {
    try {

      if (!user.name || !user.email || !user.password || !user.role) {
        throw new IncompleteUserDataSignup();
      }

      if (!user.email.includes("@")) {
        throw new InvalidEmail();
      }

      if (user.password.length < 6) {
        throw new InvalidPassword();
      }

      if (user.name.length < 3) {
        throw new InvalidName();
      }

      const id = this.idGenerator.generate();
      const hashPassword = await this.hashManager.hash(user.password);

      const newUser: User = User.toUserModel({
        id,
        name: user.name,
        email: user.email,
        password: hashPassword,
        role: user.role,
      });

      await this.userDatabase.createUser(newUser);

      const accessToken = this.authenticator.generateToken({ id, role: user.role });

      return accessToken;
    } catch (error: any) {
      throw new BaseError(error.code || 400, error.message);
    }
  }

  async getUserByEmail(user: LoginInputDTO): Promise<string> {
    try {
      if (!user.email || !user.password) {
        throw new IncompleteUserDataLogin();
      }

      if (!user.email.includes("@")) {
        throw new InvalidEmail();
      }

      if (user.password.length < 6) {
        throw new InvalidPassword();
      }

      const userFromDB = await this.userDatabase.getUserByEmail(user.email);

      const hashCompare = await this.hashManager.compare(
        user.password,
        userFromDB.getPassword()
      );

      const accessToken = this.authenticator.generateToken({
        id: userFromDB.getId(),
        role: userFromDB.getRole(),
      });

      if (!hashCompare) {
        throw new InvalidPassword();
      }

      return accessToken;
    } catch (error: any) {
      throw new BaseError(error.code || 400, error.message);
    }
  }
}
