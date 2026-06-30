import { StateEvents } from "@core/models/state.events";
import { ApiError } from "@core/models/apiError";
import { Contact } from "./contact";

export interface ContactFormState {
  form?: Contact,
  event?: StateEvents,
  error?: ApiError
}
