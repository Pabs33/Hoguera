import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Familias } from './components/familias-components/familias.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { NewFamilyComponentComponent } from './components/new-family-component/new-family-component.component';
import { FormsModule } from '@angular/forms';
import { ResumenComponent } from './components/resumen-component/resumen.component';
import { ResumenGeneralComponentComponent } from './components/resumen-general-component/resumen-general-component.component';

const appRoutes:Routes =[
  {path:'', component:HomeComponentComponent},
  {path:'nuevafamilia', component:NewFamilyComponentComponent},
  {path:'resumen', component:ResumenComponent},
  {path: 'resumenGeneral', component:ResumenGeneralComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    Familias,
    HomeComponentComponent,
    NewFamilyComponentComponent,
    ResumenComponent,
    ResumenGeneralComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
