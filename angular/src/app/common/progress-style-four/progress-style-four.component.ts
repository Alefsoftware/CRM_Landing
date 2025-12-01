import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { TranslateService } from '../../translate.service'; // adjust path

@Component({
  selector: 'app-progress-style-four',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './progress-style-four.component.html',
  styleUrls: [
    './progress-style-four.component.scss',
  ]
})
export class ProgressStyleFourComponent implements OnInit {
  appProgress: any;
  currentLang: 'en' | 'ar' = 'en';

  constructor(
    private http: HttpClient,
    private router: Router,
    public translate: TranslateService
  ) {
    // detect lang from URL
    const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
    this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
    this.translate.switchLang(this.currentLang);

    // set <html> attributes
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
      .subscribe((res) => {
        this.appProgress = res?.data?.app_progress || null;
      });
  }

  getTitle(): string {
    return this.currentLang === 'ar' ? this.appProgress?.title_ar : this.appProgress?.title_en;
  }

  getDescription(): string {
    return this.currentLang === 'ar' ? this.appProgress?.description_ar : this.appProgress?.description_en;
  }
  goToSignUp(): void {
    this.router.navigate([`/${this.currentLang}/sign-up`]);
  }

}
