import 'dotenv/config';

import './env';
import app from './app';
import 'src/lib/prisma';

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.SERVER_PORT || 3001}`,
  );
});
