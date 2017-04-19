import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-praktikum-pj',
  templateUrl: './detail-praktikum-pj.component.html',
  styleUrls: ['./detail-praktikum-pj.component.css']
})
export class DetailPraktikumPjComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  idPraktikum : String;
  ngOnInit() {
    this.idPraktikum = this.route.snapshot.params['id_praktikum'];
    console.log(this.idPraktikum);
  }

}
