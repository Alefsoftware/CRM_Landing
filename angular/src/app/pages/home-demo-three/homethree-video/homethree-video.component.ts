import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-homethree-video',
    imports: [NgIf],
    templateUrl: './homethree-video.component.html',
    styleUrls: ['./homethree-video.component.scss']
})
export class HomethreeVideoComponent {

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}