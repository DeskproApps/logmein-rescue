import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getCurrentAccountService } from "../../services/logmein-rescue";

type UseCheckAuth = () => void;

const useCheckAuth: UseCheckAuth = () => {
  const navigate = useNavigate();

  useInitialisedDeskproAppClient((client) => {
    getCurrentAccountService(client)
      .then(({ iAccountID }) => {
        navigate(iAccountID ? "/home" : "/login");
      })
      .catch(() => navigate("/login"));
  }, []);
};

export { useCheckAuth };
