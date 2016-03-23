import { Alert, ButtonInput } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';

import { actions } from 'redux/modules/auth';

const mapStateToProps = () => ({});
export class SignUpView extends AsyncComponent {
  static propTypes = {
    signUp: React.PropTypes.func.isRequired
  };

  state = {
    signup: {}
  };

  @autobind
  handleSubmit(form) {
    this.props.signUp(form);
  }

  @autobind
  handleReset() {
    this.resetStatus('signin');
  }

  render() {
    const { result, pending } = this.getStatus('signup');
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            {result && result.error && (
              <Alert bsStyle="danger" onDismiss={this.handleReset}>
                <strong>Error:</strong> {result.message}
              </Alert>
            )}
            <Form onSubmit={this.handleSubmit}>
              <h2>
                Just type some info here
              </h2>

              <ValidatedInput type="text"
                model="name"
                placeholder="Your name"
              />
              <ValidatedInput type="text"
                model="email"
                placeholder="E-mail"
              />
              <ValidatedInput type="password"
                model="password"
                placeholder="Password"
              />
              <ValidatedInput type="password"
                model="confirmPassword"
                placeholder="Repeat password"
              />

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
