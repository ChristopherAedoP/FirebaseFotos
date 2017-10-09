export class FileItem {

  public archivo: File;
  public nombre: string;
  public url: string;
  public estaSubiendo=  false;
  public progreso = 0;

  constructor(unArchivo: File) {
    this.archivo = unArchivo;
    this.nombre = unArchivo.name;
  }

}
