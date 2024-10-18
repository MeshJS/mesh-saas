import express from "express";
import { meshUtilitiesSerializersController as serializer } from "../controllers/usersMeshUtilitiesController";
import { meshUtilitiesDeserializersController as deserializer } from "../controllers/usersMeshUtilitiesController";
import { meshUtilitiesResolversController as resolver } from "../controllers/usersMeshUtilitiesController";

const meshUtilitiesRouter = express.Router();

/**
 * @swagger
 * /users/meshUtilities/serializers/serializeNativeScript:
 *   post:
 *     summary: Serialize Native Script
 *     description: Serialize Native Script
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: The address associated with the native script
 *               nativeScript:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     description: The type of the native script
 *                   scripts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       oneOf:
 *                         - properties:
 *                             type:
 *                               type: string
 *                               description: The type of the script
 *                             slot:
 *                               type: string
 *                               description: The slot number (optional)
 *                         - properties:
 *                             type:
 *                               type: string
 *                               description: The type of the script
 *                             keyHash:
 *                               type: string
 *                               description: The key hash (optional)
 *     responses:
 *       200:
 *         description: Successfully serialized Native Script
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serializedScript:
 *                   type: string
 *                   description: The serialized Native Script
 */
meshUtilitiesRouter.post(
  "/serializers/serializeNativeScript",
  serializer.serializeNativeScript,
);

/**
 * @swagger
 * /users/meshUtilities/serializers/serializePlutusScript:
 *   post:
 *     summary: Serialize Plutus Script
 *     description: Serialize Plutus Script
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The Plutus script code to serialize
 *               version:
 *                 type: string
 *                 description: The version of the Plutus script
 *     responses:
 *       200:
 *         description: Successfully serialized Plutus Script
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                   description: The address associated with the serialized Plutus script
 */
meshUtilitiesRouter.post(
  "/serializers/serializePlutusScript",
  serializer.serializePlutusScript,
);

/**
 * @swagger
 * /users/meshUtilities/serializers/serializeAddressObject:
 *   post:
 *     summary: Serialize Address Object
 *     description: Serialize Address Object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PubKeyHash:
 *                type: string
 *               StakeCredential:
 *                type: string
 *     responses:
 *       200:
 *         description: Successfully serialized Plutus Script
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 address:
 *                   type: string
 */
meshUtilitiesRouter.post(
  "/serializers/serializeAddressObject",
  serializer.serializeAddressObject,
);

/**
 * @swagger
 * /users/meshUtilities/serializers/serializePoolId/{pubkeyhash}:
 *   get:
 *     summary: Serialize Pool ID
 *     description: Serializes a given public key hash into a pool ID.
 *     parameters:
 *       - in: path
 *         name: pubkeyhash
 *         required: true
 *         schema:
 *           type: string
 *         description: The public key hash to serialize
 *     responses:
 *       200:
 *         description: Successfully serialized Pool ID
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 poolId:
 *                   type: string
 *                   description: The serialized Pool ID
 */
meshUtilitiesRouter.get(
  "/serializers/serializePoolId/:pubkeyhash",
  serializer.serializePoolId,
);

/**
 * @swagger
 * /users/meshUtilities/serializers/serializeRewardAddress:
 *   post:
 *     summary: Serialize Reward Address
 *     description: Serializes a given script hash or key hash into a bech32 reward address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scriptHashOrKeyHash:
 *                 type: string
 *                 description: The script hash or key hash to serialize
 *               isScriptHash:
 *                 type: boolean
 *                 description: Whether the given hash is a script hash
 *               network:
 *                 type: string
 *                 description: The network to serialize the address for
 *     responses:
 *       200:
 *         description: Successfully serialized Reward Address
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 rewardAddress:
 *                   type: string
 *                   description: The serialized reward address
 */
meshUtilitiesRouter.post(
  "/serializers/serializeRewardAddress",
  serializer.serializeRewardAddress,
);

