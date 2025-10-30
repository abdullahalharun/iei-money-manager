export type DomainEvent = {
  name: string;
  payload: unknown;
};

export interface Plugin {
  name: string;
  onEvent?: (event: DomainEvent) => Promise<void> | void;
}

