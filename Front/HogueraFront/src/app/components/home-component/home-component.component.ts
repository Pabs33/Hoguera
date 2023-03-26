import { Component, OnInit } from '@angular/core';
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
  providers: [FamiliasService]
})
export class HomeComponentComponent implements OnInit {
  public familias:Array<any> = [];
  public nombreFamiliaSeleccionada:any = "";
  public familiaSeleccionada: any = "";
  public selectedFamily: any = "";

  constructor(
    private familiasService: FamiliasService) {
     }

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
}
