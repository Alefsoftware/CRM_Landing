import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-homeeight-intro',
    imports: [RouterLink, NgIf],
    templateUrl: './homeeight-intro.component.html',
    styleUrls: ['./homeeight-intro.component.scss']
})
export class HomeeightIntroComponent {

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}