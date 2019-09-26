"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var repeater_1 = require("app/repeater");
var home_component_1 = require("app/home.component");
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    {
        path: '',
        component: repeater_1.Repeater,
        children: [
            { path: 'game', component: repeater_1.Repeater }
        ]
    }
];
