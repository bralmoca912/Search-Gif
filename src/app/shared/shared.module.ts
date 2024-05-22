import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchboxComponent } from './components/searchbox/search-box.component';



@NgModule({
  declarations: [
    SearchboxComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    SearchboxComponent
  ]
})
export class SharedModule { }
