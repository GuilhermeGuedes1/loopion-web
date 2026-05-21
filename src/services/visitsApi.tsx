import { api } from "./axios";
import { CreateVisitPayload, SuccessResponse } from "../types/visits";

export const createVisit = async (
  data: CreateVisitPayload,
): Promise<SuccessResponse> => {
  const response = await api.post<SuccessResponse>("/visits/create", data);

  return response.data;
};
