import { helper } from '@ember/component/helper';

export function string([ toString ]/*, hash*/) {
  return String(toString);
}

export default helper(string);
