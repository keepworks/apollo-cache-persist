(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['apollo-cache-persist'] = {}));
}(this, (function (exports) { 'use strict';

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var Log = (function () {
        function Log(options) {
            var _a = options.debug, debug = _a === void 0 ? false : _a;
            this.debug = debug;
            this.lines = [];
        }
        Log.prototype.emit = function (level, message) {
            if (level in console) {
                var prefix = Log.prefix;
                console[level].apply(console, __spreadArrays([prefix], message));
            }
        };
        Log.prototype.tailLogs = function () {
            var _this = this;
            this.lines.forEach(function (_a) {
                var level = _a[0], message = _a[1];
                return _this.emit(level, message);
            });
        };
        Log.prototype.getLogs = function () {
            return this.lines;
        };
        Log.prototype.write = function (level, message) {
            var buffer = Log.buffer;
            this.lines = __spreadArrays(this.lines.slice(1 - buffer), [[level, message]]);
            if (this.debug || level !== 'log') {
                this.emit(level, message);
            }
        };
        Log.prototype.info = function () {
            var message = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                message[_i] = arguments[_i];
            }
            this.write('log', message);
        };
        Log.prototype.warn = function () {
            var message = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                message[_i] = arguments[_i];
            }
            this.write('warn', message);
        };
        Log.prototype.error = function () {
            var message = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                message[_i] = arguments[_i];
            }
            this.write('error', message);
        };
        Log.buffer = 30;
        Log.prefix = '[apollo-cache-persist]';
        return Log;
    }());

    var Cache = (function () {
        function Cache(options) {
            var cache = options.cache, _a = options.serialize, serialize = _a === void 0 ? true : _a;
            this.cache = cache;
            this.serialize = serialize;
        }
        Cache.prototype.extract = function () {
            var data = this.cache.extract();
            if (this.serialize) {
                data = JSON.stringify(data);
            }
            return data;
        };
        Cache.prototype.restore = function (data) {
            if (this.serialize && typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data != null) {
                this.cache.restore(data);
            }
        };
        return Cache;
    }());

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var Storage = (function () {
        function Storage(options) {
            var storage = options.storage, _a = options.key, key = _a === void 0 ? 'apollo-cache-persist' : _a;
            this.storage = storage;
            this.key = key;
        }
        Storage.prototype.read = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this.storage.getItem(this.key)];
                });
            });
        };
        Storage.prototype.write = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.storage.setItem(this.key, data)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Storage.prototype.purge = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.storage.removeItem(this.key)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Storage.prototype.getSize = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.storage.getItem(this.key)];
                        case 1:
                            data = _a.sent();
                            if (data == null) {
                                return [2, 0];
                            }
                            else {
                                return [2, typeof data === 'string' ? data.length : null];
                            }
                    }
                });
            });
        };
        return Storage;
    }());

    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var Persistor = (function () {
        function Persistor(_a, options) {
            var log = _a.log, cache = _a.cache, storage = _a.storage;
            var _b = options.maxSize, maxSize = _b === void 0 ? 1024 * 1024 : _b, persistenceMapper = options.persistenceMapper;
            this.log = log;
            this.cache = cache;
            this.storage = storage;
            this.paused = false;
            if (persistenceMapper) {
                this.persistenceMapper = persistenceMapper;
            }
            if (maxSize) {
                this.maxSize = maxSize;
            }
        }
        Persistor.prototype.persist = function () {
            return __awaiter$1(this, void 0, void 0, function () {
                var data, error_1;
                return __generator$1(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            data = this.cache.extract();
                            if (!(!this.paused && this.persistenceMapper)) return [3, 2];
                            return [4, this.persistenceMapper(data)];
                        case 1:
                            data = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(this.maxSize != null &&
                                typeof data === 'string' &&
                                data.length > this.maxSize &&
                                !this.paused)) return [3, 4];
                            return [4, this.purge()];
                        case 3:
                            _a.sent();
                            this.paused = true;
                            return [2];
                        case 4:
                            if (this.paused) {
                                return [2];
                            }
                            return [4, this.storage.write(data)];
                        case 5:
                            _a.sent();
                            this.log.info(typeof data === 'string'
                                ? "Persisted cache of size " + data.length + " characters"
                                : 'Persisted cache');
                            return [3, 7];
                        case 6:
                            error_1 = _a.sent();
                            this.log.error('Error persisting cache', error_1);
                            throw error_1;
                        case 7: return [2];
                    }
                });
            });
        };
        Persistor.prototype.restore = function () {
            return __awaiter$1(this, void 0, void 0, function () {
                var data, error_2;
                return __generator$1(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4, this.storage.read()];
                        case 1:
                            data = _a.sent();
                            if (!(data != null)) return [3, 3];
                            return [4, this.cache.restore(data)];
                        case 2:
                            _a.sent();
                            this.log.info(typeof data === 'string'
                                ? "Restored cache of size " + data.length + " characters"
                                : 'Restored cache');
                            return [3, 4];
                        case 3:
                            this.log.info('No stored cache to restore');
                            _a.label = 4;
                        case 4: return [3, 6];
                        case 5:
                            error_2 = _a.sent();
                            this.log.error('Error restoring cache', error_2);
                            throw error_2;
                        case 6: return [2];
                    }
                });
            });
        };
        Persistor.prototype.purge = function () {
            return __awaiter$1(this, void 0, void 0, function () {
                var error_3;
                return __generator$1(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.storage.purge()];
                        case 1:
                            _a.sent();
                            this.log.info('Purged cache storage');
                            return [3, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.log.error('Error purging cache storage', error_3);
                            throw error_3;
                        case 3: return [2];
                    }
                });
            });
        };
        return Persistor;
    }());

    var onCacheWrite = (function (_a) {
        var cache = _a.cache;
        return function (persist) {
            var write = cache.write;
            var evict = cache.evict;
            var modify = cache.modify;
            cache.write = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = write.apply(cache, args);
                persist();
                return result;
            };
            cache.evict = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = evict.apply(cache, args);
                persist();
                return result;
            };
            cache.modify = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = modify.apply(cache, args);
                persist();
                return result;
            };
            return function () {
                cache.write = write;
                cache.evict = evict;
                cache.modify = modify;
            };
        };
    });

    var onAppBackground = (function (_a) {
        var log = _a.log, cache = _a.cache;
        return function (persist) {
            log.warn('Trigger option `background` not available on web; using `write` trigger');
            return onCacheWrite({ cache: cache })(persist);
        };
    });

    var Trigger = (function () {
        function Trigger(_a, options) {
            var _this = this;
            var log = _a.log, persistor = _a.persistor;
            this.fire = function () {
                if (!_this.debounce) {
                    _this.persist();
                    return;
                }
                if (_this.timeout != null) {
                    clearTimeout(_this.timeout);
                }
                _this.timeout = setTimeout(_this.persist, _this.debounce);
            };
            this.persist = function () {
                if (_this.paused) {
                    return;
                }
                _this.persistor.persist();
            };
            var defaultDebounce = Trigger.defaultDebounce;
            var cache = options.cache, debounce = options.debounce, _b = options.trigger, trigger = _b === void 0 ? 'write' : _b;
            if (!trigger) {
                return;
            }
            this.debounce = debounce != null ? debounce : defaultDebounce;
            this.persistor = persistor;
            this.paused = false;
            switch (trigger) {
                case 'write':
                    this.uninstall = onCacheWrite({ cache: cache })(this.fire);
                    break;
                case 'background':
                    if (debounce) {
                        log.warn('Debounce is not recommended with `background` trigger');
                    }
                    this.debounce = debounce;
                    this.uninstall = onAppBackground({ cache: cache, log: log })(this.fire);
                    break;
                default:
                    if (typeof trigger === 'function') {
                        this.uninstall = trigger(this.fire);
                    }
                    else {
                        throw Error("Unrecognized trigger option: " + trigger);
                    }
            }
        }
        Trigger.prototype.pause = function () {
            this.paused = true;
        };
        Trigger.prototype.resume = function () {
            this.paused = false;
        };
        Trigger.prototype.remove = function () {
            if (this.uninstall) {
                this.uninstall();
                this.uninstall = null;
                this.paused = true;
            }
        };
        Trigger.defaultDebounce = 1000;
        return Trigger;
    }());

    var CachePersistor = (function () {
        function CachePersistor(options) {
            if (!options.cache) {
                throw new Error('In order to persist your Apollo Cache, you need to pass in a cache. ' +
                    'Please see https://www.apollographql.com/docs/react/basics/caching.html for our default InMemoryCache.');
            }
            if (!options.storage) {
                throw new Error('In order to persist your Apollo Cache, you need to pass in an underlying storage provider. ' +
                    'Please see https://github.com/apollographql/apollo-cache-persist#storage-providers');
            }
            var log = new Log(options);
            var cache = new Cache(options);
            var storage = new Storage(options);
            var persistor = new Persistor({ log: log, cache: cache, storage: storage }, options);
            var trigger = new Trigger({ log: log, persistor: persistor }, options);
            this.log = log;
            this.cache = cache;
            this.storage = storage;
            this.persistor = persistor;
            this.trigger = trigger;
        }
        CachePersistor.prototype.persist = function () {
            return this.persistor.persist();
        };
        CachePersistor.prototype.restore = function () {
            return this.persistor.restore();
        };
        CachePersistor.prototype.purge = function () {
            return this.persistor.purge();
        };
        CachePersistor.prototype.pause = function () {
            this.trigger.pause();
        };
        CachePersistor.prototype.resume = function () {
            this.trigger.resume();
        };
        CachePersistor.prototype.remove = function () {
            this.trigger.remove();
        };
        CachePersistor.prototype.getLogs = function (print) {
            if (print === void 0) { print = false; }
            if (print) {
                this.log.tailLogs();
            }
            else {
                return this.log.getLogs();
            }
        };
        CachePersistor.prototype.getSize = function () {
            return this.storage.getSize();
        };
        return CachePersistor;
    }());

    var persistCache = (function (options) {
        var persistor = new CachePersistor(options);
        return persistor.restore();
    });

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var persistCacheSync = function (options) {
        var cachePersistor = new SynchronousCachePersistor(options);
        cachePersistor.restoreSync();
    };
    var SynchronousCachePersistor = (function (_super) {
        __extends(SynchronousCachePersistor, _super);
        function SynchronousCachePersistor(options) {
            var _this = _super.call(this, options) || this;
            _this.storage = new SynchronousStorage(options);
            _this.persistor = new SynchronousPersistor({ log: _this.log, cache: _this.cache, storage: _this.storage }, options);
            return _this;
        }
        SynchronousCachePersistor.prototype.restoreSync = function () {
            this.persistor.restoreSync();
        };
        return SynchronousCachePersistor;
    }(CachePersistor));
    var SynchronousPersistor = (function (_super) {
        __extends(SynchronousPersistor, _super);
        function SynchronousPersistor(_a, options) {
            var log = _a.log, cache = _a.cache, storage = _a.storage;
            return _super.call(this, { log: log, cache: cache, storage: storage }, options) || this;
        }
        SynchronousPersistor.prototype.restoreSync = function () {
            this.cache.restore(this.storage.readSync());
        };
        return SynchronousPersistor;
    }(Persistor));
    var SynchronousStorage = (function (_super) {
        __extends(SynchronousStorage, _super);
        function SynchronousStorage(options) {
            return _super.call(this, options) || this;
        }
        SynchronousStorage.prototype.readSync = function () {
            return this.storage.getItem(this.key);
        };
        return SynchronousStorage;
    }(Storage));

    var AsyncStorageWrapper = (function () {
        function AsyncStorageWrapper(storage) {
            this.storage = storage;
        }
        AsyncStorageWrapper.prototype.getItem = function (key) {
            return this.storage.getItem(key);
        };
        AsyncStorageWrapper.prototype.removeItem = function (key) {
            return this.storage.removeItem(key);
        };
        AsyncStorageWrapper.prototype.setItem = function (key, value) {
            return this.storage.setItem(key, value);
        };
        return AsyncStorageWrapper;
    }());

    var IonicStorageWrapper = (function () {
        function IonicStorageWrapper(storage) {
            this.storage = storage;
        }
        IonicStorageWrapper.prototype.getItem = function (key) {
            return this.storage.get(key);
        };
        IonicStorageWrapper.prototype.removeItem = function (key) {
            return this.storage.remove(key);
        };
        IonicStorageWrapper.prototype.setItem = function (key, value) {
            return this.storage.set(key, value);
        };
        return IonicStorageWrapper;
    }());

    var LocalForageWrapper = (function () {
        function LocalForageWrapper(storage) {
            this.storage = storage;
        }
        LocalForageWrapper.prototype.getItem = function (key) {
            return this.storage.getItem(key);
        };
        LocalForageWrapper.prototype.removeItem = function (key) {
            return this.storage.removeItem(key);
        };
        LocalForageWrapper.prototype.setItem = function (key, value) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.storage
                    .setItem(key, value)
                    .then(function () { return resolve(); })
                    .catch(function () { return reject(); });
            });
        };
        return LocalForageWrapper;
    }());

    var LocalStorageWrapper = (function () {
        function LocalStorageWrapper(storage) {
            this.storage = storage;
        }
        LocalStorageWrapper.prototype.getItem = function (key) {
            return this.storage.getItem(key);
        };
        LocalStorageWrapper.prototype.removeItem = function (key) {
            return this.storage.removeItem(key);
        };
        LocalStorageWrapper.prototype.setItem = function (key, value) {
            return this.storage.setItem(key, value);
        };
        return LocalStorageWrapper;
    }());

    var MMKVStorageWrapper = (function () {
        function MMKVStorageWrapper(storage) {
            this.storage = storage;
        }
        MMKVStorageWrapper.prototype.getItem = function (key) {
            return this.storage.getItem(key);
        };
        MMKVStorageWrapper.prototype.removeItem = function (key) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.storage
                    .removeItem(key)
                    .then(function () { return resolve(); })
                    .catch(function () { return reject(); });
            });
        };
        MMKVStorageWrapper.prototype.setItem = function (key, value) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.storage
                    .setItem(key, value)
                    .then(function () { return resolve(); })
                    .catch(function () { return reject(); });
            });
        };
        return MMKVStorageWrapper;
    }());

    var SessionStorageWrapper = (function () {
        function SessionStorageWrapper(storage) {
            this.storage = storage;
        }
        SessionStorageWrapper.prototype.getItem = function (key) {
            return this.storage.getItem(key);
        };
        SessionStorageWrapper.prototype.removeItem = function (key) {
            return this.storage.removeItem(key);
        };
        SessionStorageWrapper.prototype.setItem = function (key, value) {
            return this.storage.setItem(key, value);
        };
        return SessionStorageWrapper;
    }());

    exports.AsyncStorageWrapper = AsyncStorageWrapper;
    exports.CachePersistor = CachePersistor;
    exports.IonicStorageWrapper = IonicStorageWrapper;
    exports.LocalForageWrapper = LocalForageWrapper;
    exports.LocalStorageWrapper = LocalStorageWrapper;
    exports.MMKVStorageWrapper = MMKVStorageWrapper;
    exports.SessionStorageWrapper = SessionStorageWrapper;
    exports.SynchronousCachePersistor = SynchronousCachePersistor;
    exports.SynchronousPersistor = SynchronousPersistor;
    exports.SynchronousStorage = SynchronousStorage;
    exports.persistCache = persistCache;
    exports.persistCacheSync = persistCacheSync;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.umd.js.map
