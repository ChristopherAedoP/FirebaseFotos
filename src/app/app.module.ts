import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';

import { App_Routes } from './app.routing';


import { FirebaseConfig } from './config/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CargaImagenesService } from './services/carga-imagenes.service';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    CargaComponent,
    FotosComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    App_Routes,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    CargaImagenesService
  ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
