import {
  Title,
  Property,
  TwoProperties,
  HorizontalDivider,
} from "@deskpro/app-sdk";
import type { FC } from "react";
import type { Session } from "../../services/logmein-rescue/types";

type Props = {
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
    <Property
      label="Technician"
      text={session.sTechnician}
    />
    <HorizontalDivider style={{ marginBottom: 10 }}/>
  </>
);

export { SessionItem };
