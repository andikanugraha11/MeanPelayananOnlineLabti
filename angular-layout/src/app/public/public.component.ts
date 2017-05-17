import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],

})
export class PublicComponent implements OnDestroy {
year:any;
  constructor() {
    document.body.className = 'public-login';
    const date = new Date();
    this.year = date.getFullYear();
    // setTimeout( () => this.ref.markForCheck(), 10);
   }

  ngOnDestroy(){
      document.body.className = '';
    }

}
