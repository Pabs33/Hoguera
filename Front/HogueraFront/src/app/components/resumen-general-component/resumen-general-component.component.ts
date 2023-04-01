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
        }
      });
    }
  }
}
