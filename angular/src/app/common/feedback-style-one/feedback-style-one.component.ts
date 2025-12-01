import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-feedback-style-one',
    imports: [CarouselModule],
    templateUrl: './feedback-style-one.component.html',
    styleUrls: ['./feedback-style-one.component.scss']
})
export class FeedbackStyleOneComponent {

    feedbackSlides: OwlOptions = {
		nav: false,
		loop: true,
		margin: 25,
		dots: true,
		center: true,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 3
			}
		}
    }

}