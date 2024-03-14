import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../../testing";
import { NewSessionForm } from "../NewSessionForm";
import type { Props } from "../NewSessionForm";

const renderNewSessionForm = (props?: Partial<Props>) => render((
  <NewSessionForm
    ticketId={props?.ticketId || "317"}
    onCreate={props?.onCreate || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("NewSessionForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderNewSessionForm();

    expect(await findByText(/New Session Name/i)).toBeInTheDocument();
    expect(await findByText(/Create New Session/i)).toBeInTheDocument();
  });

  test("default session name", async () => {
    const mockOnCreate = jest.fn();
    const { findByRole } = renderNewSessionForm({ onCreate: mockOnCreate });

    const createButton = await findByRole("button", { name: "Create New Session" });
    await userEvent.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledWith("Session for ticket #317");
  });

  test("change session name", async () => {
    const mockOnCreate = jest.fn();
    const { container, findByRole } = renderNewSessionForm({ onCreate: mockOnCreate });
    const input = container.querySelector("input[id=sessionName]") as HTMLInputElement;
    const createButton = await findByRole("button", { name: "Create New Session" });

    await userEvent.clear(input);
    await userEvent.type(input, "new test session");
    await userEvent.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledWith("new test session");
  });
});
