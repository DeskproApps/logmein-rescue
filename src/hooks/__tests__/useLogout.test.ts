import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { removeAuthCodeService } from "../../services/deskpro";
import { useLogout } from "../useLogout";
import type { Result } from "../useLogout";

const renderLogoutHook = () => renderHook<Result, unknown>(() => useLogout());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../services/deskpro/removeAuthCodeService");

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should remove authCode and navigate to login page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAuthCodeService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderLogoutHook();

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAuthCodeService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should navigate to login page if remove authCode in store failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAuthCodeService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderLogoutHook();

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAuthCodeService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
