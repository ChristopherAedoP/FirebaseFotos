import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { FileItem } from './../../models/File-Item';
import { Component } from '@angular/core';



@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent  {
  estaSobreDropZone = false;
  permiteCargar = true;

  archivos: FileItem[] = [];

  constructor(public _cis: CargaImagenesService) {}


  cargarImagenesFirebase() {

    this.permiteCargar = false;

    this._cis.cargarImagenesEnFirebase( this.archivos );

  }

  limpiarArchivos() {
    this.archivos = [];
    this.permiteCargar = true;
  }

  archivoSobreDropZone(e: boolean) {

    this.estaSobreDropZone = e;
  }
}
