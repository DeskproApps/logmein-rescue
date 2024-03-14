import { size } from "lodash";
import { Title } from "@deskpro/app-sdk";
import { NoFoundSessions } from "../../../common";
import { SessionItem } from "../../../SessionItem";
import type { FC } from "react";
import type { Session } from "../../../../services/logmein-rescue/types";

export type Props = {
  sessions: Session[],
};

const Queue: FC<Props> = ({ sessions }) => {
  return (
    <>
      <Title title={`My queue (${size(sessions)})`}/>

      <NoFoundSessions sessions={sessions}>
        {(sessions) => sessions.map((session) => (
          <SessionItem key={session.iID} session={session}/>
        ))}
      </NoFoundSessions>
    </>
  );
};

export { Queue };
