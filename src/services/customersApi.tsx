import { api } from "./api";
import {
  CustomersApiResponseType,
  CreateCustomerPayload,
} from "../types/customers";

export const getCustomers = async (page = 1) => {
  const customers = await api.get<CustomersApiResponseType>("/customers", {
    params: { page },
  });
  console.log(customers.data);
  return customers.data;
};

export const createCustomer = async (data: CreateCustomerPayload) => {
  const response = await api.post("/customers/register", data);
  return response.data;
};
