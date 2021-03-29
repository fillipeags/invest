const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🔥 Server started running at http://localhost:3333'));
