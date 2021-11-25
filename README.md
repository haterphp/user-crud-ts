# **User Crud**

Для начала необходимо установить пакетный менеджер `yarn`
~~~~
> npm i -g yarn
~~~~

## **Установка через docker-compose**
~~~~
> docker-compose up -d --build
> docker ps -a
~~~~
После этого приложение будет доступно по адресу `localhost:7000` или же `{{YOUR_HOST}}:7000` <br/>
Порт приложения можно легко поменять в файле `docker-compose.yml`:
~~~~
ports:
      - {{YOUR_PORT}}:7000
~~~~

## **Обычная Установка**
_Для функционирования программы нужна NoSQL БД MongoDB_ <br/>
Для нужно настроить окружение нашей программы для этого нужно создать файл `.env` с примерным содержанием:
~~~~
PORT={{YOUR_PORT}}

HBS_ROOT_DIR=views
HBS_LAYOUT_DIR=/layouts
HBS_LAYOUT_PARTIALS=/partials

MONGOOSE_CONNECT=mongodb://localhost:27017/user-crud
~~~~
После нужно установить все пакеты командой:
~~~~
> yarn install
~~~~
Запускается приложение командой:
~~~~
> yarn start:dev
~~~~

### **Сборка приложения**
Для сборки приложения используйте следующие команды:
~~~~
> yarn build
> yarn start:prod
~~~~
После этого приложение будет доступно по адресу `localhost:{{YOUR_PORT}}`
