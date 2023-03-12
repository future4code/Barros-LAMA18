import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { BaseError } from "../error/BaseError";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "table_users_LAMA";

  public async createUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert(user)
        .into(UserDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new BaseError(error.code || 400, error.message || error.sqlMessage);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
  
      return User.toUserModel(result[0]); 
    } catch (error:any) {
      throw new BaseError(error.code || 400, error.message || error.sqlMessage);     
    }
  }

}
