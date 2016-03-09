import http from 'http';
import {connect} from 'http-middleware-metalab';

import createApp from 'server/app';

const server = connect(createApp(), http.createServer());

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

server.listen(process.env.PORT);
