import { Sequelize } from "sequelize";
// import {
// 	DATABASE_NAME,
// 	DATABASE_USER,
// 	DATABASE_PASSWORD,
// 	DATABASE_HOST,
// } from "./config";

// const db = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
// 	host: DATABASE_HOST,
// 	dialect: "mysql",
// 	logging: false,
// });

const db = new Sequelize( {
	dialect: 'sqlite',
  storage: './database.sqlite'
});

export default db;
