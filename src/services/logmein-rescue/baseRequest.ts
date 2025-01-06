import { get, isEmpty, isString } from "lodash";
import { convert } from "xmlbuilder2";
import { proxyFetch } from "@deskpro/app-sdk";
import { SOAP_URL } from "../../constants";
import { getQueryParams } from "../../utils";
import { LogMeInError } from "./LogMeInError";
import type { Request } from "../../types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseRequest: Request = async (client, {
  data,
  endpoint,
  method = "POST",
  queryParams = {},
  headers: customHeaders,
}) => {
  const dpFetch = await proxyFetch(client);

  const params = getQueryParams(queryParams);
  const requestUrl = `${SOAP_URL}${isEmpty(params) ? "": `?${params}`}`;
  const options: RequestInit = {
    method,
    headers: {
      ...customHeaders,
    },
  };

  if (!isEmpty(data)) {
    options.body = isString(data) ? data as string : JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/soap+xml",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.text();
    } catch (e) {
      errorData = {};
    }

    throw new LogMeInError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    const xmlResult = await res.text();
    result = get(
      convert(xmlResult, { format: "object" }),
      ["soap:Envelope", "soap:Body", `${endpoint}Response`],
    );
  } catch (e) {
    return {};
  }

  return result;
};

export { baseRequest };
