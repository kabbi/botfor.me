import { Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

import productPicture from 'static/images/feature.png';
import featureThumb from 'static/images/thumb.png';

export const HomeView = () => (
  <Grid>
    <Row className="text-center">
      <h1>
        Cool bots for you with <strong>botfor.me</strong>!
      </h1>
      <h5 className="text-muted">
        Get your first real bot up and running without writing any code
      </h5>
      <div>
        <img src={productPicture}/>
      </div>
      <p>
        And a stolen picture here.
      </p>
    </Row>
    <hr/>
    <Row>
      <Col md={12} className="text-center">
        <h1>
          Feature descriptions
        </h1>
      </Col>
    </Row>
    <Row>
      <Col md={3}>
        <Thumbnail src={featureThumb} alt="242x200">
          <p className="text-center">Description</p>
        </Thumbnail>
      </Col>
      <Col md={3}>
        <Thumbnail src={featureThumb} alt="242x200">
          <p className="text-center">Description</p>
        </Thumbnail>
      </Col>
      <Col md={3}>
        <Thumbnail src={featureThumb} alt="242x200">
          <p className="text-center">Description</p>
        </Thumbnail>
      </Col>
      <Col md={3}>
        <Thumbnail src={featureThumb} alt="242x200">
          <p className="text-center">Description</p>
        </Thumbnail>
      </Col>
    </Row>
    <hr/>
    <Row>
      <Col>
        <p>
          Advanced feature descriptions here
        </p>
      </Col>
    </Row>
    <hr/>
    <Row>
      <Col>
        <p>
          Pricing table here
        </p>
      </Col>
      <Col className="text-center">
        <Link to="/signup" className="btn btn-lg btn-info">
          Sign Up Now
        </Link>
      </Col>
    </Row>
  </Grid>
);

export default HomeView;
