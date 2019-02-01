// borg style history singleton
import { createBrowserHistory } from 'history';

import { BASENAME } from "./Constants";

export default createBrowserHistory({ basename: BASENAME });

export function basename(path: string) {
  if (path.charAt(0) === '/') {
    return path.split('/')[1];
  } else {
    return path.split('/')[0];
  }
}
