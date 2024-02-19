export type Response<T> = Promise<T>;

export type LogMeInAPIError = {
  //..
};

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
