import { AxiosError } from "axios";

export const serverErr = (error: AxiosError): string[] => {
  if (error.response?.data && Array.isArray(error.response.data)) {
    return error.response.data.map((err: { message: string }) => err.message);
  }
  return ["An unexpected error occurred."];
};
