const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/players', require('./routes/players'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/images', require('./routes/images'));
app.use('/api/facility-session', require('./routes/facility-session'));
app.use('/api/game-sessions', require('./routes/game-sessions'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
