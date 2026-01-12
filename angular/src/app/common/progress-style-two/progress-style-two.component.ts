// progress-style-two.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service'; // Adjust path
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-progress-style-two',
    imports: [RouterLink, CommonModule],
    templateUrl: './progress-style-two.component.html',
    styleUrls: ['./progress-style-two.component.scss']
})
export class ProgressStyleTwoComponent implements OnInit {
    currentLang: 'en' | 'ar' = 'en';

    constructor(private languageService: LanguageService) { }

    ngOnInit(): void {
        this.currentLang = this.languageService.getCurrentLang();

        // Subscribe to language changes
        this.languageService.currentLang$.subscribe(lang => {
            this.currentLang = lang;
        });
    }
}