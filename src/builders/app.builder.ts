import express, {Express} from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

export interface ModuleI {
    fn: (instance: Express) => Promise<void> | void,
    callback?: (instance: Express) => Promise<void> | void
}

export interface AppBuilderOptionsI {
    PORT: number,
    modules?: ModuleI[]
}

export class AppBuilder{

    private static makeApplicationInstance(): Express{
        return express();
    }

    public static async build(options: AppBuilderOptionsI){
        const instance = AppBuilder.makeApplicationInstance();
        AppBuilder.configure(instance);
        if(options.modules) {
            for(const module of options.modules){
                await module.fn(instance)
                if(module.callback) await module.callback(instance)
            }
        }
        instance.listen(options.PORT, () => console.log("App started on port: %s", options.PORT))
    }

    private static configure(instance: Express){
        instance.use(express.json())
        instance.use(express.urlencoded({ extended: true }));
        instance.use("/assets", express.static('views/assets'));

        instance.use(cookieParser('php is power'))
        instance.use(session({ cookie: { maxAge: 3600 * 24 } }))
        instance.use(flash())
    }
}
