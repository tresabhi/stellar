Simple question:

How do I get rid of `Type alias 'X' circularly references itself` in this particular situation? I have an with parts that can be grouped together into "Group Parts" that can have more parts and groups inside of them.

Here's a boiled down example of the types...

```ts
type FuelTank = { ... };
type NoseCone = { ... };
type Engine = { ... };
type Group = {
  ...;

  parts: AnyPart[];
}

type AnyPart = FuelTank | NoseCone | Engine | Group;
```