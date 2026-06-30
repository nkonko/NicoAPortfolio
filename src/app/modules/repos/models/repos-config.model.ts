export interface RepoConfigEntry {
  name: string;
  enabled: boolean;
}

export interface ReposConfig {
  repos: RepoConfigEntry[];
}
