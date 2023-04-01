import { Component, OnInit } from '@angular/core';
import { FamiliasService } from 'src/app/services/familias.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  providers: [FamiliasService]
})
export class ResumenComponent implements OnInit {
  //familias
  public familias:Array<any> = [];
  public nombreFamiliaSeleccionada:any = "";
  public familiaSeleccionada:any = "";
  public selectedFamily: any = "";

  //Sorteo
  public decimos28:any = 0;
  public decimos64:any = 0;
  public papeletas28:any = 0;
  public papeletas64:any = 0;

  //lista de todos los datos de los sorteos
  public resumenCompleto: Array<any> = [];

  constructor(
    private familiasService: FamiliasService
  ) { }

  ngOnInit(): void {
    this.familiasService.getFamilias().subscribe((resp)=>{
      this.familias = resp;
      this.familiaSeleccionada = this.familias[0].NombreFamilia;
    });
  }

  onFamilyChange(selectedFamily: any){
    console.log(selectedFamily);
    this.familiaSeleccionada = selectedFamily;
  }

  botonPedirResumenFamilia(fechaDesde:any, fechaHasta:any){

    if(fechaDesde == "" || fechaHasta == "" || this.familiaSeleccionada == ""){
      window.alert("Debes introducir las dos fechas y la familia para poder hacer la consulta");
    }else{

      let fechaDesdeFormateada = formatDate(fechaDesde, 'YYYY-MM-dd', 'en-US');
      let fechaHastaFormateada = formatDate(fechaHasta, 'YYYY-MM-dd', 'en-US');

      this.familiasService.getFamilia(this.familiaSeleccionada).subscribe((respGetFamilias)=>{
        let id = respGetFamilias[0].IdFamilia;
        this.familiasService.postResumenCompleto(fechaDesdeFormateada, fechaHastaFormateada, id).subscribe((respPostResumenCompleto) =>{
          if(respPostResumenCompleto.result == 'KO'){
            window.alert('Ha habido un error pidiendo los datos');
          }else{
            console.log(respPostResumenCompleto);

            this.resumenCompleto = respPostResumenCompleto;
          }
        });

        this.familiasService.postResumen(fechaDesdeFormateada, fechaHastaFormateada, id).subscribe((respPostResumen)=>{
          if(respPostResumen.result == 'KO'){
            window.alert('Ha habido un error pidiendo los datos');
          }else{
            this.decimos28 = respPostResumen.TotalDecimos28;
            this.decimos64 = respPostResumen.TotalDecimos64;
            this.papeletas28 = respPostResumen.TotalPapeletas28;
            this.papeletas64 = respPostResumen.TotalPapeletas64;
          }
        });
      });
    }
  }

}
