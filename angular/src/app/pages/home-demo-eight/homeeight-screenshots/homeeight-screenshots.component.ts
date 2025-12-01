import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-homeeight-screenshots',
    imports: [CarouselModule],
    templateUrl: './homeeight-screenshots.component.html',
    styleUrls: ['./homeeight-screenshots.component.scss']
})
export class HomeeightScreenshotsComponent {

    screenshotsSlides: OwlOptions = {
		nav: false,
		loop: true,
		margin: 25,
		dots: true,
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
				items: 2
			},
			768: {
				items: 3
			},
			992: {
				items: 4
			},
			1200: {
				items: 5
			}
		}
    }

}