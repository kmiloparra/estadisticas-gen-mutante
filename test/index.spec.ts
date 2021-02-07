import "reflect-metadata";
import { handler } from "../src/index";
import { EstadisticasGenMutanteController } from "../src/controllers/estadisticas-gen-mutante-controller";
import { EstadisticasGenMutanteResponse } from "../src/models/estadisticas-gen-mutante-response";

describe("index notification", () => {
  const event = {
    Records: [
      {
        body: JSON.stringify({
          Message: '{"clientId":"101010101","data":"informacion-1"}',
        }),
      },
    ],
  };

  beforeEach(() => {
    
  });

  it("handlre ok", (done) => {
    spyOn(EstadisticasGenMutanteController.prototype, "eventHandler").and.returnValue(
      Promise.resolve(new EstadisticasGenMutanteResponse(300,4,4)),
    );

    handler(event).then((res :any) => {
      console.log("res: ",res);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("handler fail", (done) => {
    spyOn(EstadisticasGenMutanteController.prototype, "eventHandler").and.returnValue(
      Promise.reject({code:500, msm:"test"}),
    );

    handler(event).catch((res :any) => {
      console.log("res: ",res);
      expect(res.code).toEqual(500);
      done();
    });
  });
});
