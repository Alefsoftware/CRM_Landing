import { Component } from '@angular/core';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HometwoBannerComponent } from './hometwo-banner/hometwo-banner.component';
import { HometwoFeaturesComponent } from './hometwo-features/hometwo-features.component';
import { HometwoKeyFeaturesComponent } from './hometwo-key-features/hometwo-key-features.component';
import { ProgressStyleTwoComponent } from '../../common/progress-style-two/progress-style-two.component';
import { IntroVideoComponent } from '../../common/intro-video/intro-video.component';
import { ScreenshotsStyleTwoComponent } from '../../common/screenshots-style-two/screenshots-style-two.component';
import { HometwoSoftwareIntegrationsComponent } from './hometwo-software-integrations/hometwo-software-integrations.component';
import { FeedbackStyleTwoComponent } from '../../common/feedback-style-two/feedback-style-two.component';
import { PricingStyleTwoComponent } from '../../common/pricing-style-two/pricing-style-two.component';
import { FreeTrialStyleTwoComponent } from '../../common/free-trial-style-two/free-trial-style-two.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-two',
    imports: [NavbarStyleTwoComponent, HometwoBannerComponent, HometwoFeaturesComponent, HometwoKeyFeaturesComponent, ProgressStyleTwoComponent, IntroVideoComponent, ScreenshotsStyleTwoComponent, HometwoSoftwareIntegrationsComponent, FeedbackStyleTwoComponent, PricingStyleTwoComponent, FreeTrialStyleTwoComponent, PartnerComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-two.component.html',
    styleUrls: ['./home-demo-two.component.scss']
})
export class HomeDemoTwoComponent { }