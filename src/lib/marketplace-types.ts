export type PartnerApplication = {
  id: string;
  createdAt: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  license: string;
  stateSlug: string;
  cities: string;
  tier: string;
  notes: string;
  status: "pending" | "approved" | "rejected";
};

export type TerritoryCell = {
  stateSlug: string;
  citySlug: string;
  exclusivePartnerId: string | null;
  preferredCount: number;
  connectCount: number;
  openForExclusive: boolean;
};
