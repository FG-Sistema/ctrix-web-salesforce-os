import { Component, Output } from '@angular/core';
import { ShoppingCart } from '../../../../shared/interfaces/shopping.cart.interface';
import { FixedHeader } from '../../../../shared/interfaces/fixed.header.interface';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../../../shared/services/storage.service';
import { Router, RouterModule } from '@angular/router';
import { IndexedDbService } from '../../../../shared/services/indexed-db.service';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, from, map, of, switchMap, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { SearchSimpleComponent } from '../../../../shared/widget/search-simple/search-simple.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { FixedHeaderComponent } from '../../../../shared/widget/fixed-header/fixed-header.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    CommonModule,
    SearchSimpleComponent,
    NgxCurrencyDirective,
    FixedHeaderComponent,
    NgxSkeletonLoaderModule,
    MatMenuModule
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {
  public vehicles: any = [];
  public ShoppingCart: ShoppingCart;
  public skeletonOn: boolean = false;

  @Output() public fixedHeader: FixedHeader = {
    title: 'Lista de Veículos',
    routerBack: '../shopping-cart',
    showBackButton: true,
    showSearchButton: true,
    search: new FormControl('')
  };

  constructor(
    private storageService: StorageService,
    private router: Router,
    private indexedDbService: IndexedDbService
  ) {
    this.ShoppingCart = this.storageService.getList('SalesForce/ShoppingCart');
  }

  ngOnInit(): void {
    this.fixedHeader.search?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(() => {
          this.load();
        })
      )
      .subscribe();

    this.load();
  }

  load(): void {
    if (!this.ShoppingCart?.people?.vehicles || this.ShoppingCart?.people?.vehicles.length === 0) {
      this.vehicles = [];
      return;
    }

    //Fazer uma pesquisa dos veiculos que estiverem dentro do people selecionado
    this.skeletonOn = true;

    const filteredVehicles = this.ShoppingCart?.people?.vehicles.filter((vehicle: any) => {
    const searchTerm = this.fixedHeader.search?.value.toLowerCase();

      return (
        vehicle.model?.toLowerCase().includes(searchTerm) ||
        vehicle.brand?.toLowerCase().includes(searchTerm) ||
        vehicle.license_plate?.toLowerCase().includes(searchTerm) ||
        vehicle.color?.toLowerCase().includes(searchTerm) ||
        vehicle.year?.toString().includes(searchTerm)
      );
    });

    this.vehicles = filteredVehicles;
    this.skeletonOn = false;
  }

  setVehicle(vehicle: any): void {
    this.ShoppingCart.vehicle = vehicle;
    this.storageService.setList('SalesForce/ShoppingCart', this.ShoppingCart);
    this.router.navigate(['/shopping-cart']);
  }
}
