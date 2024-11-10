import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { BusFormComponent } from './pages/bus/bus-form/bus-form/bus-form.component';
import { BusListComponent } from './pages/bus/bus-list/bus-list/bus-list.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { UserListComponent } from './pages/user/user-crud/user-list/user-list.component';
import { LocationFormComponent } from './pages/location/location-form/location-form/location-form.component';
import { LocationListComponent } from './pages/location/location-list/location-list/location-list.component';
import { TripFormComponent } from './pages/trip/trip-form/trip-form/trip-form.component';
import { TripListComponent } from './pages/trip/trip-list/trip-list/trip-list.component';

export const routes: Routes = [
    { "path": '#', component: LoginComponent },
    { "path": 'user', component: UserFormComponent },
    { "path": 'user-list', component: UserListComponent },
    { "path": 'bus', component: BusFormComponent },
    { "path": 'bus-list', component: BusListComponent },
    { "path": 'busUpdate/:id', component: BusFormComponent },
    { "path": 'location', component: LocationFormComponent },
    { "path": 'location-list', component: LocationListComponent },
    { "path": 'userUpdate/:id', component: UserFormComponent },
    { "path": 'locationUpdate/:id', component: LocationFormComponent },
    { "path": 'trip', component: TripFormComponent },
    { "path": 'trip-list', component: TripListComponent },
    { "path": 'updateTrip/:id', component: TripFormComponent }


];
