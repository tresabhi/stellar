import { Blueprint } from "game/Blueprint";
import blueprintStore from "stores/blueprint";
import { UUID } from "types/Parts";
import { getPart } from "./getPart";

export const getParentID = (ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  const part = getPart(ID, blueprintState);

  if (part) return part.parentID;
};
