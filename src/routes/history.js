import { createHistory, useBasename } from 'history';
export default useBasename(createHistory)({
  basename: __BASENAME__
});
