import { NextFunction, Request, Response, Router } from "express";
import * as _ from 'lodash';
import { BaseApi } from "./api";

import { UserRepository } from "../repositories/user";
import { createToken } from "../middlewares/auth";



/**
 * / api
 *
 * @class AuthApi
 */
export class AuthApi extends BaseApi {

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
   * Create the apis.
   *
   * @class BaseApi
   * @method create
   */
  public addRouter(router: Router) {

    //log
    console.log("Add Api [Auth]");

    router.post("/login", (req: Request, res: Response, next: NextFunction) => {
        this.login(req, res, next);
    });

    router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
        this.logout(req, res, next);
    });
  }

  /**
   * The auth api
   *
   * @class AuthApi
   * @method login
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public login(req: Request, res: Response, next: NextFunction) {
      
      if(req.body.username == undefined || req.body.password == undefined) {
          return res.json({
                  status: false,
                  message: "Please provide username and password"
              });
      }

      let user = new UserRepository();

      let params = {
          username: req.body.username,
          password: req.body.password
      };


      user.check(params, (err, data) => {
          if(err) {
              res.json({
                  status: false,
                  message: err
              });
          } else {
              res.json({
                  status: true,
                  data: {
                      token: createToken(data)
                  }
              });
          }
      });
  }

  /**
   * The auth api
   *
   * @class AuthApi
   * @method logout
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public logout(req: Request, res: Response, next: NextFunction) {
  }
}