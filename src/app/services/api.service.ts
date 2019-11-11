import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = "https://api.themoviedb.org/3";
  private apiKey: string = "c5850ed73901b8d268d0898a8a9d8bff";
  private genres: any[] = [];

  constructor(private http: HttpClient) {
    this.getGenres().subscribe((data: any) => {
      let arrayGenres = [];
      data.genres.forEach(function (value) {
         arrayGenres['' + value.id + ''] = value.name;
      });
      this.genres = arrayGenres;
    });
  }

  getData(complement: string) {
    const url = `${this.apiUrl + complement}&api_key=${this.apiKey}&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, '');
  }

  getDataMovie(complement: string) {
    const url = `${this.apiUrl + complement}?api_key=${this.apiKey}&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, '');
  }

  getDataPage(complement: string, page: string) {
    const url = `${this.apiUrl + complement}&api_key=${this.apiKey}&page=${page}&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, '');
  }

  getGenres() {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '');
  }

  getMovies() {
    return this.getData('/discover/movie?sort_by=release_date.desc').pipe(
      map((data: any) => data.results)
    );
  }

  getMoviesByName(name: string) {
    return this.getData(`/search/movie?query=${name}`).pipe(
      map((data: any) => data.results)
    );
  }

  getMoviesPage(page: string) {
    return this.getDataPage('/discover/movie?sort_by=release_date.desc', page).pipe(
      map((data: any) => data.results)
    );
  }

  getMovie(id: string) {
    return this.getDataMovie(`/movie/${id}`).pipe(
      map((data: any) => data)
    );
  }

  getMovieImage(item: any) {
    let urlMovieImage = 'http://image.tmdb.org/t/p/w400';
    if (item.poster_path) {
      return urlMovieImage + item.poster_path;
    } else if (item.backdrop_path) {
      return urlMovieImage + item.backdrop_path;
    } else {
      return 'assets/image/default-movie-poster.jpg';
    }
  }

  getMovieGenres(item: any) {
    let movieGenres = '';
    item.forEach(e => {
      if (movieGenres)
        movieGenres += ' | ';
      movieGenres += this.genres[e];
    });
    return movieGenres;
  }
}
