import { HttpSuccessResponse, ITemplate } from "@/types";
import httpService from "./httpService";

export const getInvoiceTemplatesApi = async (): Promise<
  HttpSuccessResponse<ITemplate>
> => {
  return httpService.get("/invoice/templates");
};

export const postSaveInvoiceSettingApi = async (
  body: any
): Promise<HttpSuccessResponse<any>> => {
  return httpService.post("/invoice/settings", { body });
};
