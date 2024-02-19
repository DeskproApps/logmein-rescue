import { IDeskproClient } from "@deskpro/app-sdk";
import { AUTH_CODE_PATH } from "../../constants";

const removeAuthCodeService = (client: IDeskproClient) => {
  return client.deleteUserState(AUTH_CODE_PATH);
};

export { removeAuthCodeService };
