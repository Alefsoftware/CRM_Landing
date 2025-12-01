import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-client-reviews',
	standalone: true,
	imports: [CommonModule, HttpClientModule, CarouselModule],
	templateUrl: './client-reviews.component.html',
	styleUrls: ['./client-reviews.component.scss']
})
export class ClientReviewsComponent implements OnInit {
	clientReviews: any[] = [];
	loading = true;

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
			.subscribe(res => {
				this.clientReviews = res?.data?.client_reviews || [];
				this.loading = false;
			});
	}

	clientReviewsSlides: OwlOptions = {
		nav: false,
		loop: true,
		margin: 25,
		dots: true,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		],
		responsive: {
			0: { items: 1 },
			576: { items: 1 },
			768: { items: 2 },
			992: { items: 3 },
			1200: { items: 3 }
		}
	};
}
