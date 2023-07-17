import express from 'express';
import envVars from './config/env-config';
// import questionRoutes from './routes/question-routes'

const app = express();
// app.use('/question', questionRoutes);

app.listen(envVars.port_number, () => {
    console.log('hello fe55o');
})