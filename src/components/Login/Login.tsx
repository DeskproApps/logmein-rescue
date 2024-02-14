import { Container } from "../common";
import { LoginForm } from "../LoginForm";
import type { FC } from "react";
import type { Props as FormProps } from "../LoginForm";

type Props = FormProps;

const Login: FC<Props> = (props) => {
  return (
    <Container>
      <LoginForm {...props} />
    </Container>
  );
};

export { Login };
