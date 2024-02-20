import type { Maybe } from "../types";

const getPinCode = (urlString?: string): Maybe<string> => {
  if (!urlString) {
    return null;
  }

  try {
    const url = new URL(urlString);
    return url.searchParams.get("Code");
  } catch (e) {
    return null;
  }
};

export { getPinCode };
