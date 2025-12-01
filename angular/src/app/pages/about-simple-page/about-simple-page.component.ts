import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FunfactsStyleOneComponent } from '../../common/funfacts-style-one/funfacts-style-one.component';
import { ProgressStyleTwoComponent } from '../../common/progress-style-two/progress-style-two.component';
import { UserStatsComponent } from '../../common/user-stats/user-stats.component';
import { HometwoSoftwareIntegrationsComponent } from '../home-demo-two/hometwo-software-integrations/hometwo-software-integrations.component';
import { TeamStyleOneComponent } from '../../common/team-style-one/team-style-one.component';
import { FeedbackStyleOneComponent } from '../../common/feedback-style-one/feedback-style-one.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-about-simple-page',
    imports: [RouterLink, NavbarStyleTwoComponent, FooterStyleFourComponent, FunfactsStyleOneComponent, ProgressStyleTwoComponent, UserStatsComponent, HometwoSoftwareIntegrationsComponent, TeamStyleOneComponent, FeedbackStyleOneComponent, PartnerComponent, BackToTopComponent],
    templateUrl: './about-simple-page.component.html',
    styleUrls: ['./about-simple-page.component.scss']
})
export class AboutSimplePageComponent { }