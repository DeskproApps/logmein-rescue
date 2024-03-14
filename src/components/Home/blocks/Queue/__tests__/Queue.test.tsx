import { get } from "lodash";
import { cleanup } from "@testing-library/react";
import { normalize } from "../../../../../services/logmein-rescue/getSessionService";
import { render, mockGetSessions } from "../../../../../../testing";
import { Queue } from "../Queue";
import type { Props } from "../Queue";

const mockSessions = normalize(get(mockGetSessions, ["aSessions", "SESSION_V3"]));

const renderQueue = (props?: Partial<Props>) => render((
  <Queue
    sessions={props?.sessions || mockSessions}
  />
), { wrappers: { theme: true } });

describe("Queue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderQueue();

    expect(await findByText(/My queue \(2\)/i)).toBeInTheDocument();
    expect(await findByText(/Session for ticket #215/i)).toBeInTheDocument();
    expect(await findByText(/Customer/i)).toBeInTheDocument();
  });

  test("shouldn't show \"No found\" if no sessions", async () => {
    const { findByText } = renderQueue({ sessions: [] });

    expect(await findByText(/My queue \(0\)/i)).toBeInTheDocument();
    expect(await findByText(/No Sessions found/i)).toBeInTheDocument();
  });
});
