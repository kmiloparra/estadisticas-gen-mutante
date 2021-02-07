import { injectable, inject } from "inversify";
import { ADAPTERS, CONSTANTS } from "../utils/constants";
import { DynamoAdapter } from "../adapters/data-bases/dynamo/dynamo-adapter";
import { EstadisticasGenMutanteHandler } from "./estadisticas-gen-mutante-handler";

@injectable()
export class EstadisticasGenMutanteImpl implements EstadisticasGenMutanteHandler {
  constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoAdapter) {}

  public async consultar(): Promise<any> {
    try {
      return await this.dynamoAdapter.consultar();
    } catch (err) {
      console.error(err);
        throw {
          statusCode: CONSTANTS.ERROR_CODE,
          body: JSON.stringify({ mensaje:CONSTANTS.ERROR_MESSAGE}),
        }
    }
  }
}
