import { create } from "xmlbuilder2";
import { baseRequest } from "./baseRequest";
import { LogMeInError } from "./LogMeInError";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AuthCode } from "./types";

type Data = {
  sEmail: string;
  sPassword: string;
};

const loginService = (client: IDeskproClient, data: Data) => {
  const endpoint = "requestAuthCode";
  const xml = create(`
    <?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
    >
      <soap12:Body>
        <${endpoint} xmlns="https://secure.logmeinrescue.com/API/API.asmx">
          <sEmail>${data.sEmail}</sEmail>
          <sPassword>${data.sPassword}</sPassword>
        </${endpoint}>
      </soap12:Body>
    </soap12:Envelope>
  `).end();

  return baseRequest<AuthCode>(client, { endpoint, data: xml })
    .then((auth) => {
      if (auth.requestAuthCodeResult === "requestAuthCode_OK") {
        return auth;
      } else {
        throw new LogMeInError({ data: auth.requestAuthCodeResult });
      }
    });
};

export { loginService };
