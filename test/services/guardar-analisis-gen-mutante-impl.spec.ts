import "reflect-metadata";
import { EstadisticasGenMutanteHandler } from "../../src/services/estadisticas-gen-mutante-handler";
import { EstadisticasGenMutanteImpl } from "../../src/services/estadisticas-gen-mutante-impl";
import { CONSTANTS } from '../../src/utils/constants';

describe("EstadisticasGenMutanteImpl", () => {
  const dynamoAdapterSpy = jasmine.createSpyObj("DynamoAdapter", ["consultar"]);
  const consultarSpy = dynamoAdapterSpy.consultar as jasmine.Spy;

  let service: EstadisticasGenMutanteHandler;

  beforeEach(() => {
    service = new EstadisticasGenMutanteImpl(dynamoAdapterSpy);
  });

    it("consultar ok", (done) => {
      consultarSpy.and.returnValue(Promise.resolve(null));

      service.consultar().then((res) => {
        expect(res).toEqual(null);
        done();
      });
    });

  it("consultar error", (done) => {
    consultarSpy.and.returnValue(Promise.reject("ERROR"));

    service.consultar().catch((err) => {
      console.log("err :",err);
      expect(err.statusCode).toEqual(CONSTANTS.ERROR_CODE);
      done();
    });
  });
});
