import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-homefour-video',
    imports: [NgIf],
    templateUrl: './homefour-video.component.html',
    styleUrls: ['./homefour-video.component.scss']
})
export class HomefourVideoComponent {

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}