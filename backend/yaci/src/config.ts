import dotenv from "dotenv";

dotenv.config();

export type Config = {
  yaciBaseUrl: string;
  yaciAdminUrl: string;
};

export const config: Config = {
  yaciBaseUrl: process.env.YACI_BASE_URL || "",
  yaciAdminUrl: process.env.YACI_ADMIN_URL || "",
};
