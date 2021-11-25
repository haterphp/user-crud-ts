/**
 * Dotenv config
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })

import {AppBuilder} from "./src/builders/app.builder";
import hbs from './src/hbs.module';

/**
 * Router module and application endpoints
 */
import {router} from "./src/router.module";
import {UsersController} from "./src/modules/users/users.controller";
import {initDatabase} from "./src/mongoose.module";


const options = {
    PORT: Number(process.env.PORT),
    modules: [
        initDatabase(process.env.MONGOOSE_CONNECT),
        hbs({
            rootDir: process.env.HBS_ROOT_DIR,
            layoutsDir: process.env.HBS_LAYOUT_DIR,
            partialDir: process.env.HBS_LAYOUT_PARTIALS,
            extname: 'hbs',
        }),
        router([
            UsersController
        ])
    ]
}

AppBuilder.build(options);
