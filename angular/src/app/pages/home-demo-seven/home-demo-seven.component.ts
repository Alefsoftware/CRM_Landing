import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../translate.service'; // adjust path

import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomesevenBannerComponent } from './homeseven-banner/homeseven-banner.component';
import { HomesevenFeaturesComponent } from './homeseven-features/homeseven-features.component';
import { HomesevenAboutComponent } from './homeseven-about/homeseven-about.component';
import { FeaturesStyleSixComponent } from '../../common/features-style-six/features-style-six.component';
import { ProgressStyleFourComponent } from '../../common/progress-style-four/progress-style-four.component';
import { ScreenshotsStyleSevenComponent } from '../../common/screenshots-style-seven/screenshots-style-seven.component';
import { TrustedFeaturesComponent } from '../../common/trusted-features/trusted-features.component';
import { VideoComponent } from '../../common/video/video.component';
import { PricingStyleSixComponent } from '../../common/pricing-style-six/pricing-style-six.component';
import { DownloadAppStyleFourComponent } from '../../common/download-app-style-four/download-app-style-four.component';
import { GetStartedComponent } from '../../common/get-started/get-started.component';
import { ClientReviewsComponent } from '../../common/client-reviews/client-reviews.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
  selector: 'app-home-demo-seven',
  standalone: true,
  imports: [
    NavbarStyleTwoComponent,
    HomesevenBannerComponent,
    HomesevenFeaturesComponent,
    HomesevenAboutComponent,
    FeaturesStyleSixComponent,
    ProgressStyleFourComponent,
    ScreenshotsStyleSevenComponent,
    TrustedFeaturesComponent,
    VideoComponent,
    PricingStyleSixComponent,
    DownloadAppStyleFourComponent,
    GetStartedComponent,
    ClientReviewsComponent,
    FooterStyleFourComponent,
    BackToTopComponent
  ],
  templateUrl: './home-demo-seven.component.html',
  styleUrls: ['./home-demo-seven.component.scss']
})
export class HomeDemoSevenComponent {
  currentLang: 'en' | 'ar' = 'en';

  constructor(
    private router: Router,
    public translate: TranslateService
  ) {
    // ✅ Load saved language or default to English
    const savedLang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
    this.currentLang = savedLang;
    // this.translate.use(savedLang);

    // ✅ Update document direction and language
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }

  changeLang(lang: 'en' | 'ar') {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      // this.translate.use(lang); // ✅ instantly apply translation
      localStorage.setItem('lang', lang); // ✅ remember choice

      // ✅ Update direction and lang attributes
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      // ✅ Optional: update URL language segment
      const segments = this.router.url.split('/');
      if (segments.length > 1) {
        segments[1] = lang;
      } else {
        segments.unshift('', lang);
      }
      this.router.navigateByUrl(segments.join('/'));
    }
  }
}
