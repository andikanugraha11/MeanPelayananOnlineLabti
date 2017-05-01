import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],

})
export class PublicComponent implements OnDestroy {

  constructor() {
    document.body.className = 'public-login';
    // setTimeout( () => this.ref.markForCheck(), 10);
   }

  ngOnDestroy(){
      document.body.className = '';
    }

}
