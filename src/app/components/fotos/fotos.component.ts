import { FirebaseListObservable } from 'angularfire2/database';
import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { Component,  } from '@angular/core';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent {
  img: FirebaseListObservable<any[]>;
  imagenes: Array<any[]>;
  loading = true;
  constructor(public _cis: CargaImagenesService) {

    this.img = this._cis.listaUltimasImagen(10);


    this.img.subscribe(x => {
      this.imagenes = x;
      this.loading = false;
    });
  }


}
