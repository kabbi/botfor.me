import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';
import AsyncComponent from 'components/utils/AsyncComponent';
import api from 'utils/Api';

export class NewBotModal extends AsyncComponent {
  static propTypes = {
    show: React.PropTypes.bool,
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
          <Form ref="form"
            onSubmit={::this.handleSubmit}
            onChange={this.resetStatus.bind(this, 'bot')}
            controlProps={{errors: (result && result.error && result.data) || {}}}
          >
            <ValidatedInput label="Your bot name" model="name" type="text" placeholder="For example: Weather Bot"/>
            <ValidatedInput label="Tags" model="tags" type="text" placeholder="weather, predictions, magic"/>
            {result && result.error && (
              <p className="text-danger">
                {result.message}
              </p>
            )}
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
