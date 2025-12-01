import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-client-reviews-style-two',
    imports: [CarouselModule],
    templateUrl: './client-reviews-style-two.component.html',
    styleUrls: ['./client-reviews-style-two.component.scss']
})
export class ClientReviewsStyleTwoComponent {

    clientReviewsSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 25,
		dots: false,
		center: true,
		autoplay: true,
		autoplayHoverPause: true,
		stagePadding: 100,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				stagePadding: 0,
				items: 1
			},
			576: {
				stagePadding: 0,
				items: 1
			},
			768: {
				stagePadding: 0,
				items: 2
			},
			992: {
				stagePadding: 0,
				items: 3
			},
			1200: {
				items: 2
			}
		}
    }

}