'use strict'
require('dotenv').config({ silent: true });
const express = require('express');
const logger  = require('morgan');
const path    = require('path');
const app     = express();
const PORT    = process.argv[2] || process.env.port || 3000;

app.use(logger('dev'));

app.use('/api/youtube', require('./routes/youtube.js'))

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/playlist', require('./routes/playlist.js'));

app.listen(PORT, () => console.log('server here! listening on', PORT));
