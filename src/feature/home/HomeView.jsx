"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var AMList_1 = require("../../shared/components/AMList");
var AMText_1 = require("../../shared/components/AMText");
var useInfinityScroll_1 = require("../../shared/hooks/useInfinityScroll");
var i18n_1 = require("../../shared/utilities/i18n");
var HomeView = function () {
    var fetchMoreListItems = function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var currentPage, lastIndex, lastItem, response, json, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentPage = options.currentPage, lastIndex = options.lastIndex, lastItem = options.lastItem;
                    console.log(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://api.github.com/search/commits?q=repo:facebook/react+css&page=" + currentPage, {
                            method: "GET",
                            headers: new Headers({
                                Accept: "application/vnd.github.cloak-preview",
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    console.log(json);
                    if (json.items) {
                        return [2 /*return*/, json.items];
                    }
                    return [2 /*return*/, []];
                case 4:
                    e_1 = _a.sent();
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var _a = useInfinityScroll_1.default(fetchMoreListItems), loading = _a[0], data = _a[1], onLoadMore = _a[2], onRefresh = _a[3];
    function renderItem(_a) {
        var item = _a.item, index = _a.index;
        return (<AMText_1.default customStyle={{ height: 50 }} text={item.commit.message}/>);
    }
    return (<react_native_1.View>
            <AMText_1.default text={i18n_1.default.t("common.defaultLanguage")}/>
            <AMList_1.default loading={loading} data={data} renderItem={renderItem} refreshing={false} onRefresh={onRefresh} onLoadMore={onLoadMore}/>
        </react_native_1.View>);
};
exports.default = HomeView;
