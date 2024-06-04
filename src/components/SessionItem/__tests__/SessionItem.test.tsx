import { cleanup } from "@testing-library/react";
import { render, mockGetSession } from "../../../../testing";
import { SessionItem } from "../SessionItem";
import type { Props } from "../SessionItem";

const mockSession = mockGetSession.aSessions.SESSION_V3;

const renderSessionItem = (props?: Partial<Props>) => render((
  <SessionItem session={props?.session || mockSession}/>
), { wrappers: { theme: true } });

describe("NewSessionForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSessionItem();

    expect(await findByText(/1053624555/i)).toBeInTheDocument();
    expect(await findByText(/Active/i)).toBeInTheDocument();
    expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
    expect(await findByText(/19 Feb, 2024 14:27/i)).toBeInTheDocument();
  });
});
