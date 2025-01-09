export default {
  HOST: process.env.MYSQL_HOST || 'localhost',
  USER: process.env.MYSQL_USER || 'root',
  PASSWORD: process.env.MYSQL_PASSWORD || '',
  DB: process.env.MYSQL_DB || 'tech_99',
}
