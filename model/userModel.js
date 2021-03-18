if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const { Pool } = require('pg');

const PG_URI = `${process.env.DATABASE_URL2}`
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
