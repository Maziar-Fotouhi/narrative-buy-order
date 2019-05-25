import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BuyOrder} from '../../global/dao/buyOrder';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants} from '../../global/constants';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'narrative-app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public orderId: string;
  public nameField = new FormControl('', [Validators.required]);
  public priceField = new FormControl('', [Validators.required, Validators.pattern(Constants.PRICE_REGEX)]);
  public typeField = new FormControl('', [Validators.required]);
  private routerSubscription: any;
  private shouldReplace = false;

  constructor(private route: ActivatedRoute, public router: Router, private translateService: TranslateService) {
  }

  static saveOrder(order: BuyOrder): void {
    const orderString = JSON.stringify(order);
    localStorage.setItem(order.id, orderString);
  }

  static loadOrder(orderId: string): BuyOrder {
    const buyOrderObject: any = localStorage.getItem(orderId);
    if (buyOrderObject !== null) {
      return JSON.parse(buyOrderObject);
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.orderId = params.id;
      if (this.orderId !== null && this.orderId !== undefined && this.orderId !== '') {
        const savedBuyOrder: BuyOrder = OrderComponent.loadOrder(this.orderId);
        this.nameField.setValue(savedBuyOrder.name);
        this.priceField.setValue(savedBuyOrder.maxBidPrice);
        this.typeField.setValue(savedBuyOrder.dataPackageType);
        this.shouldReplace = true;
      } else {
        this.orderId = 'Unknwon';
      }
    });
  }

  // Reset the values in the fields.
  ngOnDestroy(): void {
    this.nameField.reset();
    this.priceField.reset();
    this.typeField.reset();
    this.routerSubscription.unsubscribe();
  }

  getNameErrorMessage(): string {
    return this.nameField.hasError(Constants.REQUIRED_ERROR) ? this.translateService.instant('extra.mustEnter') : '';
  }

  getPriceErrorMessage(): string {
    return this.priceField.hasError(Constants.REQUIRED_ERROR) ? this.translateService.instant('extra.mustEnter') : this.priceField.hasError(
      Constants.PATTERN_ERROR) ? this.translateService.instant('extra.invalidMoney') : '';
  }

  getTypeErrorMessage(): string {
    return this.typeField.hasError(Constants.REQUIRED_ERROR) ? this.translateService.instant('extra.mustEnter') : '';
  }

  public onSubmit(): void {
    const generatedOrder: BuyOrder = new BuyOrder(this.nameField.value, this.priceField.value, this.typeField.value);
    if (this.shouldReplace) {
      // We already know this.orderId is not null if the condition is satisfied.
      localStorage.removeItem(this.orderId);
    }
    OrderComponent.saveOrder(generatedOrder);
    this.router.navigate(['/' + Constants.DASHBOARD_PATH]);
  }

}
