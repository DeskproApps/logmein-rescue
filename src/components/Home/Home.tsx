import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, ErrorBlock } from "../common";
import { NewSessionForm, Queue, NewSessionPinCode } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Account, Session } from "../../services/logmein-rescue/types";

type Props = {
  account: Account;
  ticketId: string;
  sessions: Session[],
  error: Maybe<string|string[]>;
  onCreate: (sessionName: string) => void;
  newSessionInviteLink: Maybe<string>;
  onInsertLink: (sessionLink: string) => void;
};

const Home: FC<Props> = ({
  error,
  account,
  sessions,
  onCreate,
  ticketId,
  onInsertLink,
  newSessionInviteLink,
}) => {
  return (
    <Container>
      {account.iTechID === 0 && (
        <ErrorBlock
          text="The current user has no technician seat (or his technician seat is disabled)."
        />
      )}
      {error && <ErrorBlock text={error} />}

      {!newSessionInviteLink
        ? <NewSessionForm onCreate={onCreate} ticketId={ticketId}/>
        : <NewSessionPinCode newSessionInviteLink={newSessionInviteLink} onInsertLink={onInsertLink}/>
      }

      <HorizontalDivider style={{ margin: "15px 0" }}/>

      <Queue sessions={sessions}/>
    </Container>
  );
};

export { Home };
