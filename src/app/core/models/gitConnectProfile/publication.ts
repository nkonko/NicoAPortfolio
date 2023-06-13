import { FullReleaseDateClass } from "./fullreleasedateclass";

export interface Publication {
  name:            string;
  publisher:       string;
  releaseDate:     Date;
  url:             string;
  summary:         string;
  fullReleaseDate: FullReleaseDateClass;
  website:         string;
}
