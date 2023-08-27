export interface PortfolioSettings {
  api: API;
  emailJs: emailJs
}

export interface API {
  profileApi: string;
}

export interface emailJs {
  serviceId: string,
    publicKey: string,
    templateId: string
}
