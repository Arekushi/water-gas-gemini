export interface DatabaseConfig {
    url?: string
}

const databaseConfig: DatabaseConfig = {
    url: process.env.DATABASE_URL || 'file:./dev.db'
}

export { databaseConfig }
