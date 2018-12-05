// borg style history singleton
import { createBrowserHistory } from 'history';

export default createBrowserHistory();

export function basename(path: string) {
  if (path.charAt(0) === '/') {
    return path.split('/')[1];
  } else {
    return path.split('/')[0];
  }
}
