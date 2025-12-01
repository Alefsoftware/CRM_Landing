import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-feedback-style-two',
    imports: [CarouselModule],
    templateUrl: './feedback-style-two.component.html',
    styleUrls: ['./feedback-style-two.component.scss']
})
export class FeedbackStyleTwoComponent {

    swiperFeedbackSlides: OwlOptions = {
        items: 1,
		nav: true,
		loop: true,
		dots: false,
		center: true,
		autoplay: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		]
    }

}