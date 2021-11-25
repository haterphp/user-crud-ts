import Router, {Express} from "express";

interface RouteOptionsI {
    method: string;
    pathname: string;
    fn: Function;
}

interface ControllerOptionsI {
    prefix?: string,
    routes?: RouteOptionsI[]
}

const routeGroups: Map<any, ControllerOptionsI> = new Map();
const createRouteGroup = (constructor) => {
    if(!routeGroups.has(constructor))
        routeGroups.set(constructor, { prefix: "", routes: [] })
}
const routePush = (target: any, method: string, pathname: string, fn: Function) => {
    createRouteGroup(target.constructor);
    routeGroups.get(target.constructor).routes = [
        ...routeGroups.get(target.constructor).routes,
        {
            method,
            pathname,
            fn: fn.bind(target)
        }
    ]
}

export const Controller = (prefix: string = "") => {
    return function (constructor: any) {
        createRouteGroup(constructor);
        routeGroups.get(constructor).prefix = prefix;
    }
}

export const Get = (pathname: string = "") => {
    return function (target: any, propName: string){
        const instance = new target.constructor();
        routePush(instance, 'get', pathname, instance[propName]);
    }
}

export const Post = (pathname: string = "") => {
    return function (target: any, propName: string){
        const instance = new target.constructor();
        routePush(instance, 'post', pathname, instance[propName]);
    }
}

export const router = (subroutes: any[] = []) => ({
    fn: (app: Express) => {
        const globalRouter = Router();
        routeGroups.forEach ((options: ControllerOptionsI) => {
            const router = Router();
            options.routes.forEach(({ pathname, method, fn }: RouteOptionsI) => router[method](pathname, fn));
            globalRouter.use("/" + options.prefix, router);
        });
        app.use(globalRouter);
    }
})

