import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-screenshots-style-six',
    imports: [NgClass, NgIf],
    templateUrl: './screenshots-style-six.component.html',
    styleUrls: ['./screenshots-style-six.component.scss']
})
export class ScreenshotsStyleSixComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}