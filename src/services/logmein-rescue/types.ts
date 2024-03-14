export type Response<T> = Promise<T>;

export type LogMeInAPIError = string;

export type AuthCode = {
  requestAuthCodeResult:
    |"requestAuthCode_OK"
    |"requestAuthCode_Error"
    |"requestAuthCode_Invalid"
    |"requestAuthCode_PollRateExceeded";
  sAuthCode: string;
};

export type Account = {
  getAccount_v2Result:
    |"getAccount_OK"
    |"getAccount_Error"
    |"getAccount_NotLoggedIn"
    |"getAccount_Invalid_SecretAuthCode"
    |"getAccount_User_Deleted_Or_Disabled";
  iAccountID: number;
  sOrganization: string;
  iAdminID: number;
  iTechID: number;
  sEmail: string;
  bTcRunning: boolean;
};

export type NewSession = {
  requestInvitationLinkResult:
    |"requestInvitationLink_Error"
    |"requestInvitationLink_OK"
    |"requestInvitationLink_NotLoggedIn"
    |"requestInvitationLink_NotTechnician"
    |"requestInvitationLink_NoTechConsoleRunning"
    |"requestInvitationLink_OutOfPINCodes"
    |"requestInvitationLink_PollRateExceeded"
    |"requestInvitationLink_User_Is_Deleted"
    |"requestInvitationLink_Invalid_SecretAuthCode"
    |"requestInvitationLink_User_Deleted_Or_Disabled"
    |"requestInvitationLink_NoAccessToLens";
  sInvitationLink: string;
};

export type Status =
  |"SESSION_STARTING"
  |"SESSION_CONNECTING"
  |"SESSION_WAITING"
  |"SESSION_OFFLINE"
  |"SESSION_PICKEDUP"
  |"SESSION_CLOSEDBYCUSTOMER"
  |"SESSION_CLOSEDBYTECHNICIAN"
  |"SESSION_TRANSFERINGBUTNOTPICKEDUP"
  |"SESSION_REVOKED"
  |"SESSION_CLOSED_TRANSFERREDANOTHERTECH_WITHOUTPICKUP"
  |"SESSION_CUSTOMERLEFTSESSION_WASNOTPICKEDUP"
  |"SESSION_WAITINGTIMEOUT_PICKEDUP"
  |"SESSION_WAITINGTIMEOUT_NOTPICKEDUP"
  |"SESSION_SYSTEMTIMEOUT_PICKEDUP"
  |"SESSION_SYSTEMTIMEOUT_NOTPICKEDUP"
  |"SESSION_ABORTED_TECHDELETEDORDISABLED"
  |"SESSION_CLOSED_TRANSFERREDANOTHERTECH"
  |"SESSION_REBOOTING"
  |"SESSION_CONNECTIONPROBLEM"
  |"SESSION_ONHOLD"
  |"SESSION_ONHOLDBUTCUSTOMERLEFT"
  |"SESSION_TIMEOUT_SESSIONIDLETECHSIDE"
  |"SESSION_CUSTOMERLEFTSESSION_DURINGTRANSFER_WITHOUTPICKUP"
  |"SESSION_CUSTOMERLEFTSESSION_DURINGTRANSFER"
  |"SESSION_CLOSEDBYWAITINGCUSTOMER"
  |"SESSION_CLOSEDBYACTIVECUSTOMER"
  |"SESSION_CLOSED_DURINGRECONNECTING"
  |"SESSION_CLOSED_DURINGREBOOTING"
  |"SESSION_UACCESS_EXPIRED_WASPICKEDUPBEFORE"
  |"SESSION_UACCESS_EXPIRED_NOTPICKEDUPBEFORE"
  |"SESSION_UACCESS_REVOKEDBYCUSTOMER_WASPICKEDUPBEFORE"
  |"SESSION_UACCESS_REVOKEDBYCUSTOMER_NOTPICKEDUPBEFORE"
  |"SESSION_UACCESS_REVOKEDBYADMIN_WASPICKEDUPBEFORE"
  |"SESSION_UACCESS_REVOKEDBYADMIN_NOTPICKEDUPBEFORE"
  |"SESSION_TERMSANDCONDITIONSDECLINED"
  |"SESSION_TIMEOUT_TECHCONNECTIONLOSTORSESSIONWASNOTCLOSEDBYTECH"
  |"SESSION_STATUS_NOT_SUPPORTED_VALUE";

export type Session = {
  iID: number;
  bStatus: Status;
  sStatus: string;
  iEntry: number;
  sEntry?: string;
  iTechnician: number;
  sTechnician: string;
  sStartTime: string;
  iWaitingTimeInSec: number;
  sCustomField0: string;
  sLanguage: string;
  sTransferredTo?: string;
  sTransferredComment?: string;
  bIsLead: boolean;
  bHandingOff: boolean;
};

export type SessionResponse = {
  aSessions: {
    SESSION_V3: Session|Session[];
  };
  getSession_V3Result:
    |"getSession_OK"
    |"getSession_Error"
    |"getSession_NotLoggedIn"
    |"getSession_InvalidParam_NodeID"
    |"getSession_Invalid_SecretAuthCode"
    |"getSession_User_Deleted_Or_Disabled";
};
