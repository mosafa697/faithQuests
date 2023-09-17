import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: [
                'development',
                'production'
            ]
        }),
        PORT_NUMBER: port({ default: 3000 }),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
    });
}

export default validateEnv;
