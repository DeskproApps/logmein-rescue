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
      <getAccount_v2Response xmlns="https://secure.logmeinrescue.com/API/API.asmx">
        <getAccount_v2Result>getAccount_OK</getAccount_v2Result>
        <iAccountID>3372132</iAccountID>
        <sOrganization>Deskpro</sOrganization>
        <iAdminID>26054540</iAdminID>
        <iTechID>26054541</iTechID>
        <sEmail>ilia.makarov@deskpro.com</sEmail>
        <bTcRunning>true</bTcRunning>
      </getAccount_v2Response>
    </soap:Body>
  </soap:Envelope>
`;
export const mockCurrentAccount = get(
  convert(xml, { format: "object" }),
  ["soap:Envelope", "soap:Body", "getAccount_v2Response"],
);
