import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from './app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MaterialDesignModule} from './modules/material-design.module';
import {routes} from './modules/routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OrderComponent} from './order/order.component';
import {ErrorComponent} from './error/error.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
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
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComp = fixture.debugElement.componentInstance;
    expect(appComp).toBeTruthy();
  });

});
