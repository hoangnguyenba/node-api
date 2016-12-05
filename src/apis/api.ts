import { NextFunction, Request, Response, Router } from "express";

/**
 * Constructor
 *
 * @class BaseApi
 */
export class BaseApi {

  public dataName = "base";
  private falseMessage = {
    status: false,
    message: "This Api does not exits"
  }

  /**
   * Create the apis.
   *
   * @class BaseApi
   * @method create
   */
  public addRouter(router: Router) {

    //log
    console.log("Add Api [" + this.dataName + "]");

    router.route("/" + this.dataName)
      
      .get((req: Request, res: Response, next: NextFunction) => {
        this.list(req, res, next);
      })

      .post((req: Request, res: Response, next: NextFunction) => {
        this.create(req, res, next);
      });


    router.route("/" + this.dataName + "/:id")

      .get((req: Request, res: Response, next: NextFunction) => {
        this.read(req, res, next);
      })

      .put((req: Request, res: Response, next: NextFunction) => {
        this.update(req, res, next);
      })

      .delete((req: Request, res: Response, next: NextFunction) => {
        this.delete(req, res, next);
      });
  }

  /**
   * Constructor
   *
   * @class BaseApi
   * @constructor
   */
  constructor() {
    //initialize variables
  }


  /**
   * The api
   *
   * @class BaseApi
   * @method list
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public list(req: Request, res: Response, next: NextFunction) {
    this.send(req, res, this.falseMessage);
  }

  /**
   * The api
   *
   * @class BaseApi
   * @method create
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public create(req: Request, res: Response, next: NextFunction) {

    this.send(req, res, this.falseMessage);

  }

  /**
   * The home page route.
   *
   * @class BaseApi
   * @method read
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public read(req: Request, res: Response, next: NextFunction) {

    this.send(req, res, this.falseMessage);

  }

  /**
   * The api
   *
   * @class BaseApi
   * @method update
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public update(req: Request, res: Response, next: NextFunction) {

    this.send(req, res, this.falseMessage);

  }

  /**
   * The api
   *
   * @class BaseApi
   * @method delete
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public delete(req: Request, res: Response, next: NextFunction) {

    this.send(req, res, this.falseMessage);

  }

  /**
   * Send data to client.
   *
   * @class ApiRoute
   * @method send
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param result {Object} the object will be sent to client
   * @return void
   */
  public send(req: Request, res: Response, result?: any) {
    res.send(result);
  }
}