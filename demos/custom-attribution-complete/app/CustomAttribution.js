/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/widgets/Attribution/AttributionViewModel"], function (require, exports, __extends, __decorate, watchUtils, decorators_1, Widget, widget_1, AttributionViewModel) {
    "use strict";
    var CSS = {
        base: "esri-widget esri-custom-attribution",
    };
    // function getLayerView(layer: Layer, view: MapView | SceneView): LayerView {
    //   return (view as any).allLayerViews.find((lv: LayerView) => lv.layer === layer);
    // }
    var Attribution = /** @class */ (function (_super) {
        __extends(Attribution, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function Attribution(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new AttributionViewModel();
            return _this;
        }
        Attribution.prototype.postInitialize = function () {
            var _this = this;
            this.own(watchUtils.on(this, "viewModel.items", "change", function () { return _this.scheduleRender(); }));
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Attribution.prototype.render = function () {
            var tableNode = this.view.ready ? (widget_1.tsx("table", null,
                widget_1.tsx("tr", null,
                    widget_1.tsx("th", null, "Layer"),
                    widget_1.tsx("th", null, "Visible"),
                    widget_1.tsx("th", null, "Type"),
                    widget_1.tsx("th", null, "Source(s)"),
                    widget_1.tsx("th", null, "Extent")),
                this._renderItems())) : null;
            return (widget_1.tsx("div", { class: CSS.base }, tableNode));
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        Attribution.prototype._zoomTo = function (event) {
            var extent = event.currentTarget["data-extent"];
            var view = this.view;
            if (!extent || !view) {
                return;
            }
            view.goTo(extent);
        };
        Attribution.prototype._getLayerUrl = function (layer) {
            return layer.url || null;
        };
        Attribution.prototype._renderItem = function (item) {
            var text = item.text, layer = item.layer;
            var layerUrl = this._getLayerUrl(layer);
            var layerTitleNode = layerUrl ?
                (widget_1.tsx("a", { target: "_blank", href: layerUrl }, layer.title)) :
                (widget_1.tsx("span", null, layer.title));
            // const layerView = getLayerView(layer, this.view);
            // console.log(layerView);
            return (widget_1.tsx("tr", { key: item },
                widget_1.tsx("td", null, layerTitleNode),
                widget_1.tsx("td", null, !!layer.visible),
                widget_1.tsx("td", null, layer.type),
                widget_1.tsx("td", null, text),
                widget_1.tsx("td", null,
                    widget_1.tsx("a", { bind: this, "data-extent": layer.fullExtent, onclick: this._zoomTo }, "Zoom to"))));
        };
        Attribution.prototype._renderItems = function () {
            var _this = this;
            return this.viewModel.items.toArray().map(function (item) { return _this._renderItem(item); });
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Attribution.prototype, "view", void 0);
        __decorate([
            decorators_1.property({
                type: AttributionViewModel
            }),
            widget_1.renderable([
                "state",
                "view.size"
            ])
        ], Attribution.prototype, "viewModel", void 0);
        Attribution = __decorate([
            decorators_1.subclass("esri.widgets.Attribution")
        ], Attribution);
        return Attribution;
    }(decorators_1.declared(Widget)));
    return Attribution;
});
//# sourceMappingURL=CustomAttribution.js.map