import { injectable } from "inversify";
import { CONSTANTS } from "../../../utils/constants";
import { DynamoAdapter } from "./dynamo-adapter";
import AWS from "aws-sdk";
import { EstadisticasGenMutanteResponse } from "../../../models/estadisticas-gen-mutante-response";

export { AWS };

@injectable()
export class DynamoAdapterImpl implements DynamoAdapter {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    AWS.config.update({ region: CONSTANTS.REGION });
    this.docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: CONSTANTS.API_VERSION });
  }

  public async consultar(): Promise<EstadisticasGenMutanteResponse> {
    const params = {
      TableName: CONSTANTS.TABLE_NAME,
    };
    let countMutante = 0;
    let countHumano = 0;
    let lastEvaluatedKey;

    try {
      do {
        const queryOutput = await this.docClient.scan(params).promise();
        countMutante += queryOutput.Items.filter((item) => item.esMutante == "true").length;
        countHumano += queryOutput.Items.filter((item) => item.esMutante == "false").length;
        lastEvaluatedKey = queryOutput.LastEvaluatedKey;
      } while (lastEvaluatedKey);
      countHumano = countHumano === 0 ? 1 : countHumano;
      console.log(
        "countMutante: ",
        countMutante,
        " countHumano: ",
        countHumano,
        " ratio",
        countMutante / countHumano,
      );

      return Promise.resolve(
        new EstadisticasGenMutanteResponse(countMutante, countHumano, countMutante / countHumano),
      );
    } catch (error) {
      console.log("error consultar: ", error);
      throw "Error Obteniendo la Data desde DynamoDB";
    }
  }
}
