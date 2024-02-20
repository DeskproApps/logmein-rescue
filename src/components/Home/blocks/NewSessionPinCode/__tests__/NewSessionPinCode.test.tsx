import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../../testing";
import { NewSessionPinCode } from "../NewSessionPinCode";
import type { Props } from "../NewSessionPinCode";

const renderNewSessionPinCode = (props?: Partial<Props>) => render((
  <NewSessionPinCode
    newSessionInviteLink={props?.newSessionInviteLink || "https://secure.logmeinrescue.com/R?i=2&Code=100500"}
    onInsertLink={props?.onInsertLink || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("NewSessionForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText, findByRole } = renderNewSessionPinCode();

    expect(await findByText(/PIN: 100500/i)).toBeInTheDocument();
    expect(await findByText("https://secure.logmeinrescue.com/R?i=2&Code=100500")).toBeInTheDocument();
    expect(await findByRole("button", { name: "Insert link" })).toBeInTheDocument();
  });

  test("should trigger onInsertLink with invite link", async () => {
    const mockOnInsertLink = jest.fn();
    const { findByRole } = renderNewSessionPinCode({ onInsertLink: mockOnInsertLink });

    const button = await findByRole("button", { name: "Insert link" });
    await userEvent.click(button);

    expect(mockOnInsertLink).toHaveBeenCalledWith("https://secure.logmeinrescue.com/R?i=2&Code=100500");
  });
});
