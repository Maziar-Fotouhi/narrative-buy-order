import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../global/constants';

@Component({
  selector: 'narrative-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Constructor code executes before ngOnInit()
  constructor(public translateService: TranslateService) {
    this.initializeApp();
  }

  // All the initialization code goes here.
  public initializeApp(): void {
    // Set the default language
    this.translateService.setDefaultLang(Constants.ENGLISH_LANGUAGE);
    // Start the app with english as default just in case browser language is not detectable.
    this.translateService.use(Constants.ENGLISH_LANGUAGE);
    // Initialize the translate service with the current browser language.
    this.initializeTranslateServiceConfig();
  }

  public initializeTranslateServiceConfig(): void {
    const userLang: string = this.translateService.getBrowserLang();
    this.translateService.use(userLang);
  }
}
