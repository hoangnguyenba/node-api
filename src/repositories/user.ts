import { UserDynamoDbModel as UserModel } from "../models/dynamodb/user";
import { IUser } from "./user.interface";

export class UserRepository implements IUser {
    private userModel;

    constructor() {
        this.userModel = new UserModel();
    }

    check(params: any, callback: Function): void {
        this.userModel.check(params, callback);
    }
}