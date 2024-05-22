import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchboxComponent {

  // Accedemos a una instancia de un componente hijo y llamamos a sus métodos.
  @ViewChild('txtTagInput')
  // HTMLInputElement se utiliza para especificar que el ElementRef hace referencia a un elemento de entrada HTML (<input>).
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) { }

  searchTag() {
    // Obtenemos el nuevo tag.
    const newTag = this.tagInput.nativeElement.value;
    console.log({ newTag })
    // Llamo al servicio
    this.gifsService.searchTag(newTag);
    // Limpio la caja Input.
    this.tagInput.nativeElement.value = '';
  }
}
