"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareModule = void 0;
const common_1 = require("@nestjs/common");
const database_resolver_1 = require("../../database/database.resolver");
const repositories_1 = require("./repositories");
const compare_db_interface_1 = require("./repositories/compare.db.interface");
const rest_1 = require("./rest");
const services_1 = require("./services");
let CompareModule = class CompareModule {
};
CompareModule = __decorate([
    (0, common_1.Module)({
        controllers: [rest_1.CompareController],
        providers: [
            services_1.CompareService,
            repositories_1.CompareRepository,
            {
                provide: compare_db_interface_1.ICompareDatabase,
                useClass: (0, database_resolver_1.ResolveDatabaseDependency)('COMPARE'),
            },
        ],
    })
], CompareModule);
exports.CompareModule = CompareModule;
//# sourceMappingURL=compare.rest.module.js.map