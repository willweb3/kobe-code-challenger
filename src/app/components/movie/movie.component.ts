import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movie: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private wowService: NgwWowService) {
      window.scroll(0,0);
      this.wowService.init();
      this.activatedRoute.params.subscribe(params => {
        this.api.getMovie(params['id']).subscribe(movie => {
          this.movie = movie;
        });
        setTimeout(e => {
          let element = document.querySelector('#loading');
          element.classList.add('load');
        }, 1500);
    });
  }
  goToHome() {
    let element = document.querySelector('#loading');
    element.classList.remove('load');
    setTimeout(e => {
      this.router.navigate(["/"]);
    }, 1500);
  }
  showMovieGenres(item: any) {
    let movieGenres = '';
    if (item) {
      item.forEach(function (value) {
        if (movieGenres)
          movieGenres += ' | ';
        movieGenres += value.name;
      });
    }
    return movieGenres;
  }
}
