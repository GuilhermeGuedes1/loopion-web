type organization = {
  id: string;
  name: string;
};

type visits = {
  createdAt: string;
  createdById: string;
  customerId: string;
  id: string;
  organizationId: string;
  updatedAt: string;
};

export type CustomerType = {
  id: string;
  canContact: boolean;
  city: string;
  country: string;
  createdAt: string;
  daysSinceLastVisit: string;
  email: string;
  lastName: string;
  lastVisitAt: string;
  name: string;
  organization: organization[];
  organizationId: string;
  phone: string;
  state: string;
  updatedAt: string;
  visits: visits[];
};

export type CreateCustomerPayload = {
  name: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
};

export type MetaType = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type CustomersApiResponseType = {
  customersWithBusinessRules: CustomerType[];
  meta: MetaType | MetaType[];
};
