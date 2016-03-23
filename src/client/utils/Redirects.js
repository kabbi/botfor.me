import history from 'routes/history';

export const getCurrentLocation = () => {
  let currentLocation = null;
  const unlisten = history.listen(location => {
    currentLocation = location;
  });
  unlisten();

  const { basename, pathname } = currentLocation;
  return basename + pathname;
};

export const redirectSignIn = () => {
  history.push('/signin');
};

export const redirectDashboard = () => {
  history.push('/dashboard');
};

export const redirectEditBot = botId => {
  history.push(`/editor/${botId}`);
};
