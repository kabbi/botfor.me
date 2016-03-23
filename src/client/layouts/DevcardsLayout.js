import { Grid, Col, Row, ListGroup } from 'react-bootstrap';

import ListGroupItemLink from 'components/redux/ListGroupItemLink';

function DevcardsLayout({ children, route }) {
  return (
    <Grid className="container">
      <Row className="show-grid">
        <Col md={3}>
          <ListGroup>
            {route.childRoutes.map(({ component, path }) => (
              <ListGroupItemLink key={path}
                header={component.dcHeader}
                to={`/devcards/${path}`}
              >
                {component.dcDescription}
              </ListGroupItemLink>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          {children}
        </Col>
      </Row>
    </Grid>
  );
}

DevcardsLayout.propTypes = {
  children: React.PropTypes.element,
  route: React.PropTypes.object.isRequired
};

export default DevcardsLayout;
