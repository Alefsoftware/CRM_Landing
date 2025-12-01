import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { ProgressStyleOneComponent } from '../../common/progress-style-one/progress-style-one.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FunfactsStyleTwoComponent } from '../../common/funfacts-style-two/funfacts-style-two.component';
import { FeedbackStyleFourComponent } from '../../common/feedback-style-four/feedback-style-four.component';
import { HomethreeVideoComponent } from '../home-demo-three/homethree-video/homethree-video.component';
import { TeamStyleTwoComponent } from '../../common/team-style-two/team-style-two.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { SoftwareIntegrationsComponent } from '../../common/software-integrations/software-integrations.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-about-modern-page',
    imports: [RouterLink, NavbarStyleTwoComponent, ProgressStyleOneComponent, DownloadAppStyleOneComponent, FunfactsStyleTwoComponent, FeedbackStyleFourComponent, HomethreeVideoComponent, TeamStyleTwoComponent, PartnerComponent, SoftwareIntegrationsComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './about-modern-page.component.html',
    styleUrls: ['./about-modern-page.component.scss']
})
export class AboutModernPageComponent { }