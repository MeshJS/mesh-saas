import { Request } from "express";
export * from "./get";
export * from "./post";

export function checkHeader(req: Request) {
  const key = req.get("key");
  if (key === undefined) return false;
  if (key != "meshjs.dev") return false;
  return true;
}
