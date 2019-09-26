import {Routes} from "@angular/router";
import {Repeater} from "app/repeater";
import { HomeComponent } from 'app/home.component';

import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        component: Repeater,
        children: [
            { path: 'game', component: Repeater }
        ]
    }
];