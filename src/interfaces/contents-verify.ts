import { NextFunction, Request, Response } from "express";

export interface InterfaceVerifyDatas {
  verifyContentsDatas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined>;
}
