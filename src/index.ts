import "reflect-metadata";
import { AppContainer } from "./inversify.config";
import { EstadisticasGenMutanteController } from "./controllers/estadisticas-gen-mutante-controller";
import { EstadisticasGenMutanteResponse } from "./models/estadisticas-gen-mutante-response";

let controller: EstadisticasGenMutanteController;

export async function handler(event: any) {

  controller =
    controller ||
    AppContainer.get<EstadisticasGenMutanteController>(EstadisticasGenMutanteController);
    try {
     let estadistica: EstadisticasGenMutanteResponse = await controller.eventHandler();
     return estadistica.getResultado();
    } catch (error) {
      throw error;
    }
  
    
    
 
}
