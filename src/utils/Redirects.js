import history from 'routes/history';

export const redirectSignIn = () => {
  history.push('/signin');
};

export const redirectHome = () => {
  history.push('/');
};

export const redirectEditBot = botId => {
  history.push(`/editor/${botId}`);
};
