/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

/** Deskpro */
export const APP_PREFIX = "logmein-rescue";

export const DEFAULT_ERROR = "There was an error!";

export const AUTH_CODE_PATH = "oauth2/auth_code";

export const placeholders = {
  AUTH_CODE: `[user[${AUTH_CODE_PATH}]]`,
};

/** LogMeIn Rescue */
export const SOAP_URL = "https://secure.logmeinrescue.com/api/API.asmx";

export const SOAP_ERRORS = {
  // auth code
  requestAuthCode_Invalid: "The password and email do not identify and authenticate a technician.",
  requestAuthCode_Error: "An unspecified error occurred, such as timeout.",

  // invitation link
  requestInvitationLink_NoTechConsoleRunning: "The technician is offline and the Technician Console is not running, but it is possible to request a session for an offline technician.",
  requestInvitationLink_NotLoggedIn: "Requesting a PIN code failed because the current user is no longer logged in.",
  requestInvitationLink_NotTechnician: "The PIN code was not requested by a technician.",
  requestInvitationLink_OutOfPINCodes: "There are no more PIN codes that can be generated.",
  requestInvitationLink_PollRateExceeded: "The specified interval of requesting a new PIN code is too short.",
  requestInvitationLink_Invalid_SecretAuthCode: "The authentication code is incorrect.",
  requestInvitationLink_User_Is_Deleted: "The user whose authorization code was specified is already deleted.",
  requestInvitationLink_User_Deleted_Or_Disabled: "The user whose authorization code was specified is already deleted or disabled.",
};
