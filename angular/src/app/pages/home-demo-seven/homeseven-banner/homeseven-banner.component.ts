import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateService } from '../../../translate.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-homeseven-banner',
	standalone: true,
	imports: [CommonModule, HttpClientModule, CarouselModule],
	templateUrl: './homeseven-banner.component.html',
	styleUrls: [
		'./homeseven-banner.component.en.scss',
		'./homeseven-banner.component.ar.scss'
	]
})
export class HomesevenBannerComponent implements OnInit {
	sectionOneData: any;
	clientsLogos: any[] = [];
	currentLang: 'en' | 'ar' = 'en';

	trustedBySlides: OwlOptions = {
		nav: false,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: { items: 3 },
			576: { items: 4 },
			768: { items: 4 },
			992: { items: 4 },
			1200: { items: 4 }
		}
	};

	constructor(
		private http: HttpClient,
		private router: Router,
		public translate: TranslateService
	) {
		// detect lang from URL
		const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
		this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
		this.translate.switchLang(this.currentLang);

		// set html attributes
		document.documentElement.lang = this.currentLang;
		document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
	}

	ngOnInit(): void {
		this.getSectionData();
	}

	getSectionData(): void {
		this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
			.subscribe(response => {
				if (response.status && response.data) {
					this.sectionOneData = response.data.section_one;
					this.clientsLogos = (response.data.clientsLogos || []).map(
						(logo: { image: string; alt: string }) => ({
							image: 'https://admin.realstatecrm-development.dev.alefsoftware.com/' + logo.image,
							alt: logo.alt,
						})
					);
				}
			});
	}

	// ✅ Add this function
	changeLang(lang: 'en' | 'ar') {
		this.currentLang = lang;
		this.translate.switchLang(lang);

		// Update direction and lang attributes
		document.documentElement.lang = lang;
		document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

		// Optional: reload current route to apply all changes
		this.router.navigate(['/', lang]);
	}
}
