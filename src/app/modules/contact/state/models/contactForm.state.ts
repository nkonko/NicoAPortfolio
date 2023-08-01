import { StateEvents } from "@core/models/state.events";
import { Contact } from "./contact";

export interface ContactFormState {
  form?: Contact,
  event?: StateEvents
}
