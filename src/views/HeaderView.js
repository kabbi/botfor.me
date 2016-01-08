import AppBar from 'material-ui/lib/app-bar';

export class HeaderView extends React.Component {
  render() {
    return (
      <AppBar
        title='BotFOR'
        iconClassNameRight='muidocs-icon-navigation-expand-more'
      />
    );
  }
}

export default HeaderView;
