import { MongoClient, Db } from "mongodb";
import url from "url";

let cachedDb: Db | undefined;

export async function getDatabase(uri = process.env.DB_URL): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!uri) {
    throw new Error("No url found to connect");
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const dbName = url.parse(uri)?.substr(1);

  if (!dbName)
    throw new Error("Unable to get the name of database to cnnect to");

  const db = await client.db(dbName);

  cachedDb = db;
  return db;
}
