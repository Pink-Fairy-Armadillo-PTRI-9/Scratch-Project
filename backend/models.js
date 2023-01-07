const { Pool } = require("pg");

const PG_URI =
  "postgres://qjpvwcxx:W_wLRzIkQe8mye7raWmxLNhPu4hw8wqD@salt.db.elephantsql.com/qjpvwcxx";

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
