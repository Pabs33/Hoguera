import { formatDate } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { waitForAsync } from "@angular/core/testing";
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
    selector: 'familias',
    templateUrl:'./familias.component.html',
    providers: [FamiliasService]
})
export class Familias implements OnInit{

    //TODO Arreglar este error, por alguna razón no le llega el nombre

    @Input() familia: any;
    @Input() nombre: any;
    decimos28:any;
    decimos64:any;
    papeletas28:any;
    papeletas64:any;


    constructor(
        private familiasService: FamiliasService) { }

    ngOnInit(): void{
        this.decimos28 = 0;
        this.decimos64 = 0;
        this.papeletas28 = 0;
        this.papeletas64 = 0;
    }

    //Boton pedir datos
    pedirDatos(fecha:any,){
        let fechaFormateada = formatDate(fecha, 'YYYY-MM-dd', 'en-US');
        let id = 0;
        this.familiasService.getFamilia(this.nombre).subscribe((respGetFamilias)=>{
            
            id = respGetFamilias[0].IdFamilia;

            this.familiasService.getSorteo(id, fechaFormateada.toString()).subscribe((respGetSorteos)=>{
                if(respGetSorteos.length == 0){
                    this.familiasService.postSorteo(id, fechaFormateada.toString()).subscribe((respPostSorteo =>{
                        if(respPostSorteo.result == 'KO'){
                            window.alert('Ha habido un error creando el sorteo');
                        }
                        this.decimos28 = 0;
                        this.decimos64 = 0;
                        this.papeletas28 = 0;
                        this.papeletas64 = 0;
                    }));
                    
                }else{
                    let sorteo = respGetSorteos[0];

                    this.decimos28 = sorteo.Decimos28;
                    this.decimos64 = sorteo.Decimos64;
                    this.papeletas28 = sorteo.Papeletas28;
                    this.papeletas64 = sorteo.Papeletas64;
                }
            });
        });
        
    }

    //Boton para subir los datos a la BBDD
    subirDatos(fecha:any){
        let fechaFormateada = formatDate(fecha, 'YYYY-MM-dd', 'en-US');
        let id = 0;
        
        this.familiasService.getFamilia(this.nombre).subscribe((respGetFamilias)=>{
            
            id = respGetFamilias[0].IdFamilia;
            this.familiasService.putSorteo(id, fechaFormateada, this.decimos28, this.decimos64, this.papeletas28, this.papeletas64).subscribe((respPutSorteo)=>{
                console.log(respPutSorteo.result);
                if(respPutSorteo.result == 'OK'){
                    window.alert('Se han actualizado los datos correctamente');
                }else{
                    window.alert('Ha habido un error subiendo los datos, por favor vuelva a intentarlo mas tarde');
                }
            });
            
        });
        
    }
}