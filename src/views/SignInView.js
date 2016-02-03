import { ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';

import { actions } from 'redux/modules/auth';
import api from 'utils/Api';

const mapStateToProps = state => ({});
export class SignInView extends AsyncComponent {
  static propTypes = {
    signIn: React.PropTypes.func.isRequired
  };

  state = {
    signin: {}
  };

  handleSubmit(form) {
    this.handlePromise('signin', api.auth.signin(form)).then(result => {
      if (result.error) {
        return;
      }
      this.props.signIn(result.data);
    });
  }

  render() {
    const { result, pending } = this.getStatus('signin');
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <Form onSubmit={::this.handleSubmit}>
              <h2>
                Welcome back
              </h2>

              <ValidatedInput model="email" type="text" placeholder="E-mail"/>
              <ValidatedInput model="password" type="password" placeholder="Password"/>
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
                value="Sign In"
              />

            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actions)(SignInView);
