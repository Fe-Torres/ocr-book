import { App } from '../infra/api/app';
import 'dotenv/config';

if (!process.env.PORT) {
  console.log('Error to get env vars');
  process.exit(1);
}

new App().server.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
