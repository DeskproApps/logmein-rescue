import { get, map, isEmpty, isPlainObject } from "lodash";
import { create } from "xmlbuilder2";
import { baseRequest } from "./baseRequest";
import { LogMeInError } from "./LogMeInError";
import { placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Account, SessionResponse, Session } from "./types";

export const normalize = (sessions?: Session|Session[]): Session[] => {
  if (!isEmpty(sessions) && (isPlainObject(sessions) || Array.isArray(sessions))) {
    return map((isPlainObject(sessions) ? [sessions] : sessions), (session: Session) => ({
      iID: Number(session.iID),
      bStatus: session.bStatus,
      sStatus: session.sStatus,
      iEntry: Number(session.iEntry),
      iTechnician: Number(session.iTechnician),
      sTechnician: session.sTechnician,
      sStartTime: session.sStartTime,
      iWaitingTimeInSec: Number(session.iWaitingTimeInSec),
      sCustomField0: session.sCustomField0,
      sLanguage: session.sLanguage,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      bIsLead: session.bIsLead === "true",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      bHandingOff: session.bHandingOff === "true",
    }));
  }

  return [];
};

const getSessionService = (
  client: IDeskproClient,
  nodeId: Account["iTechID"],
) => {
  const endpoint = "getSession_V3";
  const xml = create(`
    <?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <getSession_V3 xmlns="https://secure.logmeinrescue.com/API/API.asmx">
          <iNodeID>${nodeId}</iNodeID>
          <sAuthCode>${placeholders.AUTH_CODE}</sAuthCode>
        </getSession_V3>
      </soap12:Body>
    </soap12:Envelope>
  `).end();

  return baseRequest<SessionResponse>(client, { endpoint, data: xml })
    .then((sessions) => {
      if (sessions.getSession_V3Result === "getSession_OK") {
        return normalize(get(sessions, ["aSessions", "SESSION_V3"]));
      } else {
        throw new LogMeInError({
          data: sessions.getSession_V3Result,
        });
      }
    });
};

export { getSessionService };
