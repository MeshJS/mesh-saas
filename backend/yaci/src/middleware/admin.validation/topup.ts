// Custom middleware for validation
import { Request, Response, NextFunction } from "express";
import type { FromSchema } from "json-schema-to-ts";
import { IsString, IsNotEmpty, validate, IsNumber } from "class-validator";
import { paramValidationError } from "../../libs/error";

const schema = {
  type: "object",
  properties: {
    wallet_address: { type: "string" },
    ada_amount: { type: "number" },
  },
  required: ["wallet_address", "ada_amount"],
} as const;

class Param {
  @IsNotEmpty()
  @IsString()
  wallet_address: string;

  @IsNotEmpty()
  @IsNumber()
  ada_amount: number;
}

const validateParam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: FromSchema<typeof schema> = req.body;
  const param = new Param();
  param.wallet_address = body.wallet_address;
  param.ada_amount = body.ada_amount;

  const errors = await validate(param);
  if (errors.length > 0) {
    console.log(`validation error: ${errors}`);
    paramValidationError(res);
  } else {
    next();
  }
};

export { schema, validateParam };
