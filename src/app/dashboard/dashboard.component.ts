import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTable} from '@angular/material';
import {BuyOrder} from '../../global/dao/buyOrder';
import {Constants} from '../../global/constants';

@Component({
  selector: 'narrative-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public greeting: string;
  public ordersArray: BuyOrder[] = [];
  public visibleColumns: string[] = [Constants.COLUMN_NAME, Constants.COLUMN_PRICE, Constants.COLUMN_TYPE, Constants.COLUMN_OPTIONS];

  @ViewChild('table') table: MatTable<Element>;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.setGreetingMessage();
    this.loadAllOrders();
  }

  // Set the greeting message
  setGreetingMessage(): void {
    const hrs = new Date().getHours();

    if (hrs < 12) {
      this.greeting = 'extra.greet1';
    } else if (hrs >= 12 && hrs <= 16) {
      this.greeting = 'extra.greet2';
    } else if (hrs >= 16 && hrs <= 24) {
      this.greeting = 'extra.greet3';
    }
  }

  public removeOrder(id: string): void {
    localStorage.removeItem(id);
    this.loadAllOrders();
    this.table.renderRows();
  }

  public editOrder(id: string): void {
    this.router.navigate(['/' + Constants.ORDER_PATH + '/' + id]);
  }

  // Load all the order data in browser cache
  loadAllOrders(): void {
    this.ordersArray.length = 0;
    Object.keys(localStorage).filter((key) => key.startsWith(Constants.STORAGE_PREFIX)).forEach(
      (key) => this.ordersArray.push(JSON.parse(localStorage[key])));
  }

}
