import "reflect-metadata";
import { EstadisticasGenMutanteController } from "../../src/controllers/estadisticas-gen-mutante-controller";
import { EstadisticasGenMutanteResponse } from "../../src/models/estadisticas-gen-mutante-response";

describe("EstadisticasGenMutanteController", () => {
  const serviceSpy = jasmine.createSpyObj("EstadisticasGenMutanteHandler", ["consultar"]);
  const consultarSpy = serviceSpy.consultar as jasmine.Spy;
  let controller: EstadisticasGenMutanteController;

  beforeEach(() => {
    controller = new EstadisticasGenMutanteController(serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("eventHandler ok", (done) => {
    const response = new EstadisticasGenMutanteResponse(200,200,2);
    const result = Promise.resolve(response);
    
    consultarSpy.and.returnValue(result);

    controller.eventHandler().then((data) => {
      expect(data).toEqual(response);
      done();
    });
  });

  it("eventHandler error", (done) => {
    const result = Promise.reject("Connection error");
    consultarSpy.and.returnValue(result);
    controller.eventHandler().catch((err) => {
      expect(err).toEqual("Connection error");
      done();
    });
  });
});
