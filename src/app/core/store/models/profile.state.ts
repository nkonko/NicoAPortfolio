import { FullProfile } from "../../models/gitConnectProfile/fullProfile";
import { ApiError } from "../../models/apiError";
import { StateEvents } from "@core/models/state.events";

export interface ProfileState {
  profile?: FullProfile,
  loadError?: ApiError,
  event?: StateEvents
}
