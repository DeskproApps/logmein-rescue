import { useCallback } from "react";
import { has } from "lodash";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@deskpro/deskpro-ui";
import { Button, Label } from "../../../common";
import type { FC } from "react";

type Props = {
  ticketId: string;
  onCreate: (sessionName: string) => void;
};

const validationSchema = z.object({
  sessionName: z.string(),
});

export type FormValidationSchema = z.infer<typeof validationSchema>;

const NewSessionForm: FC<Props> = ({ onCreate, ticketId }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: {
      sessionName: `Session for ticket #${ticketId}`
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = useCallback((values: FormValidationSchema) => {
    return onCreate(values.sessionName);
  }, [onCreate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="sessionName" label="New Session Name" required>
        <Input
          id="sessionName"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["sessionName", "message"])}
          value={watch("sessionName")}
          {...register("sessionName")}
        />
      </Label>

      <Button
        type="submit"
        text="Create New Session"
        intent="secondary"
        disabled={isSubmitting}
        loading={isSubmitting}
      />
    </form>
  );
};

export { NewSessionForm };
