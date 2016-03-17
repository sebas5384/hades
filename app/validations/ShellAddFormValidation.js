import memoize from 'lru-memoize';
import {createValidator, required, minLength, maxLength, email, checked, equalsTo} from './validation';

const ShellAddFormValidation = createValidator({
  alias: [required, minLength(4)],
  host: [required, minLength(2)]
});
export default memoize(10)(ShellAddFormValidation);
