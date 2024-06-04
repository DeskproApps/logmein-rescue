import { normalize } from "../getSessionService";

const mockSessions = [
  {
    "iID": "1053412325",
    "bStatus": "SESSION_OFFLINE",
    "sStatus": "Offline",
    "iEntry": "0",
    "sEntry": {},
    "iTechnician": "26054541",
    "sTechnician": "ilia makarov",
    "sStartTime": "2/16/2024 6:20:05 PM",
    "iWaitingTimeInSec": "5996",
    "sCustomField0": "one more new",
    "sCustomField1": {},
    "sCustomField2": {},
    "sCustomField3": {},
    "sCustomField4": {},
    "sCustomField5": {},
    "sLanguage": "en",
    "sTransferredTo": {},
    "sTransferredComment": {},
    "bIsLead": "true",
    "bHandingOff": "false"
  },
  {
    "iID": "1053437109",
    "bStatus": "SESSION_WAITING",
    "sStatus": "Waiting",
    "iEntry": "0",
    "sEntry": {},
    "iTechnician": "26054541",
    "sTechnician": "ilia makarov",
    "sStartTime": "2/16/2024 8:38:45 PM",
    "iWaitingTimeInSec": "8",
    "sCustomField0": "rescue session | ticket 100500",
    "sCustomField1": {},
    "sCustomField2": {},
    "sCustomField3": {},
    "sCustomField4": {},
    "sCustomField5": {},
    "sLanguage": "en",
    "sTransferredTo": {},
    "sTransferredComment": {},
    "bIsLead": "true",
    "bHandingOff": "false"
  },
];

describe("getSessionService", () => {
  describe("normalize", () => {
    test("should return an array even if pass session object", () => {
      expect(normalize(mockSessions[0] as never)).toMatchObject([{
        iID: 1053412325,
        bStatus: "SESSION_OFFLINE",
        sStatus: "Offline",
        iEntry: 0,
        iTechnician: 26054541,
        sTechnician: "ilia makarov",
        sStartTime: "2/16/2024 6:20:05 PM",
        iWaitingTimeInSec: 5996,
        sCustomField0: "one more new",
        sLanguage: "en",
        bIsLead: true,
        bHandingOff: false,
      }]);
    });

    test("should return an array even if pass array", () => {
      expect(normalize(mockSessions as never)).toMatchObject([
        {
          iID: 1053412325,
          bStatus: "SESSION_OFFLINE",
          sStatus: "Offline",
          iEntry: 0,
          iTechnician: 26054541,
          sTechnician: "ilia makarov",
          sStartTime: "2/16/2024 6:20:05 PM",
          iWaitingTimeInSec: 5996,
          sCustomField0: "one more new",
          sLanguage: "en",
          bIsLead: true,
          bHandingOff: false,
        },
        {
          iID: 1053437109,
          bStatus: "SESSION_WAITING",
          sStatus: "Waiting",
          iEntry: 0,
          iTechnician: 26054541,
          sTechnician: "ilia makarov",
          sStartTime: "2/16/2024 8:38:45 PM",
          iWaitingTimeInSec: 8,
          sCustomField0: "rescue session | ticket 100500",
          sLanguage: "en",
          bIsLead: true,
          bHandingOff: false,
        }
      ]);
    });

    test.each(
      [undefined, null, "", 0, true, false, {}, []]
    )("wrong value: %p", (value) => {
      expect(normalize(value as never)).toStrictEqual([]);
    });
  });
});
