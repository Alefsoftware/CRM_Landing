import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-intro-video',
    imports: [RouterLink, NgIf],
    templateUrl: './intro-video.component.html',
    styleUrls: ['./intro-video.component.scss']
})
export class IntroVideoComponent {

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}