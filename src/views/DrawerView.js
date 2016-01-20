import Drawer from 'components/drawer/Drawer';

export class DashboardView extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={3}>
            <Drawer/>
          </Col>
          <Col xs={9}>
            SVG MAGIC HERE
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardView;
