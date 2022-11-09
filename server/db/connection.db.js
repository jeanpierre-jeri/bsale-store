import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: 'bsale_test',
  password: 'bsale_test',
  database: 'bsale_test',
  namedPlaceholders: true,
})
