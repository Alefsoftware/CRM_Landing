import { Component } from '@angular/core';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomenineBannerComponent } from './homenine-banner/homenine-banner.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { HomenineFeaturesComponent } from './homenine-features/homenine-features.component';
import { HomenineAppProgressComponent } from './homenine-app-progress/homenine-app-progress.component';
import { KeyFeaturesComponent } from '../../common/key-features/key-features.component';
import { ScreenshotsStyleTwoComponent } from '../../common/screenshots-style-two/screenshots-style-two.component';
import { GetStartedComponent } from '../../common/get-started/get-started.component';
import { ClientReviewsStyleTwoComponent } from '../../common/client-reviews-style-two/client-reviews-style-two.component';
import { PricingStyleOneComponent } from '../../common/pricing-style-one/pricing-style-one.component';
import { HomenineBlogComponent } from './homenine-blog/homenine-blog.component';
import { FreeTrialStyleFourComponent } from '../../common/free-trial-style-four/free-trial-style-four.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-nine',
    imports: [NavbarStyleTwoComponent, HomenineBannerComponent, PartnerComponent, HomenineFeaturesComponent, HomenineAppProgressComponent, KeyFeaturesComponent, ScreenshotsStyleTwoComponent, GetStartedComponent, ClientReviewsStyleTwoComponent, PricingStyleOneComponent, HomenineBlogComponent, FreeTrialStyleFourComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-nine.component.html',
    styleUrls: ['./home-demo-nine.component.scss']
})
export class HomeDemoNineComponent { }