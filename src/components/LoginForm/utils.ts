import { z } from "zod";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const getInitValues = () => ({
  email: "",
  password: "",
});

const getValues = (data: FormValidationSchema) => ({
  sEmail: data.email,
  sPassword: data.password,
});

export { validationSchema, getInitValues, getValues };
