export interface DatabaseConfig {
    file?: string
}

const databaseConfig: DatabaseConfig = {
    file: process.env.DATABASE_URL || 'file:./dev.db'
}

export { databaseConfig }
