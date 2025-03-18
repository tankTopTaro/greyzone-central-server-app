import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import playersRouter from './routes/players.js';
import teamsRouter from './routes/teams.js';
import imagesRouter from './routes/images.js';
import facilitySessionRouter from './routes/facility-session.js';
import gameSessionsRouter from './routes/game-sessions.js';
import downloadRouter from './routes/download.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(['/api/players', '/players'], playersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/facility-session', facilitySessionRouter);
app.use('/api/game-sessions', gameSessionsRouter);
app.use('/api/download', downloadRouter);
app.get('/api/health', (req, res) => { res.json({status: 'ok'}) });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
