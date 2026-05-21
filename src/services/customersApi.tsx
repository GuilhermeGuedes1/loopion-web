import { api } from "./axios";
import {
  CustomersApiResponseType,
  CreateCustomerPayload,
} from "../types/customers";
import { SuccessResponse } from "../types/visits";

export const getCustomers = async (page = 1, search?: string) => {
  const customers = await api.get<CustomersApiResponseType>("/customers", {
    params: { page, ...(search && { search }) },
  });
  return customers.data;
};

export const createCustomer = async (
  data: CreateCustomerPayload,
): Promise<SuccessResponse> => {
  const response = await api.post<SuccessResponse>("/customers/register", data);
  return response.data;
};
