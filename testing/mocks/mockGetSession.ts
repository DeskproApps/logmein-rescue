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
      <getSession_V3Response xmlns="https://secure.logmeinrescue.com/API/API.asmx">
        <getSession_V3Result>getSession_OK</getSession_V3Result>
        <aSessions>
          <SESSION_V3>
            <iID>1053624555</iID>
            <bStatus>SESSION_PICKEDUP</bStatus>
            <sStatus>Active</sStatus>
            <iEntry>0</iEntry>
            <sEntry/>
            <iTechnician>26054541</iTechnician>
            <sTechnician>ilia makarov</sTechnician>
            <sStartTime>2/19/2024 2:27:27 PM</sStartTime>
            <iWaitingTimeInSec>46</iWaitingTimeInSec>
            <sCustomField0>Session for ticket #317</sCustomField0>
            <sCustomField1/>
            <sCustomField2/>
            <sCustomField3/>
            <sCustomField4/>
            <sCustomField5/>
            <sLanguage>en</sLanguage>
            <sTransferredTo/>
            <sTransferredComment/>
            <bIsLead>true</bIsLead>
            <bHandingOff>false</bHandingOff>
          </SESSION_V3>
        </aSessions>
      </getSession_V3Response>
    </soap:Body>
  </soap:Envelope>
`;

export const mockGetSession = get(
  convert(xml, { format: "object" }),
  ["soap:Envelope", "soap:Body", "getSession_V3Response"],
);
