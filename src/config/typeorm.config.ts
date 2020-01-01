import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as config from 'config';

const dbConfig = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    username: process.env.RDS_USERNAME || dbConfig.username,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize
}