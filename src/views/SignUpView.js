import { ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import validator from 'validator';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';

validator.extend('isRequired', str => (
  !validator.isNull(str)
));

const mapStateToProps = state => ({});
export class SignUpView extends AsyncComponent {
  state = {
    signup: {}
  };

  handleSubmit(form) {
    console.log(form);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <Form onSubmit={::this.handleSubmit}>
              <h2>
                Welcome!
              </h2>

              <ValidatedInput model="email" type="text" placeholder="E-mail"/>
              <ValidatedInput model="password" type="password" placeholder="Password"/>
              <ButtonInput className="btn-block"
                bsSize="large"
                bsStyle="primary"
                type="submit"
                value="Sign Up"
              />

            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(SignUpView);
