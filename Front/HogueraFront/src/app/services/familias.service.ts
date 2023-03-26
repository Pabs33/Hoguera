import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {


  constructor(
    private http: HttpClient
  ) { }

  getFamilias():Observable<any>{
    return this.http.get<any>('/api/familias');
  }

  getFamilia(familia:String):Observable<any>{
    return this.http.get<any>('/api/familias/byName/' + familia);
  }

  newFamilia(nombre:String):Observable<any>{
    console.log(nombre);
    return this.http.post<any>('/api/familias', nombre);
  }

  getSorteo(id:number, fecha:string):Observable<any>{
    return this.http.get<any>('/api/sorteo/' + id + '/' + fecha);
  }

  postSorteo(id:number, fecha:string):Observable<any>{
    let body = '{ "IdFamilia":'+ id + ', "FechaSorteo":"' + fecha + '", "Decimos28":0, "Decimos64":0, "Papeletas28":0, "Papeletas64":0 }';
    return this.http.post<any>('/api/sorteo', JSON.parse(body));
  }

  putSorteo(id:number, fecha:string, decimos28:number, decimos64:number, papeletas28:number, papeletas64:number):Observable<any>{
    let body = '{ "Decimos28":' + decimos28 + ', "Decimos64":' + decimos64 + ', "Papeletas28":' + papeletas28 + ', "Papeletas64":' + papeletas64 + ' }';
    return this.http.put<any>('/api/sorteo/' + id + '/' + fecha, JSON.parse(body));
  }

  postResumen(fechaDesde:any, fechaHasta:any, IdFamilia:number):Observable<any>{
    let body = '{ "IdFamilia" : ' + IdFamilia + ',"FechaDesde" : "' + fechaDesde + '","FechaHasta" : "' + fechaHasta + '"}';
    return this.http.post<any>('/api/sorteo/resumen', JSON.parse(body));
  }

  postResumenCompleto(fechaDesde:any, fechaHasta:any, IdFamilia:number):Observable<any>{
    let body = '{ "IdFamilia" : ' + IdFamilia + ',"FechaDesde" : "' + fechaDesde + '","FechaHasta" : "' + fechaHasta + '"}';
    return this.http.post<any>('/api/sorteo/resumenCompleto', JSON.parse(body));
  }

  postResumenGeneral(fechaDesde:any, fechaHasta:any):Observable<any>{
    let body = '{ "FechaDesde" : "' + fechaDesde + '","FechaHasta" : "' + fechaHasta + '"}';
    return this.http.post<any>("/api/sorteo/resumenGeneral", JSON.parse(body));
  }
}
