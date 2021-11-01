// this config needed to generate migrations using "npx mikro-orm migration:create --initial"
module.exports = {
  migrations: {
    tableName: 'metadata',
    path: './dist/data/migrations',
    pattern: /^[\w-]+\d+\.js$/,
    transactional: true,
  },
  entities: ['./dist/data/entities'],
  entitiesTs: ['./src/data/entities'],
  type: 'postgresql',
  dbName: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  clientUrl: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
};
