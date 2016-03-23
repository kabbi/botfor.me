import { Alert, ButtonInput } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';

import { actions } from 'redux/modules/auth';

const mapStateToProps = () => ({});
export class SignInView extends AsyncComponent {
  static propTypes = {
    signIn: React.PropTypes.func.isRequired
  };

  state = {
    signin: {}
  };

  @autobind
  handleSubmit(form) {
    this.props.signIn(form);
  }

  @autobind
  handleReset() {
    this.resetStatus('signin');
  }

  render() {
    const { result, pending } = this.getStatus('signin');
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
                Welcome back
              </h2>

              <ValidatedInput model="email" type="text" placeholder="E-mail"/>
              <ValidatedInput model="password" type="password" placeholder="Password"/>

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
