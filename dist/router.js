"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var typeorm_1 = require("typeorm");
var Music_1 = require("./entity/Music");
var MinisterioInfo_1 = require("./entity/MinisterioInfo");
var router = (0, express_1.Router)();
exports.router = router;
router.get("/", function (_, res) {
    return res.json({
        message: "Betel Musics API"
    });
});
router.get("/music", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var musicRepository, musics;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                musicRepository = (0, typeorm_1.getManager)().getRepository(Music_1.Music);
                return [4 /*yield*/, musicRepository.find({ relations: ["ministeriosInfo"] })];
            case 1:
                musics = _a.sent();
                return [2 /*return*/, res.status(200).json(musics)];
        }
    });
}); });
router.get("/music/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var musicRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                musicRepository = (0, typeorm_1.getManager)().getRepository(Music_1.Music);
                return [4 /*yield*/, musicRepository.findOneOrFail(req.params.id, {
                        relations: ["ministeriosInfo"]
                    }).then(function (music) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            res.status(200).json(music);
                            return [2 /*return*/];
                        });
                    }); }).catch(function (err) { return res.status(400).json({ err: err }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post("/music", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var musicRepository, music;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                musicRepository = (0, typeorm_1.getManager)().getRepository(Music_1.Music);
                music = req.body;
                return [4 /*yield*/, musicRepository.save(music).then(function (newMusic) {
                        return res.status(200).json(newMusic);
                    }).catch(function (err) {
                        res.status(400).json({ error: true, message: err });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.put("/music/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var musicRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                musicRepository = (0, typeorm_1.getManager)().getRepository(Music_1.Music);
                return [4 /*yield*/, musicRepository.findOneOrFail(req.params.id, {
                        relations: ["ministeriosInfo"]
                    }).then(function (music) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, musicRepository.save(__assign(__assign({}, req.body), { id: music.id, ministeriosInfo: __spreadArray([], music.ministeriosInfo, true) })).then(function (music) {
                                        return res.status(200).json(music);
                                    }).catch(function (err) {
                                        return res.status(400).json({ error: true, message: err });
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (err) { return res.status(400).json(err); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.put("/minist/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ministerioRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ministerioRepository = (0, typeorm_1.getManager)().getRepository(MinisterioInfo_1.MinisterioInfo);
                return [4 /*yield*/, ministerioRepository.findOneOrFail(req.params.id).then(function (minist) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ministerioRepository.save(__assign(__assign({}, req.body), { id: minist.id })).then(function (minist) {
                                        return res.status(200).json(minist);
                                    }).catch(function (err) {
                                        return res.status(400).json({ error: true, message: err });
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (err) { return res.status(400).json(err); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.put("/music/:id/:ministName", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var musicRepository, music;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                musicRepository = (0, typeorm_1.getManager)().getRepository(Music_1.Music);
                return [4 /*yield*/, musicRepository.findOneOrFail(req.params.id, {
                        relations: ["ministeriosInfo"]
                    }).then(function (music) { return __awaiter(void 0, void 0, void 0, function () {
                        var minists, findMinist, ministId, ministerioRepository;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    minists = music.ministeriosInfo;
                                    findMinist = minists.find(function (minist) { return minist.ministerio == req.params.ministName; });
                                    ministId = findMinist == undefined ? 0 : findMinist.id;
                                    ministerioRepository = (0, typeorm_1.getManager)().getRepository(MinisterioInfo_1.MinisterioInfo);
                                    if (!!ministId) return [3 /*break*/, 2];
                                    return [4 /*yield*/, ministerioRepository.save(__assign(__assign({}, req.body), { ministerio: req.params.ministName, music: music })).then(function (minist) {
                                            return res.status(200).json(minist);
                                        }).catch(function (err) { return res.status(400).json(err); })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, ministerioRepository.findOneOrFail(ministId).then(function (minist) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, ministerioRepository.save(__assign(__assign({}, req.body), { id: minist.id })).then(function (minist) {
                                                        return res.status(200).json(minist);
                                                    }).catch(function (err) {
                                                        return res.status(400).json({ error: true, message: err });
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }).catch(function (err) { return res.status(400).json(err); })];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (err) { return res.status(400).json({ message: "Esta música é inválida", err: err }); })];
            case 1:
                music = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.delete("/music/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var musicRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                musicRepository = (0, typeorm_1.getManager)().getRepository(Music_1.Music);
                return [4 /*yield*/, musicRepository.findOneOrFail(req.params.id).then(function (music) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, musicRepository.remove(music).then(function (music) {
                                        return res.status(200).json(music);
                                    }).catch(function (err) {
                                        return res.status(400).json({ error: true, message: err });
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (err) { return res.status(400).json(err); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=router.js.map