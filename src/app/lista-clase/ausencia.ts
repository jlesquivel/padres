/**
 * Created by jose on 1/1/2017.
 */
export class Ausencia {

  constructor(public id: number,
    public carnet: string,
    public id_mat: number,
    public fecha: string,
    public leccion: string,
    public tipo: string,
    public observacion: string,
    public fecha_motivacion: string,
    public periodo: string) {
  }
}
