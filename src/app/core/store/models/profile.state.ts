import { FullProfile } from "../../models/gitConnectProfile/fullProfile";
import { ApiError } from "../../models/apiError";

export interface ProfileState {
  profile?: FullProfile,
  loadError?: ApiError,
}
