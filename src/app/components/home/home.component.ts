import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies: any[] = [];

  constructor(private api: ApiService) {
    this.api.getMovies().subscribe((data: any) => {
      this.movies = data;
      setTimeout(e => {
        let element = document.querySelector('#loading');
        element.classList.add('load');
        element = document.querySelector('body');
        element.classList.add('load');
      }, 1500);
    });
  }
}
