import { Account } from "@iei/domain";
import { CreateAccountInput, UpdateAccountInput } from "./account.validation";

export interface AccountFilter {
  tenantId: string;
  id?: string;
}

export interface CreateAccountData extends CreateAccountInput {
  tenantId: string;
}

export interface UpdateAccountData extends UpdateAccountInput {
  id: string;
  tenantId: string;
}

export type { Account };

