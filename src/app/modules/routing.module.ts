import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Constants} from '../../global/constants';
/**************/
/* Components */
/**************/
import {ErrorComponent} from '../error/error.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {OrderComponent} from '../order/order.component';

export const routes: Routes = [
  {path: '', redirectTo: '/' + Constants.DASHBOARD_PATH, pathMatch: 'full'},
  {path: Constants.DASHBOARD_PATH, component: DashboardComponent},
  {path: Constants.ORDER_PATH + '/:id', component: OrderComponent},
  {path: Constants.ORDER_PATH, component: OrderComponent},
  {path: Constants.ERROR_PATH, component: ErrorComponent},
  {path: '**', redirectTo: '/' + Constants.ERROR_PATH}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class RoutingModule {
}
