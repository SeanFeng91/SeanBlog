import Database from 'better-sqlite3';

let db = null;

export function getDb() {
  if (db) {
    return db;
  }

  db = new Database('src/lib/news_teasers.db', { readonly: true });
  return db;
}

export function query(sql, params = []) {
  const db = getDb();
  return db.prepare(sql).all(params);
}

export function get(sql, params = []) {
  const db = getDb();
  return db.prepare(sql).get(params);
}

export function run(sql, params = []) {
  const db = getDb();
  return db.prepare(sql).run(params);
}
