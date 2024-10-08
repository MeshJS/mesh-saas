// Custom middleware for validation
import { Request, Response, NextFunction } from "express";
// import type { FromSchema } from 'json-schema-to-ts';
// import {
//   IsString,
//   IsNotEmpty,
//   validate,
//   IsEnum,
//   IsArray,
//   MaxLength,
// } from 'class-validator';
// import { ExtensionType } from '../../models/exampleTx.model';
// import { paramValidationError } from '../../libs/error';

// const schema = {
//   type: 'object',
//   properties: {
//     domain: { type: 'string' },
//     wallet_address: { type: 'string' },
//     utxos: { type: 'array', items: { type: 'string' } },
//     collateral_utxos: { type: 'array', items: { type: 'string' } },
//     extension: { type: 'string' },
//   },
//   required: ['domain', 'wallet_address', 'utxos', 'collateral_utxos', 'extension'],
// } as const;

// class Param {
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(18)
//   domain: string;

//   @IsString()
//   wallet_address: string;

//   @IsArray()
//   utxos: string[];

//   @IsArray()
//   collateral_utxos: string[];

//   @IsEnum(ExtensionType)
//   extension: ExtensionType;
// }

// const validateParam = async (req: Request, res: Response, next: NextFunction) => {
//   const body: FromSchema<typeof schema> = req.body
//   const param = new Param();
//   param.domain = body.domain;
//   param.wallet_address = body.wallet_address;
//   param.utxos = body.utxos;
//   param.collateral_utxos = body.collateral_utxos;
//   param.extension = ExtensionType[body.extension];

//   const errors = await validate(param);
//   if (errors.length > 0) {
//     console.log(`validation error: ${errors}`);
//     paramValidationError(res)
//   } else {
//     next();
//   }
// }

// export { schema, validateParam }

//Write a middleware function to make sure all required fields of a transaction are shown with correct types in JSON file submitted by users

// const schema = {
//     type: "object",
//     properties: {
//       inputs: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             pubKeyTxIn: {
//               type: "object",
//               properties: {
//                 txIn: {
//                   type: "object",
//                   properties: {
//                     txHash: { type: "string" },
//                     txIndex: { type: "integer" },
//                     amount: {
//                       type: "array",
//                       items: {
//                         type: "object",
//                         properties: {
//                           unit: { type: "string" },
//                           quantity: { type: "string" },
//                         },
//                       },
//                     },
//                     address: { type: "string" },
//                     scriptTxIn:
//                   },
//                   required: ["txHash", "txIndex", "amount", "address"],
//                 },
//               },
//               required: ["txIn"],
//             },
//           },
//           required: ["pubKeyTxIn"],
//         },
//       },
//       outputs: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             address: { type: "string" },
//             amount: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   unit: { type: "string" },
//                   quantity: { type: "string" },
//                 },
//               },
//             },
//             datum: { type: ["string", "null"] },
//             referenceScript: { type: ["string", "null"] },
//           },
//           required: ["address", "amount", "datum", "referenceScript"],
//         },
//       },
//       collaterals: { type: "array", items: { type: "object" } },
//       requiredSignatures: { type: "array", items: { type: "object" } },
//       referenceInputs: { type: "array", items: { type: "object" } },
//       mints: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             scriptMint: { type: "object" },
//           },
//           required: ["scriptMint"],
//         },
//       },
//       changeAddress: { type: "string" },
//       metadata: { type: "array", items: { type: "object" } },
//       validityRange: {
//         type: "object",
//         properties: {
//           invalidBefore: { type: ["string", "null"] },
//           invalidHereafter: { type: ["string", "null"] },
//         },
//       },
//       certificates: { type: "array", items: { type: "object" } },
//       signingKey: { type: "array", items: { type: "object" } },
//       withdrawals: { type: "array", items: { type: "object" } },
//       network: { type: "string" },
//     },
//     required: ["inputs", "outputs", "changeAddress", "network"],
//   } as const;

// write a validation decorators to enforce additional validation based on certain conditions

// If pubKeyTxIn have scriptTxIn, collateral is required

// If mints have scriptMint, collateral is required

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
    return res
      .status(400)
      .json({
        error:
          "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
      });
  }

  next();
};

export { validateParam };
