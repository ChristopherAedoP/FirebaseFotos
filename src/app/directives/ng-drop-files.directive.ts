
import { Directive, EventEmitter, ElementRef , HostListener
  , Input , Output } from '@angular/core';


import { FileItem } from './../models/File-Item';

@Directive({ selector: '[appNgDropFiles]' })
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];
  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();

  constructor(public elemento: ElementRef) {}

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.archivoSobre.emit(true);
  }
  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    const Tranferencia = this._getTranferencia(event);
    Tranferencia.dropEfect = 'copy';

    this._prevenirYdetener(event);

    this.archivoSobre.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.archivoSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrod(event: any) {

    const Tranferencia = this._getTranferencia(event);
    if (!Tranferencia) {
      return;
    }

    this._agregarArchivo(Tranferencia.files);
    this.archivoSobre.emit(false);
    this._prevenirYdetener(event);
  }

  private _agregarArchivo(archivosLista: FileList) {


    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archTemporal = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado( archTemporal )) {
        const nuevoArchivo = new FileItem( archTemporal );
        this.archivos.push( nuevoArchivo );
      }

    }

    console.log(this.archivos);
  }

  private _archivoPuedeSerCargado(archivo: File) {
    if (
      !this._archivoYaFueDroppeado(archivo.name) &&
      this._esImagen(archivo.type)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private _getTranferencia(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }
  private _prevenirYdetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado(nombreArchivo: string): boolean {
    // tslint:disable-next-line:forin
    for (const i in this.archivos) {
      const arch = this.archivos[i];

      if (arch.archivo.name === nombreArchivo) {
        console.log('Archivo ya existe ', nombreArchivo);
        return true;
      }
    }

    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return tipoArchivo === '' || tipoArchivo === undefined
      ? false
      : tipoArchivo.startsWith('image');
  }
}
