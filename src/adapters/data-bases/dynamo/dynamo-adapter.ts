
import { EstadisticasGenMutanteResponse } from '../../../models/estadisticas-gen-mutante-response';

export interface DynamoAdapter {
  consultar(): Promise<EstadisticasGenMutanteResponse>;
}
