import { get } from "lodash";
import { convert } from "xmlbuilder2";

const xml = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope
    xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  >
    <soap:Body>
      <requestAuthCodeResponse xmlns="https://secure.logmeinrescue.com/API/API.asmx">
        <requestAuthCodeResult>requestAuthCode_Invalid</requestAuthCodeResult>
      </requestAuthCodeResponse>
    </soap:Body>
  </soap:Envelope>
`;

export const mockAuthFail = get(
  convert(xml, { format: "object" }),
  ["soap:Envelope", "soap:Body", "requestAuthCodeResponse"],
);