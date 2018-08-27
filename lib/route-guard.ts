import * as express from "express";
import * as  jwt from 'jsonwebtoken';

class RouteGuard {

  public protectedRoutes = [
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
  ]

  public interceptor() {
    return ((req: express.Request, res: express.Response, next: Function) => {

      let isGuarded = false
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
    })
  }

  private checkGurdedRoute(req: express.Request, res: express.Response, next: Function, role: string) {

    if (typeof req.headers.authorization === 'undefined') {
      return res.status(401).json({ error: "Invalid JSON token" });
    }

    var token = req.headers.authorization;

    jwt.verify(token, process.env.SECRET_PASSWORD, ((err, token) => {
      if (err || role !== token.role) {
        return res.status(401).json({ error: "Your role have no acces to this endpoint" });
      } else {
        next()
      }
    }));
  }
}

export default new RouteGuard().interceptor()