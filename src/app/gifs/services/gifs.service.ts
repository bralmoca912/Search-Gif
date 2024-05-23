import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// Hago que el servicio se pueda usar en toda la aplicación
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  ////* Variables, Constructor, permiso de acceso
  // Variables //
  public gifList: Gif[] = [];
  private _tagHistory: string[] = []
  private apikey: string = 'UxYbRhsZI6yILRVkYgMjqZTBo4Vt8QcZ';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  // Constructor //
  // La clase HttpClient es un servicio de Angular para realizar peticiones Http. Permite hacer solicitudes get, post, put, delete, etc., hacia servidores remotos.
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }

  // Permisos//
  // Permitimos acceder al historial de búsqueda de etiquetas.
  get tagHistory() {
    return [...this._tagHistory];
  }



  ////* Organización del historial
  private organizeHistory(tag: string) {
    // Conviertimos los caracteres del texto en minúsculas
    tag = tag.toLocaleLowerCase();
    // Flitramos los datos, borramos los repetidos.
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    // Reinsertamos el elemento borrado al inicio
    this._tagHistory.unshift(tag);
    // Limitamos el número de datos del historial
    this._tagHistory = this._tagHistory.splice(0, 10)
    // Llamamos el saveLocalStorage
    this.saveLocalStorage();
  }


  ////* Almacenamiento Local
  private saveLocalStorage(): void {
    // Establecemos o guardamos el Item 'history' de _tagHistory
    // Convertimos al objeto en string con JSON.stringify para usarlo en localStorage.
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }
  // Leemos del LocalStorage
  private loadLocalStorage(): void {
    // Si no hay data no hacemos nada
    if (!localStorage.getItem('history')) return;
    // Convertimos el string en un objeto con JSON.parse y le decimos que puede llegar a ser nulo
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    // Si no hay etiquetas no hace nada
    if (this._tagHistory.length === 0) return;
    // Realizamos automáticamente la búsqueda del tag del historial en la posición [0]
    this.searchTag(this._tagHistory[0]);
  }



  ////* Search Tag (Búsqueda de etiquetas)
  searchTag(tag: string): void {
    // Si no hay valores al presionar no afectamos al historial
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    // Construcción de los parámetros de la URL de las solicitudes.
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', 22)
      .set('q', tag)
    // Realizamos una solicitud Http get a la URL ${this.serviceUrl}/search.
    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      // Nos subscribimos a la respuesta de la solicitud y se ejecuta la función devolución de llamada.
      .subscribe(resp => {
        // Imprimimos
        this.gifList = resp.data;
        console.log({ gifs: this.gifList })
        // console.log(resp)
      });
  }

}
