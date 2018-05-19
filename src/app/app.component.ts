import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

    @ViewChild(MatMenuTrigger) animals: MatMenuTrigger;
  
    someMethod() {
      this.animals.openMenu();
    }
  
}
