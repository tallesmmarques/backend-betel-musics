"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinisterioInfo = void 0;
var typeorm_1 = require("typeorm");
var Music_1 = require("./Music");
var MinisterioInfo = /** @class */ (function () {
    function MinisterioInfo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinisterioInfo.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["sdn-alber", "sdn-lucimeire", "adolescentes"]
        }),
        __metadata("design:type", String)
    ], MinisterioInfo.prototype, "ministerio", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Music_1.Music; }, function (music) { return music.ministeriosInfo; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Music_1.Music)
    ], MinisterioInfo.prototype, "music", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 5
        }),
        __metadata("design:type", String)
    ], MinisterioInfo.prototype, "tom", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", default: "NOW()" }),
        __metadata("design:type", Date)
    ], MinisterioInfo.prototype, "lastPlayed", void 0);
    MinisterioInfo = __decorate([
        (0, typeorm_1.Entity)()
    ], MinisterioInfo);
    return MinisterioInfo;
}());
exports.MinisterioInfo = MinisterioInfo;
//# sourceMappingURL=MinisterioInfo.js.map