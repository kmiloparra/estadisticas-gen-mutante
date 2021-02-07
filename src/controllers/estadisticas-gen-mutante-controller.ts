import { injectable, inject } from "inversify";
import { SERVICES } from "../utils/constants";
import { EstadisticasGenMutanteResponse } from "../models/estadisticas-gen-mutante-response";
import { EstadisticasGenMutanteHandler } from "../services/estadisticas-gen-mutante-handler";

@injectable()
export class EstadisticasGenMutanteController {
  constructor(
    @inject(SERVICES.ConnectService)
    private service: EstadisticasGenMutanteHandler,
  ) {}

  public async eventHandler(): Promise<EstadisticasGenMutanteResponse> {
    return await this.service.consultar();
  }
}
