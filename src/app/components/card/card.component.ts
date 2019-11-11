import { Component, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { NgwWowService } from 'ngx-wow';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() items: any[] = [];
  private backupItems = [];
  private scroll = true;
  private infiniteScroll = true;
  private page = 2;

  constructor(
    private router: Router,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private wowService: NgwWowService) {
      this.wowService.init();
  }

  goToMovie(item: any) {
    let movieId;
    movieId = item.id;
    let element = document.querySelector('#loading');
    element.classList.remove('load');
    element = document.querySelector('body');
    element.classList.remove('load');
    setTimeout(e => {
      this.router.navigate(["/movie", movieId]);
    }, 1500);
  }
  onScroll() {
    if (this.scroll && this.infiniteScroll) {
      this.spinner.show();
      this.scroll = false;
      this.loadMoreMovies();
   }
  }
  loadMoreMovies() {
    this.api.getMoviesPage(this.page.toString()).subscribe((data: any) => {
      this.spinner.hide();
      this.items = this.items.concat(data);
      this.backupItems = this.items;
      this.scroll = true;
      this.page = this.page + 1;
    });
  }
  searchMovie(item) {
    if (item) {
      if (this.backupItems.length < 1)
        this.backupItems = this.items;
      this.infiniteScroll =  false;
      this.spinner.show();
      this.api.getMoviesByName(item).subscribe((data: any) => {
        this.items = data;
        if (this.items.length < 1) {
          let element = document.querySelector('#no-results');
          element.classList.add('show');
        } else {
          let element = document.querySelector('#no-results');
          element.classList.remove('show');
        }
        this.spinner.hide();
      });
    } else {
      this.items = this.backupItems;
      this.infiniteScroll =  true;
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    e.stopPropagation();
    let element = document.querySelector('#search-bar');
    let elementGoToTop = document.querySelector('#go-to-top');
    if (window.pageYOffset > 250) {
      element.classList.add('fixed');
      elementGoToTop.classList.add('show');
    } else {
      element.classList.remove('fixed');
      elementGoToTop.classList.remove('show');
    }
    if (window.pageYOffset > 150) {
      element.classList.add('no-padding-top');
    } else {
      element.classList.remove('no-padding-top');
    }
  }
  goToTop(e) {
    window.scroll(0,0);
  }
}
