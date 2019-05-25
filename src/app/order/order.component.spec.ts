import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {BuyOrder} from '../../global/dao/buyOrder';
import {Constants} from '../../global/constants';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AppComponent} from '../app.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ErrorComponent} from '../error/error.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from '../modules/routing.module';
import {MaterialDesignModule} from '../modules/material-design.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  const stubBuyOrder: BuyOrder = new BuyOrder('test', 'test', null);

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
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveOrder should save a BuyOrder in storage', () => {
    OrderComponent.saveOrder(stubBuyOrder);
    expect(localStorage.getItem(stubBuyOrder.id)).toEqual(JSON.stringify(stubBuyOrder));
  });

  it('loadOrder should return a BuyOrder that is already saved in storage', () => {
    OrderComponent.saveOrder(stubBuyOrder);
    expect(OrderComponent.loadOrder(stubBuyOrder.id)).toEqual(JSON.parse(JSON.stringify(stubBuyOrder)));
  });

  it('onSubmit should save the order', () => {
    spyOn(OrderComponent, 'saveOrder');
    component.onSubmit();
    expect(OrderComponent.saveOrder).toHaveBeenCalled();
  });

  it('onSubmit should navigate to dashboard', () => {
    spyOn(component.router, 'navigate');
    component.onSubmit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/' + Constants.DASHBOARD_PATH]);
  });

});
