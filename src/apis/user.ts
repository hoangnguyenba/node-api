import { NextFunction, Request, Response, Router } from "express";
import { BaseApi } from "./api";


/**
 * / route
 *
 * @class User
 */
export class UserApi extends BaseApi {


  //set message
  users: Object = [
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
   * Create the apis.
   *
   * @class UserApi
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[UserApi::create] Creating user api.");

    router.route("/users")
      
      .get((req: Request, res: Response, next: NextFunction) => {
        new UserApi().getList(req, res, next);
      })

      .post((req: Request, res: Response, next: NextFunction) => {

      })


    router.route("/users/:user_id")

      .get((req: Request, res: Response, next: NextFunction) => {
        new UserApi().getUser(req, res, next);
      })

      .put((req: Request, res: Response, next: NextFunction) => {

      })

      .delete((req: Request, res: Response, next: NextFunction) => {

      })
  }

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
   * The home page route.
   *
   * @class UserApi
   * @method getList
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public getList(req: Request, res: Response, next: NextFunction) {

    // Send result
    this.send(req, res, this.users);
  }

  /**
   * The home page route.
   *
   * @class UserApi
   * @method getUser
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public getUser(req: Request, res: Response, next: NextFunction) {

    var r = this.users[req.params.user_id]

    // Send result
    this.send(req, res, r);
  }
}