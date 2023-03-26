import { Component, OnInit } from '@angular/core';
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
  selector: 'app-new-family-component',
  templateUrl: './new-family-component.component.html',
  styleUrls: ['./new-family-component.component.css'],
  providers: [FamiliasService]
})
export class NewFamilyComponentComponent implements OnInit {

  constructor(
    private familiasService: FamiliasService) { }

  ngOnInit(): void {
  }

  onSubmit(f: any){
    console.log(f.value.nombreFamilia);
    let nuevaFamiliaJSON = '{ "NombreFamilia": "' + f.value.nombreFamilia +'" }';
    this.familiasService.newFamilia(JSON.parse(nuevaFamiliaJSON)).subscribe((resp)=>{
      window.alert("Se ha registrado correctamente la nueva familia");
      console.log("se ha efectuado correctamente el POST");
      console.log(resp);
    });
  }
}
