import LeftNav from 'components/dashboard/LeftNav';

export class DashboardView extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={2}>
            <LeftNav/>
          </Col>
          <Col xs={10}>
            Content
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardView;
