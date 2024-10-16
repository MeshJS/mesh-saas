import { Request, Response, NextFunction } from "express";

const validateParam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  // Check if any input has scriptTxIn
  const hasScriptTxIn = body.inputs.some((input: any) => input.scriptTxIn);

  // Check if any mint has scriptSource
  const hasScriptSourceInMints = body.mints.some(
    (mint: any) => mint.scriptSource,
  );

  // If either condition is true, collaterals cannot be null
  if (
    (hasScriptTxIn || hasScriptSourceInMints) &&
    (!body.collaterals || body.collaterals.length === 0)
  ) {
    return res.status(400).json({
      error:
        "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
    });
  }

  next();
};

export { validateParam };
