import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {OrderComponent} from '../order/order.component';
import {BuyOrder} from '../../global/dao/buyOrder';
import {Constants} from '../../global/constants';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AppComponent} from '../app.component';
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

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeOrder should remove a BuyOrder that is already saved, from storage', () => {
    OrderComponent.saveOrder(stubBuyOrder);
    component.removeOrder(stubBuyOrder.id);
    expect(OrderComponent.loadOrder(stubBuyOrder.id)).toEqual(null);
  });

  it('removeOrder should load orders from storage again', () => {
    spyOn(component, 'loadAllOrders');
    OrderComponent.saveOrder(stubBuyOrder);
    component.removeOrder(stubBuyOrder.id);
    expect(component.loadAllOrders).toHaveBeenCalled();
  });

  it('removeOrder should refresh the table', () => {
    spyOn(component.table, 'renderRows');
    OrderComponent.saveOrder(stubBuyOrder);
    component.removeOrder(stubBuyOrder.id);
    expect(component.table.renderRows).toHaveBeenCalled();
  });

  it('editOrder should navigate to the order', () => {
    spyOn(component.router, 'navigate');
    component.editOrder(stubBuyOrder.id);
    expect(component.router.navigate).toHaveBeenCalledWith(['/' + Constants.ORDER_PATH + '/' + stubBuyOrder.id]);
  });

});
