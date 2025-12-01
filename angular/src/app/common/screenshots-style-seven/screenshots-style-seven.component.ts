import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 👈 Add this
import { TranslateService } from '../../translate.service'; // adjust path
import { Router } from '@angular/router';
@Component({
	selector: 'app-screenshots-style-seven',
	standalone: true,
	imports: [
		CommonModule,       // 👈 Required for *ngFor, *ngIf, etc.
		CarouselModule,
		HttpClientModule
	],
	templateUrl: './screenshots-style-seven.component.html',
	styleUrls: ['./screenshots-style-seven.component.scss']
})
export class ScreenshotsStyleSevenComponent implements OnInit {
	screens: any[] = [];
	currentLang: 'en' | 'ar' = 'en';

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
			0: { items: 1 },
			576: { items: 2 },
			768: { items: 3 },
			992: { items: 4 },
			1200: { items: 5 }
		}
	};

	constructor(private http: HttpClient, private router: Router,
		public translate: TranslateService) {
		const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
		this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
		this.translate.switchLang(this.currentLang);

		// set <html> attributes
		document.documentElement.lang = this.currentLang;
	}

	ngOnInit(): void {
		this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site').subscribe({
			next: res => {
				this.screens = res.data?.screens || [];
			},
			error: err => {
				console.error('Failed to load screenshots:', err);
			}
		});
	}
}