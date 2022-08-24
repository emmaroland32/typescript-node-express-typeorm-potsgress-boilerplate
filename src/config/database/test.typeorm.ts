import { DataSource } from "typeorm";
import Database from "better-sqlite3";

export class TestDBHelper {
  private static _instance: TestDBHelper;

  public static get instance(): TestDBHelper {
    if (!this._instance) this._instance = new TestDBHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  private testdb!: any;

  async setupTestDB() {
    this.testdb = new Database(":memory:", { verbose: console.log });
    this.dbConnect = new DataSource({
      name: "default",
      type: "better-sqlite3",
      database: ":memory:",
      entities: ["src/entity/**/*.ts"],
      synchronize: true,
    });

    await this.dbConnect
      .initialize()
      .then(() => console.log("Test Database connection established"));
  }

  teardownTestDB() {
    this.dbConnect.destroy().then(() => console.log("Connection Destroyed"));
    this.testdb.close();
  }
}
