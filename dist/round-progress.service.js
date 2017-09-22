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
var core_1 = require('@angular/core');
var DEGREE_IN_RADIANS = Math.PI / 180;
var HAS_DOCUMENT = typeof document !== 'undefined';
var BASE = HAS_DOCUMENT && document.head.querySelector('base');
var HAS_PERF = typeof window !== 'undefined' &&
    window.performance &&
    window.performance.now &&
    typeof window.performance.now() === 'number';
var RoundProgressService = (function () {
    function RoundProgressService() {
        this.supportsSvg = !!(HAS_DOCUMENT &&
            document.createElementNS &&
            document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
    }
    /**
     * Resolves a SVG color against the page's `base` tag.
     * @param  {string} color
     * @return {string}
     */
    RoundProgressService.prototype.resolveColor = function (color) {
        if (BASE && BASE.href) {
            var hashIndex = color.indexOf('#');
            if (hashIndex > -1 && color.indexOf('url') > -1) {
                return color.slice(0, hashIndex) + location.href + color.slice(hashIndex);
            }
        }
        return color;
    };
    /**
     * Generates a timestamp.
     * @return {number}
     */
    RoundProgressService.prototype.getTimestamp = function () {
        return HAS_PERF ? window.performance.now() : Date.now();
    };
    /**
     * Generates the value for an SVG arc.
     * @param  {number}  current       Current value.
     * @param  {number}  total         Maximum value.
     * @param  {number}  pathRadius    Radius of the SVG path.
     * @param  {number}  elementRadius Radius of the SVG container.
     * @param  {boolean=false} isSemicircle  Whether the element should be a semicircle.
     * @return {string}
     */
    RoundProgressService.prototype.getArc = function (current, total, pathRadius, elementRadius, isSemicircle) {
        if (isSemicircle === void 0) { isSemicircle = false; }
        var value = Math.max(0, Math.min(current || 0, total));
        var maxAngle = isSemicircle ? 180 : 359.9999;
        var percentage = (value / total) * maxAngle;
        var start = this._polarToCartesian(elementRadius, pathRadius, percentage);
        var end = this._polarToCartesian(elementRadius, pathRadius, 0);
        var arcSweep = (percentage <= 180 ? 0 : 1);
        return "M " + start + " A " + pathRadius + " " + pathRadius + " 0 " + arcSweep + " 0 " + end;
    };
    ;
    /**
     * Converts polar cooradinates to Cartesian.
     * @param  {number} elementRadius  Radius of the wrapper element.
     * @param  {number} pathRadius     Radius of the path being described.
     * @param  {number} angleInDegrees Degree to be converted.
     * @return {string}
     */
    RoundProgressService.prototype._polarToCartesian = function (elementRadius, pathRadius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
        var x = elementRadius + (pathRadius * Math.cos(angleInRadians));
        var y = elementRadius + (pathRadius * Math.sin(angleInRadians));
        return x + ' ' + y;
    };
    RoundProgressService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RoundProgressService);
    return RoundProgressService;
}());
exports.RoundProgressService = RoundProgressService;
;
//# sourceMappingURL=round-progress.service.js.map