import { NextFunction, Request, Response, Router } from "express";
import * as _ from 'lodash';
import { BaseApi } from "./api";


/**
 * / api
 *
 * @class User
 */
export class UserApi extends BaseApi {

  public dataName = "users";


  //set message
  users: [any] = [
    {
      "id"  : "1",
      "name": "Hoang Nguyen"
    },
    {
      "id"  : "2",
      "name": "Songoku"
    }
  ];

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The user api
   *
   * @class UserApi
   * @method read
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public read(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id;
    if(id in this.users) {
      var r = this.users[req.params.id];
      // Send result
      this.send(req, res, {
        status: true,
        data: r
      });
    } else {
      var r: any = {
        "status": false,
        "message": "User does not exist"
      };

      this.send(req, res, r);
    }

  }

  /**
   * The user api
   *
   * @class UserApi
   * @method create
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public create(req: Request, res: Response, next: NextFunction) {
    let id = this.users.length;
    this.users.push({id: id, name: req.body.name});
    this.send(req, res, {
      status: true
    });
  }
}