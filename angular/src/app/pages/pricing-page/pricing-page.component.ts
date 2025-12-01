import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { PricingStyleOneComponent } from '../../common/pricing-style-one/pricing-style-one.component';
import { PricingStyleFourComponent } from '../../common/pricing-style-four/pricing-style-four.component';
import { PricingStyleThreeComponent } from '../../common/pricing-style-three/pricing-style-three.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { PricingStyleFiveComponent } from '../../common/pricing-style-five/pricing-style-five.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-pricing-page',
    imports: [RouterLink, NavbarStyleTwoComponent, PricingStyleOneComponent, PricingStyleFourComponent, PricingStyleThreeComponent, PartnerComponent, PricingStyleFiveComponent, DownloadAppStyleTwoComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './pricing-page.component.html',
    styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent { }