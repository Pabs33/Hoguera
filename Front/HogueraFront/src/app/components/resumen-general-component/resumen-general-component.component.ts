import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
  selector: 'app-resumen-general-component',
  templateUrl: './resumen-general-component.component.html',
  styleUrls: ['./resumen-general-component.component.css']
})
export class ResumenGeneralComponentComponent implements OnInit {

  //Sorteo
  public decimos28:any = 0;
  public decimos64:any = 0;
  public papeletas28:any = 0;
  public papeletas64:any = 0;

  //Precios del sorteo
  public precioDecimos28:any = 0;
  public precioDecimos64:any = 0;
  public precioPapeletas28:any = 0;
  public precioPapeletas64:any = 0;

  public beneficioDecimos28:any = 0;
  public beneficioDecimos64:any = 0;
  public beneficioPapeletas28:any = 0;
  public beneficioPapeletas64:any = 0;

  public rifaPapeletas28:any = 0;
  public rifaPapeletas64:any = 0;

  constructor(private familiasService: FamiliasService) { }

  ngOnInit(): void {
  }


  botonPedirResumenGeneral(fechaDesde:any, fechaHasta:any){

    if(fechaDesde == "" || fechaHasta == ""){
      window.alert("Debes introducir dos fehcas para poder hacer la consulta");
    }else{
      let fechaDesdeFormateada = formatDate(fechaDesde, 'YYYY-MM-dd', 'en-US');
      let fechaHastaFormateada = formatDate(fechaHasta, 'YYYY-MM-dd', 'en-US');

      this.familiasService.postResumenGeneral(fechaDesdeFormateada, fechaHastaFormateada).subscribe((respPostResumenGeneral)=>{
        if(respPostResumenGeneral.result == 'KO'){
          window.alert('Ha habido un error pidiendo los datos');
        }else{
          this.decimos28 = respPostResumenGeneral.TotalDecimos28;
          this.decimos64 = respPostResumenGeneral.TotalDecimos64;
          this.papeletas28 = respPostResumenGeneral.TotalPapeletas28;
          this.papeletas64 = respPostResumenGeneral.TotalPapeletas64;

          //Calcular el precio y el beneficio
          let precioDecimo = 20;
          let beneficioDecimo = 3;
          let precioPapeleta = 2;
          let beneficioPapeleta = 0.2;
          let beneficioRifa = 0.5;

          this.precioDecimos28 = this.decimos28 * precioDecimo;
          this.precioDecimos64 = this.decimos64 * precioDecimo;
          this.precioPapeletas28 = this.papeletas28 * precioPapeleta;
          this.precioPapeletas64 = this.papeletas64 * precioPapeleta;

          this.beneficioDecimos28 = this.decimos28 * beneficioDecimo;
          this.beneficioDecimos64 = this.decimos64 * beneficioDecimo;
          this.beneficioPapeletas28 = Number((this.papeletas28 * beneficioPapeleta).toFixed(2));
          this.beneficioPapeletas64 = Number((this.papeletas64 * beneficioPapeleta).toFixed(2));

          this.rifaPapeletas28 = Number((this.papeletas28 * beneficioRifa).toFixed(2));
          this.rifaPapeletas64 = Number((this.papeletas64 * beneficioRifa).toFixed(2));
        }
      });
    }
  }
}
