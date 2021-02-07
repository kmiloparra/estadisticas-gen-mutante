  import "reflect-metadata";
  import { DynamoAdapter } from "../../../../src/adapters/data-bases/dynamo/dynamo-adapter";
  import { DynamoAdapterImpl } from "../../../../src/adapters/data-bases/dynamo/dynamo-adapter-impl";
import { EstadisticasGenMutanteResponse } from '../../../../src/models/estadisticas-gen-mutante-response';

  describe("DynamoDB adapter test", async () => {
    
    let adapter: DynamoAdapter;

    beforeEach(() => {
      adapter = new DynamoAdapterImpl();
    });

    it("Test save ok", (done) => {

      const queryOutput ={Items:[{esMutante:"true"},{esMutante:"false"}]}
     
      adapter["docClient"]["scan"] = (params: any, callback) => {
        return { promise: () => new Promise((resolve) => resolve(queryOutput)) };
      };
      let msm ="getItem succeeded";
      adapter.consultar().then((res:EstadisticasGenMutanteResponse) => {
        expect(1).toEqual(res.ratio);
        done();
      });
    });

    it("Test consultar error connec dynamodb", (done) => {
      adapter["docClient"]["scan"] = (params: any, callback) => {
        return { promise: () => new Promise((resolve, reject) => reject(`Error`)) };
      };
      adapter.consultar().catch((err) => {
        console.log("err; ",err);
        expect(err).toEqual("Error Obteniendo la Data desde DynamoDB");
        done();
      });
    });

  });
