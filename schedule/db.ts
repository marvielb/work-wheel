import * as mongoDB from 'mongodb';

const client = new mongoDB.MongoClient(Bun.env.DB_CONN_STRING || '');

await client.connect();

const db: mongoDB.Db = client.db(Bun.env.DB_NAME);
export const schedulesCollection = db.collection('schedules');

export default db;
