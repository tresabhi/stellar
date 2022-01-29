type FuelTank = { a: number };
type NoseCone = { b: boolean };
type Engine = { c: string };
type Group = {
  d: object;

  parts: AnyPart[];
};

type AnyPart = FuelTank | NoseCone | Engine | Group;
