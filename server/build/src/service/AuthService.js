"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AuthManager_instances, _AuthManager_deleteRefreshToken;
Object.defineProperty(exports, "__esModule", { value: true });
const jwtManager_1 = require("../utils/jwtManager");
class AuthManager {
    constructor() {
        _AuthManager_instances.add(this);
        this.tokenStore = new Map();
    }
    //리프래시 토큰저장
    storeRefreshToken(manager, refreshToken) {
        this.tokenStore.set(manager.id, refreshToken);
    }
    //액세스 토큰 재발급
    refreshAccessToken(manager, refreshToken) {
        try {
            const valid = (0, jwtManager_1.verifyRefreshToken)(manager, refreshToken);
            if (valid) {
                return (0, jwtManager_1.issueAccessToken)(manager);
            }
            return false;
        }
        catch (error) {
            console.error(error);
            __classPrivateFieldGet(this, _AuthManager_instances, "m", _AuthManager_deleteRefreshToken).call(this, manager);
            return false;
        }
    }
}
_AuthManager_instances = new WeakSet(), _AuthManager_deleteRefreshToken = function _AuthManager_deleteRefreshToken(manager) {
    this.tokenStore.delete(manager.id);
};
const authManager = new AuthManager();
exports.default = authManager;
