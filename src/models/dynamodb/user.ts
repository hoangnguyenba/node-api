import { BaseDynamoDbModel } from "./base";

import * as bcrypt from "bcrypt-nodejs";
import { config } from "../../config/config";

export enum UserType {
    Admin = 0,
    Employment
}

export enum UserStatus {
    USER_STATUS_OFFLINE = 0,
    USER_STATUS_ONLINE
}

export class UserDynamoDbModel extends BaseDynamoDbModel {
    _TABLE_NAME = "User";
    KEY = "id";

    constructor() {
        super();
    }

    check(params: any, callback: Function) {
        var id = params.username;
        var password = params.password;

        var paramsDynamo = {
            id: id
        };

        this.find(paramsDynamo, (error: any, result: any) => {

            if (Object.keys(result).length === 0) {
                return callback("Wrong username", null);
            }
            var user: any = result.Item;

            // Check password
            bcrypt.compare(password, user.password, function(err: any, result: any) {
                if (result) {
                    callback(null, user);
                } else {
                    callback("Wrong password", user);
                }
            });
        });
    }
}