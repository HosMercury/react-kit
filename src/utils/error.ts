import { AxiosError } from "axios";

export const serverErr = (error: AxiosError): string[] => {
  if (error.response?.data && Array.isArray(error.response.data)) {
    return error.response.data.map((err: { error: string }) => err.error);
  }
  return ["An unexpected error occurred."];
};
