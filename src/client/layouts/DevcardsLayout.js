import { Grid, Col, ListGroup, Panel, Row } from 'react-bootstrap';

import ListGroupItemLink from 'components/redux/ListGroupItemLink';
import { formatTitleCase } from 'utils/formatters';

export const DevcardsLayout = ({ children, route: { childRoutes } }) => {
  const routesByCategory = childRoutes.reduce((result, route) => {
    const { category = 'generic' } = route.component.dcGroup;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(route);
    return result;
  }, {});

  const categories = ['generic', ...Object.keys(routesByCategory).filter(category => (
    category !== 'generic'
  )).sort()];

  return (
    <Grid className="container">
      <Row className="show-grid">
        <Col md={3}>
          {categories.map(category => (
            <Panel
              collapsible
              key={category}
              defaultExpanded={category === 'generic'}
              header={category !== 'generic' ? formatTitleCase(category) : null}
            >
              <ListGroup fill>
                {routesByCategory[category].map(({ component, path }) => (
                  <ListGroupItemLink key={path}
                    to={`/devcards/${path}`}
                  >
                    {component.dcGroup.title}
                  </ListGroupItemLink>
                ))}
              </ListGroup>
            </Panel>
          ))}
        </Col>
        <Col md={9}>
          {children}
        </Col>
      </Row>
    </Grid>
  );
};

DevcardsLayout.propTypes = {
  children: React.PropTypes.element,
  route: React.PropTypes.object.isRequired
};

export default DevcardsLayout;
