import { api } from "./api";

export type CreateVisitPayload = {
  customerId: string;
  visitedAt: string; // ISO string with time and timezone, e.g. 2026-05-18T20:00:00.000Z
};

export const createVisit = async (data: CreateVisitPayload) => {
  const response = await api.post("/visits/create", data);
  return response.data;
};
