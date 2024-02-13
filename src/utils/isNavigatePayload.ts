import { has } from "lodash";
import type { EventPayload, NavigatePayload } from "../types";

const isNavigatePayload = (
  payload: EventPayload
): payload is NavigatePayload => {
  return has(payload, ["path"]);
};

export { isNavigatePayload };
