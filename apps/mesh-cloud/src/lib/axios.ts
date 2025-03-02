import axios from "axios";

const url = process.env.NEXT_PUBLIC_YACI_BACKEND_URL;

export const instance = axios.create({
  baseURL: url,
});

export async function post(url: string, data: any) {
  try {
    const response = await instance.post(url, data);
    return await response.data;
  } catch (e) {
    console.error(e);
  }
  return { success: false };
}
