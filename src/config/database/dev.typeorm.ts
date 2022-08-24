import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_DB_HOST,
  port: 5432,
  username: process.env.TYPEORM_DB_USERNAME,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_DATABASE
    ? process.env.TYPEORM_DB_DATABASE
    : "bookvendor",
  synchronize: process.env.NODE_ENV === "production" ? false : true,
  logging: process.env.NODE_ENV === "production" ? false : true,
  subscribers: [],
  entities: ["dist/src/entity/**/*.js"],
  migrations: ["dist/src/migrations/**/*.js"],
});

export function DBConnection() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized");
    })
    .catch((err) => {
      console.log("Error during Data Source initialization", err);
    });
}
