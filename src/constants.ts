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
  authCode: {
    requestAuthCode_Invalid: "The password and email do not identify and authenticate a technician.",
    requestAuthCode_Error: "An unspecified error occurred, such as timeout.",
  },
};
