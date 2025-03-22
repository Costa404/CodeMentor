import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-popular-repos',
  templateUrl: './popular-repos.component.html',
  styleUrls: ['./popular-repos.component.css'],
  imports: [CommonModule],
})
export class PopularReposComponent implements OnInit, AfterViewInit {
  repositories: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPopularRepos();
  }

  fetchPopularRepos(): void {
    const apiUrl =
      'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10';

    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        this.repositories = data.items;
        console.log(this.repositories);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load popular repositories.';
        console.error(error);
      },
    });
  }

  ngAfterViewInit(): void {
    $('.slick-carousel').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next</button>',
    });
  }
}
