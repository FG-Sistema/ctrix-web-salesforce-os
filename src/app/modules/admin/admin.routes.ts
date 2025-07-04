import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PeopleComponent } from './pages/people/people.component';
import { SaleComponent } from './pages/sale/sale.component';
import { MyCompaniesComponent } from './pages/my-companies/my-companies.component';
import { SaleReportViewComponent } from './pages/reports/sale-report-view/sale-report-view.component';
import { HelperComponent } from './pages/helper/helper.component';
import { animate } from '@angular/animations';
import { VehicleComponent } from './pages/vehicle/vehicle.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sale',
    pathMatch: 'full'
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    data: { animate: 'ShoppingCartPage' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { animate: 'ProductsPage',  }
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    data: { animate: 'MyProfilePage' }
  },
  {
    path: 'people',
    component: PeopleComponent,
    data: { animate: 'PeoplePage' }
  },
  {
    path: 'sale',
    component: SaleComponent,
    data: { animate: 'SalePage' }
  },
  {
    path: 'my-companies',
    component: MyCompaniesComponent,
    data: { animate: 'MyCompaniesPage' }
  },
  {
    path: 'sale-report-view/:id',
    component: SaleReportViewComponent,
    data: { animate: 'SaleReportViewPage' }
  },
  {
    path: 'helper',
    component: HelperComponent,
    data: { animate: 'HelperPage' }
  },
  {
    path: 'vehicles',
    component: VehicleComponent,
    data: { animate: 'VehiclePage' }
  },
];
