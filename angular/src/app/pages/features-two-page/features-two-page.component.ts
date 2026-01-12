import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomeoneFeaturesComponent } from '../home-demo-one/homeone-features/homeone-features.component';
import { FeaturesStyleOneComponent } from '../../common/features-style-one/features-style-one.component';
import { HometwoFeaturesComponent } from '../home-demo-two/hometwo-features/hometwo-features.component';
import { HometwoKeyFeaturesComponent } from '../home-demo-two/hometwo-key-features/hometwo-key-features.component';
import { FeaturesStyleTwoComponent } from '../../common/features-style-two/features-style-two.component';
import { FeaturesStyleThreeComponent } from '../../common/features-style-three/features-style-three.component';
import { FeaturesStyleFourComponent } from '../../common/features-style-four/features-style-four.component';
import { FeaturesStyleFiveComponent } from '../../common/features-style-five/features-style-five.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { DownloadAppStyleFiveComponent } from "../../common/download-app-style-five/download-app-style-five.component";
import { DownloadAppStyleTwoComponent } from "../../common/download-app-style-two/download-app-style-two.component";
import { DownloadAppStyleOneComponent } from "../../common/download-app-style-one/download-app-style-one.component";
import { DownloadAppStyleThreeComponent } from "../../common/download-app-style-three/download-app-style-three.component";
import { DownloadAppStyleFourComponent } from "../../common/download-app-style-four/download-app-style-four.component";

@Component({
    selector: 'app-features-two-page',
    imports: [RouterLink, NavbarStyleTwoComponent, HomeoneFeaturesComponent, FeaturesStyleOneComponent, HometwoFeaturesComponent, HometwoKeyFeaturesComponent, FeaturesStyleTwoComponent, FeaturesStyleThreeComponent, FeaturesStyleFourComponent, FeaturesStyleFiveComponent, FooterStyleFourComponent, BackToTopComponent, DownloadAppStyleFiveComponent, DownloadAppStyleTwoComponent, DownloadAppStyleOneComponent, DownloadAppStyleThreeComponent, DownloadAppStyleFourComponent],
    templateUrl: './features-two-page.component.html',
    styleUrls: ['./features-two-page.component.scss']
})
export class FeaturesTwoPageComponent implements OnInit {
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.detectLanguage();
    }

    ngOnInit(): void {
        // Optional: Listen for URL changes
        this.router.events.subscribe(() => {
            this.detectLanguage();
        });
    }

    private detectLanguage(): void {
        // Method 1: From URL path
        const urlSegments = this.router.url.split('/').filter(segment => segment);
        if (urlSegments.length > 0 && (urlSegments[0] === 'ar' || urlSegments[0] === 'en')) {
            this.currentLang = urlSegments[0] as 'en' | 'ar';
        }

    }
}