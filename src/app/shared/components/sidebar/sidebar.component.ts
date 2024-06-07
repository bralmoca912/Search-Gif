import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }
  get tags(): string[] {
    return this.gifsService.tagHistory;
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

}