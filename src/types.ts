import type { To } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context } from "@deskpro/app-sdk";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** SOAP types */
export type ApiRequestMethod = "POST";

/** Deskpro types */
export type Settings = {
  //..
};

export type TicketData = {
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
  },
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigatePayload = { type: "changePage", path: To };

export type LogoutPayload = { type: "logout" };

export type EventPayload =
  | NavigatePayload
  | LogoutPayload
;
