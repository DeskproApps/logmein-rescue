import { Stack } from "@deskpro/deskpro-ui";
import { Property } from "@deskpro/app-sdk";
import { Button } from "../../../common";
import type { FC } from "react";

type Props = {
  newSessionPinCode: string;
  onInsertLink: (sessionLink: string) => void;
};

const NewSessionPinCode: FC<Props> = ({
  onInsertLink,
  newSessionPinCode,
}) => {
  const sessionLink = `https://secure.logmeinrescue.com/R?i=2&Code=${newSessionPinCode}`;

  return (
    <>
      <Property
        text={`PIN: ${newSessionPinCode}`}
        copyText={newSessionPinCode}
      />
      <Property
        label="Direct link"
        text={sessionLink}
        copyText={sessionLink}
      />
      <Stack justify="space-between" style={{ width: "100%", marginBottom: "14px" }}>
        <Button text="Insert link" intent="secondary" onClick={() => onInsertLink(sessionLink)} />
      </Stack>
    </>
  );
};

export { NewSessionPinCode };
