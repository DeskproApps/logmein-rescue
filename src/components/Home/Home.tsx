import { Title } from "@deskpro/app-sdk";
import { useRegisterElements } from "../../hooks";
import { Container } from "../common";
import type { FC } from "react";

type Props = {
  //..
};

const Home: FC<Props> = () => {
  useRegisterElements(({ registerElement }) => {
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: { type: "logout" },
      }],
    });
  });

  return (
    <Container>
      <Title title="Home page"/>
    </Container>
  );
};

export { Home };
