import { Component } from '@angular/core';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomeoneBannerComponent } from './homeone-banner/homeone-banner.component';
import { HomeoneFeaturesComponent } from './homeone-features/homeone-features.component';
import { HomeoneVideoComponent } from './homeone-video/homeone-video.component';
import { HomeoneKeyFeaturesComponent } from './homeone-key-features/homeone-key-features.component';
import { FeaturesStyleOneComponent } from '../../common/features-style-one/features-style-one.component';
import { ProgressStyleOneComponent } from '../../common/progress-style-one/progress-style-one.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { ScreenshotsStyleOneComponent } from '../../common/screenshots-style-one/screenshots-style-one.component';
import { SoftwareIntegrationsComponent } from '../../common/software-integrations/software-integrations.component';
import { PricingStyleOneComponent } from '../../common/pricing-style-one/pricing-style-one.component';
import { FeedbackStyleOneComponent } from '../../common/feedback-style-one/feedback-style-one.component';
import { FreeTrialStyleOneComponent } from '../../common/free-trial-style-one/free-trial-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-one',
    imports: [NavbarStyleTwoComponent, HomeoneBannerComponent, HomeoneFeaturesComponent, HomeoneVideoComponent, HomeoneKeyFeaturesComponent, FeaturesStyleOneComponent, ProgressStyleOneComponent, DownloadAppStyleOneComponent, ScreenshotsStyleOneComponent, SoftwareIntegrationsComponent, PricingStyleOneComponent, FeedbackStyleOneComponent, FreeTrialStyleOneComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-one.component.html',
    styleUrls: ['./home-demo-one.component.scss']
})
export class HomeDemoOneComponent { }