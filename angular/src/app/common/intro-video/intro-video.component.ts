import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-intro-video',
    standalone: true,
    imports: [RouterLink, NgIf],
    templateUrl: './intro-video.component.html',
    styleUrls: ['./intro-video.component.scss']
})
export class IntroVideoComponent {

    isOpen = false;

    // coming from backend
    videoLink = 'https://www.youtube.com/watch?v=E8QNqEk9t8o';

    get embedVideoUrl(): string {
        if (!this.videoLink) return '';
        const videoId = this.videoLink.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    openPopup(): void {
        this.isOpen = true;
    }

    closePopup(): void {
        this.isOpen = false;
    }
}
