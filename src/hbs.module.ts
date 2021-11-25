import express, {Express} from "express";
import hbs from 'hbs';
import {engine} from 'express-handlebars';

interface HBSOptionsI {
    rootDir?: string;
    layoutsDir: string;
    defaultLayout?: string;
    extname: string;
    partialDir?: string;
}

export default (options: HBSOptionsI) => ({
    fn: (app: Express) => {
        const rootDir = options.rootDir || "views";
        const HbsSettings: {[key: string]: any} = {
            layoutsDir: rootDir + options.layoutsDir,
            extname: options.extname,
        };
        if(options.defaultLayout) HbsSettings.defaultLayout = options.defaultLayout;
        // @ts-ignore
        app.engine(options.extname, engine(HbsSettings));
        app.set("view engine", options.extname);
        hbs.registerPartials("/" + rootDir + options.partialDir);
    }
})
