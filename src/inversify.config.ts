import { Container } from "inversify";

import { SERVICES } from "./utils/constants";
import { ADAPTERS } from "./utils/constants";
import { EstadisticasGenMutanteController } from "./controllers/estadisticas-gen-mutante-controller";
import { EstadisticasGenMutanteImpl } from "./services/estadisticas-gen-mutante-impl";
import { DynamoAdapterImpl } from "./adapters/data-bases/dynamo/dynamo-adapter-impl";
import { DynamoAdapter } from "./adapters/data-bases/dynamo/dynamo-adapter";
import { EstadisticasGenMutanteHandler } from "./services/estadisticas-gen-mutante-handler";

const AppContainer: Container = new Container();
AppContainer.bind<EstadisticasGenMutanteController>(EstadisticasGenMutanteController).to(
  EstadisticasGenMutanteController,
);
AppContainer.bind<EstadisticasGenMutanteHandler>(SERVICES.ConnectService).to(
  EstadisticasGenMutanteImpl,
);
AppContainer.bind<DynamoAdapter>(ADAPTERS.DynamoAdapter).to(DynamoAdapterImpl);

export { AppContainer };
