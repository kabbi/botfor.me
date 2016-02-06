import { Alert, Button, Modal } from 'react-bootstrap';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';
import api from 'utils/Api';

export class NewBotModal extends AsyncComponent {
  static propTypes = {
    show: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    onClose: React.PropTypes.func.isRequired
  };

  state = {
    bot: {}
  };

  handleSubmit(form) {
    this.handlePromise('bot', api.bot.create(form)).then(result => {
      if (result.error) {
        return;
      }
      this.props.dispatch(pushPath(`/editor/${result.data._id}`));
    });
  }

  handleTriggerSubmit() {
    this.refs.form.submit();
  }

  render() {
    const { result, pending } = this.getStatus('bot');
    const { show, onClose } = this.props;
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new bot</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {result && result.error && (
            <Alert bsStyle="danger" onDismiss={this.resetStatus.bind(this, 'bot')}>
              <strong>Error:</strong> {result.message}
            </Alert>
          )}
          <Form ref="form"
            onSubmit={::this.handleSubmit}
            onChange={this.resetStatus.bind(this, 'bot')}
            controlProps={{errors: (result && result.error && result.data) || {}}}
          >
            <ValidatedInput model="name"
              label="Name your bot"
              type="text"
              placeholder="For example: Weather Bot"
              help="Just a general and unique name, to be able to find it among others"
            />
            <ValidatedInput model="tags"
              label="Tags"
              type="text"
              placeholder="weather, predictions, magic"
              help="You can use tags later to organize your bots, or to search public ones"
            />
            <ValidatedInput model="public"
              label="Make this bot public"
              type="checkbox"
              placeholder="weather, predictions, magic"
              help="We will only share the bot structure, your private data will not be visible to anyone"
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={::this.handleTriggerSubmit}
            className="pull-left"
            disabled={pending}
            bsStyle="primary"
          >
            Create
          </Button>
          <Button onClick={onClose} className="pull-right">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default connect()(NewBotModal);
