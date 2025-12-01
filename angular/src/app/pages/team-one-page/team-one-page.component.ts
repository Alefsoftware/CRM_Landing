import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-team-one-page',
    imports: [RouterLink, NavbarStyleTwoComponent, PartnerComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './team-one-page.component.html',
    styleUrls: ['./team-one-page.component.scss']
})
export class TeamOnePageComponent { }