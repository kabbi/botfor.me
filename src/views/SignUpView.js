import { ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';

import { actions } from 'redux/modules/auth';
import api from 'utils/Api';

const mapStateToProps = state => ({});
export class SignUpView extends AsyncComponent {
  static propTypes = {
    signUp: React.PropTypes.func.isRequired
  };

  state = {
    signup: {}
  };

  handleSubmit(form) {
    this.handlePromise('signup', api.auth.signup(form)).then(result => {
      if (result.error) {
        return;
      }
      this.props.singUp(result.data);
    });
  }

  render() {
    const { result, pending } = this.getStatus('signup');
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <Form onSubmit={::this.handleSubmit}>
              <h2>
                Just type some info here
              </h2>

              <ValidatedInput model="name" type="text" placeholder="Your name"/>
              <ValidatedInput model="email" type="text" placeholder="E-mail"/>
              <ValidatedInput model="password" type="password" placeholder="Password"/>
              <ValidatedInput model="confirmPassword" type="password" placeholder="Repeat password"/>
              {result && result.error && (
                <p className="text-danger">
                  {result.message}
                </p>
              )}
              <ButtonInput className="btn-block"
                disabled={pending}
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

export default connect(mapStateToProps, actions)(SignUpView);
