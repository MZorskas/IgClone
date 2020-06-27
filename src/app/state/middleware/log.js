const log = ({ dispatch, getState }) => (next) => (action) => {
  console.log({ dispatch, getState, next, action });
  next(action);
};

export default log;
