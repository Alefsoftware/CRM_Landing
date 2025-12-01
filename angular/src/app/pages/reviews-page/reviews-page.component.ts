import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { FeedbackStyleOneComponent } from '../../common/feedback-style-one/feedback-style-one.component';
import { FeedbackStyleTwoComponent } from '../../common/feedback-style-two/feedback-style-two.component';
import { FeedbackStyleThreeComponent } from '../../common/feedback-style-three/feedback-style-three.component';
import { FeedbackStyleFourComponent } from '../../common/feedback-style-four/feedback-style-four.component';
import { FeedbackStyleFiveComponent } from '../../common/feedback-style-five/feedback-style-five.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-reviews-page',
    imports: [RouterLink, NavbarStyleTwoComponent, FeedbackStyleOneComponent, FeedbackStyleTwoComponent, FeedbackStyleThreeComponent, FeedbackStyleFourComponent, FeedbackStyleFiveComponent, PartnerComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './reviews-page.component.html',
    styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent { }