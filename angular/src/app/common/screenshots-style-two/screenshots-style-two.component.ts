import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-screenshots-style-two',
    imports: [CarouselModule],
    templateUrl: './screenshots-style-two.component.html',
    styleUrls: ['./screenshots-style-two.component.scss']
})
export class ScreenshotsStyleTwoComponent {

    screenshotsSwiperSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 30,
		dots: false,
        center: true,
		autoplay: false,
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
				items: 2
			},
			992: {
				items: 2
			},
			1200: {
				items: 2
			}
		}
    }

}