import { exec } from 'child_process';
import { chdir } from 'process';

chdir('../');
exec('npx react-scripts build');
