import size from "lodash/size";
import { NoFound } from "./NoFound";
import type { FC, ReactNode } from "react";
import type { Session } from "../../../services/logmein-rescue/types";

export type Props = {
  sessions: Session[],
  children?: (issues: Session[]) => ReactNode,
}

const NoFoundSessions: FC<Props> = ({ children, sessions }) => (
  <>
    {!Array.isArray(sessions)
      ? <NoFound/>
      : !size(sessions)
      ? <NoFound text="No Sessions found"/>
      : children && children(sessions)
    }
  </>
);

export { NoFoundSessions };
