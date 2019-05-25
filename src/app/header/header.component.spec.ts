import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {FooterComponent} from '../footer/footer.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {OrderComponent} from '../order/order.component';
import {ErrorComponent} from '../error/error.component';
import {RouterModule} from '@angular/router';
import {routes} from '../modules/routing.module';
import {MaterialDesignModule} from '../modules/material-design.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Constants} from '../../global/constants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        OrderComponent,
        ErrorComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }),
        HttpClientModule,
        RouterModule.forRoot(routes),
        MaterialDesignModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeLanguage should be able to change the active language to English and Spanish', () => {
    spyOn(component.translateService, 'use');
    component.changeLanguage('en');
    expect(component.translateService.use).toHaveBeenCalledWith('en');
    component.changeLanguage('es');
    expect(component.translateService.use).toHaveBeenCalledWith('es');
  });
});
