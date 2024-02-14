import { IDeskproClient } from "@deskpro/app-sdk";
import { AUTH_CODE_PATH } from "../../constants";

const setAuthCodeService = (client: IDeskproClient, token: string) => {
  return client.setUserState(AUTH_CODE_PATH, token, { backend: true });
};

export { setAuthCodeService };
