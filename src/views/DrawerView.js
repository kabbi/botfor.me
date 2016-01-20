import Drawer from 'components/drawer/Drawer';

export class DashboardView extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={2}>
            <Drawer/>
          </Col>
          <Col xs={10}>
            SVG MAGIC HERE
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardView;
