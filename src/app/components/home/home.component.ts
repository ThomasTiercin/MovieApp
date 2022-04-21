import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowPlaying: any;
  tvShows: any;
  responsiveOptions;
  loader = true;

  constructor(
    private movies: MoviesService,
    private tv: TvService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 6,
        numScroll: 6
      },
      {
        breakpoint: '768px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '560px',
        numVisible: 2,
        numScroll: 2
      }
    ];
  }
  ngOnInit() {
    this.trendingMovies(1);
    this.tvShow(1);
  }

  trendingMovies(page: number) {
    this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.nowPlaying = res.results;
      this.loader = false;
    });
  }

  tvShow(page: number) {
    this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
      this.tvShows = res.results;
      this.loader = false;
    });
  }
}
