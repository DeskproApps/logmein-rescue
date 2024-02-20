import { unescape } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { Property } from "@deskpro/app-sdk";
import { getPinCode } from "../../../../utils";
import { Button } from "../../../common";
import type { FC } from "react";

export type Props = {
  newSessionInviteLink: string;
  onInsertLink: (sessionLink: string) => void;
};

const NewSessionPinCode: FC<Props> = ({
  onInsertLink,
  newSessionInviteLink,
}) => {
  const unescapeLink = unescape(newSessionInviteLink);
  const pinCode = getPinCode(unescapeLink);

  return (
    <>
      {pinCode && (
        <Property
          text={`PIN: ${pinCode}`}
          copyText={pinCode}
        />
      )}
      <Property
        label="Direct link"
        text={unescapeLink}
        copyText={unescapeLink}
      />
      <Stack justify="space-between" style={{ width: "100%", marginBottom: "14px" }}>
        <Button text="Insert link" intent="secondary" onClick={() => onInsertLink(unescapeLink)} />
      </Stack>
    </>
  );
};

export { NewSessionPinCode };
