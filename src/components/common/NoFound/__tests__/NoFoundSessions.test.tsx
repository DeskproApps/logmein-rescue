import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { NoFoundSessions } from "../NoFoundSessions";
import type { Props } from "../NoFoundSessions";

const renderNoFoundSessions = (props?: Partial<Props>) => render((
  <NoFoundSessions
    sessions={props?.sessions as never}
    children={props?.children || "" as never}
  />
), { wrappers: { theme: true } });

describe("NoFoundSessions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderNoFoundSessions();
    expect(await findByText(/No found/i)).toBeInTheDocument();
  });

  test("should show \"No Sessions found\" if no issues", async () => {
    const { findByText } = renderNoFoundSessions({ sessions: [] });
    expect(await findByText(/No Sessions found/i)).toBeInTheDocument();
  });

  test("should show passing \"children\" if issues exist", async () => {
    const { findByText } = renderNoFoundSessions({
      sessions: [{ id: "001" }] as never[],
      children: () => "Some content",
    });

    expect(await findByText(/Some content/i)).toBeInTheDocument();
  });
});
