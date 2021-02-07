export const ADAPTERS = {
  DynamoAdapter: Symbol.for("DynamoAdapter"),
};

export const SERVICES = {
  ConnectService: Symbol.for("ConnectionService"),
  DisconnectService: Symbol.for("DisconnectionService"),
};


export const CONSTANTS = {
  EMPTY: "",
  OK: "OK",
  REGION: "us-east-2",
  API_VERSION: "2012-08-10",
  ERROR_MESSAGE: "No se pudo consultar la informacion",
  ERROR_CODE: 500,
  

  TABLE_NAME: "registro-gen",
  INDEX_NAME: "index-name",
  DOMAIN_NAME: "domain-name",
  STAGE: "stage",
};
