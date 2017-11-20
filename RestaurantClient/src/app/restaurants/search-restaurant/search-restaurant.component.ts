import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css']
})
export class SearchRestaurantComponent implements OnInit {

  constructor(private router: Router,
              private route:  ActivatedRoute) { }

  ngOnInit() {
  }

  public create() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

}
