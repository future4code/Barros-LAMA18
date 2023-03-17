import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IncompleteUserDataLogin, IncompleteUserDataSignup, InvalidEmail, InvalidName, InvalidPassword } from "../error/UserErrors";
import { BaseError } from "../error/BaseError";

export class UserBusiness {

    async createUser(user: UserInputDTO):Promise<string> {
        try {7

            if (!user.name || !user.email || !user.password || !user.role) {
                throw new IncompleteUserDataSignup()
            }

            if (!user.email.includes("@")) {
                throw new InvalidEmail()
            }

            if (user.password.length < 6) {
                throw new InvalidPassword()
            }

            if (user.name.length < 3) {
                throw new InvalidName()
            }
    
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();
    
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);
    
            const newUser: User = User.toUserModel({
                id,
                name: user.name,
                email: user.email,
                password: hashPassword,
                role: user.role
            })
    
            const userDatabase = new UserDatabase();
            await userDatabase.createUser(newUser);
    
            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role });
    
            return accessToken;
            
        } catch (error:any) {
            throw new BaseError(error.code || 400, error.message)
        }

    }

    async getUserByEmail(user: LoginInputDTO) {
        try {

            if(!user.email || !user.password) {
                throw new IncompleteUserDataLogin()
            }
 
            if (!user.email.includes("@")) {
                throw new InvalidEmail()
            }

            if (user.password.length < 6) {
                throw new InvalidPassword()
            }

            const userDatabase = new UserDatabase();
            const userFromDB = await userDatabase.getUserByEmail(user.email);
    
            const hashManager = new HashManager();
            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());
    
            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
    
            if (!hashCompare) {
                throw new InvalidPassword();
            }
    
            return accessToken;
            
        } catch (error:any) {
            throw new BaseError(error.code || 400, error.message)
        }
    }
}