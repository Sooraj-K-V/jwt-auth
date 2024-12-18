import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    database: "jwttutorial",
    port: 5433
});

export default pool;