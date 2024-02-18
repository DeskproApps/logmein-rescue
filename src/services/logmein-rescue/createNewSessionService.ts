import { create } from "xmlbuilder2";
import { baseRequest } from "./baseRequest";
import { LogMeInError } from "./LogMeInError";
import { placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Account, NewSession } from "./types";

const createNewSessionService = (
  client: IDeskproClient,
  nodeId: Account["iTechID"],
  sessionName: string,
  ticketId: string,
) => {
  const endpoint = "requestPINCodeV3";
  const xml = create(`
    <?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <requestPINCodeV3 xmlns="https://secure.logmeinrescue.com/API/API.asmx">
          <sAuthCode>${placeholders.AUTH_CODE}</sAuthCode>
          <nodeId>${nodeId}</nodeId>
          <sCField0>${sessionName}</sCField0>
          <sCField1>${ticketId}</sCField1>
        </requestPINCodeV3>
      </soap12:Body>
    </soap12:Envelope>
  `).end();

  return baseRequest<NewSession>(client, { endpoint, data: xml })
    .then((session) => {
      if (session.requestPINCodeV3Result === "requestPINCode_OK") {
        return session.sPINCode;
      } else {
        throw new LogMeInError({
          data: session.requestPINCodeV3Result,
        });
      }
    });
};

export { createNewSessionService };
