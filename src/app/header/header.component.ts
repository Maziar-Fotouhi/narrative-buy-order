import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'narrative-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public translateService: TranslateService) {
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }
}
