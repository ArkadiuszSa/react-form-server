"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class RouteGuard {
    constructor() {
        this.protectedRoutes = [
            {
                path: "/api/happening",
                methods: ['POST', "PUT", 'DELETE',],
                role: 'admin'
            },
            {
                path: "/api/application",
                methods: ['GET', 'PUT', 'DELETE'],
                role: 'admin'
            },
            {
                path: "/api/applications",
                methods: ['GET'],
                role: 'admin'
            }
        ];
    }
    interceptor() {
        return ((req, res, next) => {
            let isGuarded = false;
            let role;
            for (let route of this.protectedRoutes) {
                if (req.url === route.path) {
                    for (let method of route.methods) {
                        if (req.method === method) {
                            isGuarded = true;
                            role = route.role;
                        }
                    }
                }
            }
            if (isGuarded) {
                this.checkGurdedRoute(req, res, next, role);
            }
            else {
                next();
            }
        });
    }
    checkGurdedRoute(req, res, next, role) {
        if (typeof req.headers.authorization === 'undefined') {
            return res.status(401).json({ error: "Invalid JSON token" });
        }
        var token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_PASSWORD, ((err, token) => {
            if (err || role !== token.role) {
                return res.status(401).json({ error: "Your role have no acces to this endpoint" });
            }
            else {
                next();
            }
        }));
    }
}
exports.default = new RouteGuard().interceptor();
//# sourceMappingURL=route-guard.js.map