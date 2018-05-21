"use strict";
import { InfoEstudComponent } from './info-estud/info-estud.component';
import { HorariosComponent } from './horarios/horarios.component';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var angular2_materialize_1 = require('angular2-materialize');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var lista_clase_component_1 = require('./lista-clase/lista-clase.component');
var boleta_component_1 = require('./boleta/boleta.component');
var notas_component_1 = require('./notas/notas.component');
var page_not_found_component_1 = require('./page-not-found/page-not-found.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                // Aplicación
                lista_clase_component_1.ListaClaseComponent,
                boleta_component_1.BoletaComponent,
                notas_component_1.NotasComponent,
                page_not_found_component_1.PageNotFoundComponent,
    InfoEstudComponent,
    HorariosComponent
],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                angular2_materialize_1.MaterializeModule,
                app_routing_module_1.AppRoutingModule,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map