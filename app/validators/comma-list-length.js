export default function commaListLength({ length = 1, label } = {}) {
  return (key, newValue/*, oldValue, changes, content*/) => {
    if (!newValue) {
      return false
    }
    let listified = newValue.split(',');
    if (listified.length < length) {
      return `Must have more than ${length} ${label}`;
    } else {
      return true;
    }
  };
}
