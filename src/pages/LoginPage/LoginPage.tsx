import { useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { setAuthCodeService } from "../../services/deskpro";
import { loginService, getCurrentAccountService } from "../../services/logmein-rescue";
import { DEFAULT_ERROR, SOAP_ERRORS } from "../../constants";
import { getValues } from "../../components/LoginForm";
import { Login } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/LoginForm/types";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<Maybe<string>>(null);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client) {
      return Promise.resolve();
    }

    setError(null);

    return loginService(client, getValues(data))
      .then(({ sAuthCode }) => setAuthCodeService(client, sAuthCode))
      .then(() => getCurrentAccountService(client))
      .then(({ iAccountID }) => {
        if (iAccountID) {
          navigate("/home");
        } else {
          setError(DEFAULT_ERROR);
        }
      })
      .catch((err) => {
        setError(get(SOAP_ERRORS, ["authCode", err.data], DEFAULT_ERROR))
      });
  }, [client, navigate]);
  return (
    <Login onSubmit={onSubmit} error={error} />
  );
};

export { LoginPage };
