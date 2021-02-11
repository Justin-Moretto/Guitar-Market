let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams = {
    connectionString: process.env.DATABASE_URL,
    host: 'ec2-52-22-161-59.compute-1.amazonaws.com',
    port: 5432,
    user: 'eexrsanhdgnbdo',
    password: '6fa671edd598905eea8af8ea2747781c5bb2f0392bec8b3a24eabfb0f229ac05',
    database: 'd1n1ivmg83hvsg',
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 25,
    idleTimeoutMillis: 25
  };
  
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;
