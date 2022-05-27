# TRISTANDAVID_P7_OpenClassrooms

Groupomania P7

Back

Requis

NodeJs: https://nodejs.org/fr/download/

MySQL Server: https://dev.mysql.com/downloads/mysql/

Required package

express: npm install express

express-rate-limit: npm install express-rate-limit

bcrypt: npm install bcrypt

dotenv: npm install dotenv

jsonwebtoken: npm install jsonwebtoken

multer: npm install multer

mysql: npm install mysql

mysql2: npm install mysql2

path: npm install path

sequelize: npm install sequelize

sequelize-cli: npm install -g sequelize-cli

validator: npm install validator

fs: npm install fs

nodemon: npm install -g nodemon

Pour importer la base de données, dans le terminal du back :

sequelize db:create

puis sequelize db:migrate

Required file

.env avec

DB_USERNAME = Utilisateur d'accès à la database

DB_PASSWORD= Mot de passe d'accès à la database

TOKEN_SECRET= clé secrète du token

Vous pouvez lancer le serveur backend avec: nodemon server

Front

Framework : VueJs

CLI: npm install -g @vue/cli

Router: npm install vue-router@next

Vuex: npm install vuex@next

axios: npm install axios

Pour lancer le serveur front-end: npm run serve

Compiles and minifies for production

npm run build

Lints and fixes files

npm run lint

Customize configuration

See [Configuration Reference.](https://cli.vuejs.org/config/)
