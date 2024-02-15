import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { Routes } from "@angular/router";

const routeConfig : Routes = [
    {
        path : '',
        component : HomeComponent,
        title:'Home Page'
    },
    {
        path : 'details/:id',
        component: DetailsComponent,
        title  :' Details Page'
    }
];

export default routeConfig;