/**
 * @swagger
 * /users/meshUtilities/deserializers/deserializeAddress/{address}:
 *   get:
 *     summary: Deserialize Address
 *     description: Deserialize bech32 address into payment and staking parts, with visibility of whether they are script or key hash.
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address to serialize
 *     responses:
 *       200:
 *         description: Successfully serialized wallet address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pubKeyHash:
 *                   type: string
 *                   description: The public key hash of the address
 *                 scriptHash:
 *                   type: string
 *                   description: The script hash of the address (optional)
 *                 stakeCredentialHash:
 *                   type: string
 *                   description: The stake credential hash of the address
 *                 stakeScriptCredentialHash:
 *                   type: string
 *                   description: The stake script credential hash of the address (optional)
 */
meshUtilitiesRouter.get(
  "/deserializers/deserializeAddress/:address",
  deserializer.deserializeAddress,
);

/**
 * @swagger
 * /users/meshUtilities/deserializers/deserializeDatum/{cbor}:
 *   get:
 *     summary: Deserialize Datum
 *     description: Deserialize a CBOR-encoded datum into a JSON object.
 *     parameters:
 *       - in: path
 *         name: cbor
 *         required: true
 *         schema:
 *           type: string
 *         description: The CBOR-encoded datum to deserialize
 *     responses:
 *       200:
 *         description: Successfully deserialized datum
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 int:
 *                   type: number
 *                   description: The deserialized integer
 */
meshUtilitiesRouter.get(
  "/deserializers/deserializeDatum/:cbor",
  deserializer.deserializeDatum,
);

/**
 * @swagger
 * /users/meshUtilities/deserializers/deserializePoolId/{poolId}:
 *   get:
 *     summary: Deserialize Pool ID
 *     description: Deserialize a pool ID into a public key hash.
 *     parameters:
 *       - in: path
 *         name: poolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The pool ID to deserialize
 *     responses:
 *       200:
 *         description: Successfully deserialized Pool ID
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 pubkeyhash:
 *                   type: string
 *                   description: The deserialized public key hash
 */
