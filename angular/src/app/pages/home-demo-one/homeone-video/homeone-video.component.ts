import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-homeone-video',
    imports: [NgIf],
    templateUrl: './homeone-video.component.html',
    styleUrls: ['./homeone-video.component.scss']
})
export class HomeoneVideoComponent {

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}