import { Component } from '@angular/core';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomefourBannerComponent } from './homefour-banner/homefour-banner.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { HomefourVideoComponent } from './homefour-video/homefour-video.component';
import { HomefourFeaturesComponent } from './homefour-features/homefour-features.component';
import { FeaturesStyleThreeComponent } from '../../common/features-style-three/features-style-three.component';
import { ProgressStyleThreeComponent } from '../../common/progress-style-three/progress-style-three.component';
import { DownloadAppStyleThreeComponent } from '../../common/download-app-style-three/download-app-style-three.component';
import { ScreenshotsStyleFourComponent } from '../../common/screenshots-style-four/screenshots-style-four.component';
import { HomefourSoftwareIntegrationsComponent } from './homefour-software-integrations/homefour-software-integrations.component';
import { PricingStyleFourComponent } from '../../common/pricing-style-four/pricing-style-four.component';
import { FeedbackStyleThreeComponent } from '../../common/feedback-style-three/feedback-style-three.component';
import { FreeTrialStyleTwoComponent } from '../../common/free-trial-style-two/free-trial-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-four',
    imports: [NavbarStyleTwoComponent, HomefourBannerComponent, PartnerComponent, HomefourVideoComponent, HomefourFeaturesComponent, FeaturesStyleThreeComponent, ProgressStyleThreeComponent, DownloadAppStyleThreeComponent, ScreenshotsStyleFourComponent, HomefourSoftwareIntegrationsComponent, PricingStyleFourComponent, FeedbackStyleThreeComponent, FreeTrialStyleTwoComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-four.component.html',
    styleUrls: ['./home-demo-four.component.scss']
})
export class HomeDemoFourComponent { }