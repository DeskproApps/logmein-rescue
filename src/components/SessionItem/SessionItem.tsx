import {
  Title,
  TwoProperties,
  HorizontalDivider,
} from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { TIME_FORMAT } from "../../constants";
import type { FC } from "react";
import type { Session } from "../../services/logmein-rescue/types";

export type Props = {
  session: Session;
};

const SessionItem: FC<Props> = ({ session }) => (
  <>
    <Title
      title={session.sCustomField0}
      marginBottom={10}
    />
    <TwoProperties
      leftLabel="Session ID"
      leftText={session.iID}
      rightLabel="Status"
      rightText={session.sStatus}
    />
    <TwoProperties
      leftLabel="Technician"
      leftText={session.sTechnician}
      rightLabel="Start Time"
      rightText={`${format(session.sStartTime)} ${format(session.sStartTime, TIME_FORMAT)}`}
    />
    <HorizontalDivider style={{ marginBottom: 10 }}/>
  </>
);

export { SessionItem };
