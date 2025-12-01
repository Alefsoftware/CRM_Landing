import { Component } from '@angular/core';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomethreeBannerComponent } from './homethree-banner/homethree-banner.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { HomethreeOverviewComponent } from './homethree-overview/homethree-overview.component';
import { HomethreeFeaturesComponent } from './homethree-features/homethree-features.component';
import { HomethreeVideoComponent } from './homethree-video/homethree-video.component';
import { FeaturesStyleTwoComponent } from '../../common/features-style-two/features-style-two.component';
import { ScreenshotsStyleThreeComponent } from '../../common/screenshots-style-three/screenshots-style-three.component';
import { SoftwareIntegrationsComponent } from '../../common/software-integrations/software-integrations.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { PricingStyleThreeComponent } from '../../common/pricing-style-three/pricing-style-three.component';
import { FeedbackStyleOneComponent } from '../../common/feedback-style-one/feedback-style-one.component';
import { BlogComponent } from '../../common/blog/blog.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-three',
    imports: [NavbarStyleTwoComponent, HomethreeBannerComponent, PartnerComponent, HomethreeOverviewComponent, HomethreeFeaturesComponent, HomethreeVideoComponent, FeaturesStyleTwoComponent, ScreenshotsStyleThreeComponent, SoftwareIntegrationsComponent, DownloadAppStyleTwoComponent, PricingStyleThreeComponent, FeedbackStyleOneComponent, BlogComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-three.component.html',
    styleUrls: ['./home-demo-three.component.scss']
})
export class HomeDemoThreeComponent { }