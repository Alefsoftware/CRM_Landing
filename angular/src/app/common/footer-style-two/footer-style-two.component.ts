import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '../../translate.service'; // adjust path

@Component({
    selector: 'app-footer-style-two',
    standalone: true,

    imports: [RouterLink],
    templateUrl: './footer-style-two.component.html',
    styleUrls: ['./footer-style-two.component.scss']
})
export class FooterStyleFourComponent {
    constructor(public translate: TranslateService) { }

}