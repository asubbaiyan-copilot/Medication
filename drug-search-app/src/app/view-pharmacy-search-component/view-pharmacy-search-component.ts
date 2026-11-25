import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-view-pharmacy-search-component',
  styleUrls: ['./view-pharmacy-search-component.css'],
  templateUrl: './view-pharmacy-search-component.html',
})
export class ViewPharmacySearchComponent  implements OnInit {
  id: string | null = null;
  parameterName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.parameterName = params.get('id');
      this.id = params.get('id');
    });
  }

}
