import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR, SOAP_ERRORS } from "../../constants";
import { LogMeInError } from "../../services/logmein-rescue";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
  const message = DEFAULT_ERROR;
  let consoleError = DEFAULT_ERROR;

  if (error instanceof LogMeInError) {
    consoleError = get(SOAP_ERRORS, [error.data], DEFAULT_ERROR);
  }

  // eslint-disable-next-line no-console
  console.error(consoleError);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
