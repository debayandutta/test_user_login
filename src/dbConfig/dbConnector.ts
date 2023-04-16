import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://admin:root123@localhost:5432/test_user_login',
    idleTimeoutMillis: 30000
});