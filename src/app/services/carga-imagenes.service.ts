import { error } from 'util';

import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';

import { FileItem } from './../models/File-Item';
import * as firebase from 'firebase';

@Injectable()
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';


  constructor(public _af: AngularFireDatabase
              ) {

              }
  listaUltimasImagen( numeroImagenes: number ): FirebaseListObservable<any[]> {
    return this._af.list(`${ this.CARPETA_IMAGENES }`, {
      query: {
        limitToLast: numeroImagenes
      }
    });
  }


  cargarImagenesEnFirebase( losArchivos: FileItem[] ) {
    console.log( losArchivos );

    const storageref = firebase.storage().ref();

    for (const item  of losArchivos){
      item.estaSubiendo = true;

      const uploadTask: firebase.storage.UploadTask = storageref
                                .child( `${ this.CARPETA_IMAGENES }/${ item.nombre }` )
                                .put(item.archivo);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100,
        (error ) => console.error('error al subir', error),
        ( ) => {
          item.url  = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;
          this.guardarImagen( { nombre: item.nombre , url: item.url  } );
          return undefined;
        }
      );
    }
  }

  private guardarImagen( imagen: any ) {
    this._af.list(`${this.CARPETA_IMAGENES}`  ).push( imagen ) ;
  }
}