meshUtilitiesRouter.get(
  "/deserializers/deserializePoolId/:poolId",
  deserializer.deserializePoolId,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolvePrivateKey:
 *   post:
 *     summary: Resolve Private Key
 *     description: Resolve a private key from a given public key hash.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *               description: The public key hash to resolve
 *     responses:
 *       200:
 *         description: Successfully resolved Private Key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 privateKey:
 *                   type: string
 *                   description: The resolved private key
 */
meshUtilitiesRouter.post(
  "/resolvers/resolvePrivateKey",
  resolver.resolvePrivateKey,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveDataHash/{datum}:
 *   get:
 *     summary: Resolve Data Hash
 *     description: Resolve a data hash from a given datum.
 *     parameters:
 *       - in: path
 *         name: datum
 *         required: true
 *         schema:
 *           type: string
 *         description: The datum to resolve
 *     responses:
 *       200:
 *         description: Successfully resolved Data Hash
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 dataHash:
 *                   type: string
 *                   description: The resolved data hash
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveDataHash/:datum",
  resolver.resolveDataHash,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveNativeScriptHash:
 *   post:
 *     summary: Resolve Native Script Hash
 *     description: Resolve a native script hash from a given address and native script.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: The address associated with the native script
 *               nativeScript:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     description: The type of the native script
 *                   scripts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       oneOf:
 *                         - properties:
 *                             type:
 *                               type: string
 *                               description: The type of the script
 *                             slot:
 *                               type: string
 *                               description: The slot number (optional)
 *                         - properties:
 *                             type:
 *                               type: string
 *                               description: The type of the script
 *                             keyHash:
 *                               type: string
 *                               description: The key hash (optional)
 *     responses:
 *       200:
 *         description: Successfully resolved Native Script Hash
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 nativeScriptHash:
 *                   type: string
 *                   description: The resolved native script hash
 */
meshUtilitiesRouter.post(
  "/resolvers/resolveNativeScriptHash",
  resolver.resolveNativeScriptHash,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveScriptHash/{scriptaddress}:
 *   get:
 *     summary: Convert script address to script hash
 *     description: Convert script address to script hash.
 *     parameters:
 *       - in: path
 *         name: scriptaddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The script address to resolve
 *     responses:
 *       200:
 *         description: Successfully resolved Script Hash
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 scriptHash:
 *                   type: string
 *                   description: The resolved script hash
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveScriptHash/:scriptaddress",
  resolver.resolveScriptHash,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveStakeAddress/{walletaddress}:
 *   get:
 *     summary: Convert wallet address to stake address
 *     description: Convert wallet address to stake address.
 *     parameters:
 *       - in: path
 *         name: walletaddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address to resolve
 *     responses:
 *       200:
 *         description: Successfully resolved Stake Address
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 stakeAddress:
 *                   type: string
 *                   description: The resolved stake address
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveStakeAddress/:walletaddress",
  resolver.resolveStakeAddress,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveFingerprint:
 *   post:
 *     summary: Convert asset policy ID and asset name to asset fingerprint
 *     description: Convert asset policy ID and asset name to asset fingerprint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyId:
 *                 type: string
 *                 description: The asset policy ID
 *               assetName:
 *                 type: string
 *                 description: The asset name
 *     responses:
 *       200:
 *         description: Successfully resolved Asset Fingerprint
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 assetFingerprint:
 *                   type: string
 *                   description: The resolved asset fingerprint
 */
meshUtilitiesRouter.post(
  "/resolvers/resolveFingerprint",
  resolver.resolveFingerprint,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveStakeKeyHash/{stakeaddress}:
 *   get:
 *     summary: Convert stake address to stake key hash
 *     description: Convert stake address to stake key hash.
 *     parameters:
 *       - in: path
 *         name: stakeaddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The stake address to resolve
 *     responses:
 *       200:
 *         description: Successfully resolved Stake Key Hash
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 stakeKeyHash:
 *                   type: string
 *                   description: The resolved stake key hash
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveStakeKeyHash/:stakeaddress",
  resolver.resolveStakeKeyHash,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveRepId/{scripthash}:
 *   get:
 *     summary: Resolve Rep ID
 *     description: Resolve a rep ID from a given script hash.
 *     parameters:
 *       - in: path
 *         name: scripthash
 *         required: true
 *         schema:
 *           type: string
 *         description: The script hash to resolve
 *     responses:
 *       200:
 *         description: Successfully resolved Rep ID
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 repId:
 *                   type: string
 *                   description: The resolved rep ID
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveRepId/:scripthash",
  resolver.resolveRepId,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveEpochNumber/{network}:
 *   get:
 *     summary: Get Epoch Number
 *     description: Get the current epoch number for the given network.
 *     parameters:
 *       - in: path
 *         name: network
 *         required: true
 *         schema:
 *           type: string
 *         description: The network to get the epoch number for
 *     responses:
 *       200:
 *         description: Successfully resolved Epoch Number
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               properties:
 *                 epochNumber:
 *                   type: number
 *                   description: The resolved epoch number
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveEpochNumber/:network",
  resolver.resolveEpochNumber,
);

/**
 * @swagger
 * /users/meshUtilities/resolvers/resolveSlotNumber/{network}:
 *   get:
 *     summary: Get Slot Number
 *     description: Get the current slot number for the given network.
 *     parameters:
 *       - in: path
 *         name: network
 *         required: true
 *         schema:
 *           type: string
 *         description: The network to get the slot number for
 *     responses:
 *       200:
 *         description: Successfully resolved Slot Number
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               properties:
 *                 slotNumber:
 *                   type: number
 *                   description: The resolved slot number
 */
meshUtilitiesRouter.get(
  "/resolvers/resolveSlotNumber/:network",
  resolver.resolveSlotNumber,
);

export default meshUtilitiesRouter;
