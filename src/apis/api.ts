import { NextFunction, Request, Response } from "express";

/**
 * Constructor
 *
 * @class BaseApi
 */
export class BaseApi {

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
   * Render a page.
   *
   * @class ApiRoute
   * @method send
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param result {Object} the object will be sent to client
   * @return void
   */
  public send(req: Request, res: Response, result: any) {
    res.send(result);
  }
}