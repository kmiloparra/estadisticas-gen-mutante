export class EstadisticasGenMutanteResponse  {
  constructor(public count_mutant_dna: number,public count_human_dna: number, public ratio: number) {}

  public getResultado(){
    return {
      statusCode:200,
      body:JSON.stringify({
        count_mutant_dna:this.count_mutant_dna,
        count_human_dna:this.count_human_dna,
        ratio:this.ratio
      })
    }
  }

}
