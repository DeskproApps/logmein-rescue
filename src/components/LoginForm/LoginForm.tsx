import { useState, useEffect } from "react";
import { has } from "lodash";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, IconButton } from "@deskpro/deskpro-ui";
import { getInitValues, validationSchema } from "./utils";
import { Button, Label, ErrorBlock } from "../common";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const LoginForm: FC<Props> = ({ onSubmit, error }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {
    watch,
    register,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(),
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    setFocus("email")
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="email" label="Email" required>
        <Input
          id="email"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["email", "message"])}
          value={watch("email")}
          {...register("email")}
        />
      </Label>

      <Label htmlFor="password" label="Password" required>
        <Input
          id="password"
          type={visible ? "text" : "password"}
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["password", "message"])}
          value={watch("password")}
          style={{ paddingRight: 0 }}
          rightIcon={
            <IconButton
              onClick={() => setVisible(!visible)}
              minimal
              icon={visible ? faEyeSlash : faEye}
            />
          }
          {...register("password")}
        />
      </Label>

      <Button
        type="submit"
        text="Log In"
        disabled={isSubmitting}
        loading={isSubmitting}
      />
    </form>
  );
};

export { LoginForm };
