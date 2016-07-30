import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

import Code from 'components/devcards/Code';
import Devcard from 'components/devcards/Devcard';
import PropTypesDevcard from 'components/devcards/PropTypesDevcard';

import Form from 'components/form/Form';
import ValidatedInput from 'components/form/ValidatedInput';

const FORM_EXAMPLE = `const SimpleForm = () => (
  <Form onSubmit={formData => console.log(formData)}>
    <ValidatedInput type="text" name="first_name" placeholder="Your name:"/>
    <button type="submit">Click</button>
  </Form>
)`;

export default class FormsDevcards extends Component {
  static dcGroup = {
    title: 'Form',
    category: 'forms'
  };

  state = {
    formData: null
  };

  handleSubmitForm(formData) {
    this.setState({ formData });
  }

  render() {
    return (
      <div>
        <Devcard id="forms/intro">
          <h4>
            A <code>Form</code> component.
          </h4>
          <p>
            This is a generic abstraction for react-style but stil automatic
            data binding. It deeply traverses all it's children, detects the components
            that are marked with <code>FormControl</code>, and injects several additional
            props into them.
          </p>
        </Devcard>
        <PropTypesDevcard
          id="forms/proptypes/control"
          props={[
            ['state', 'object', (
              <span>
                The current state of the form control.
                It is managed by the form itself, and should be updated
                by using <code>onChange</code> function
              </span>
            )],
            ['onChange', 'function', (
              <span>
                The function provided by form to update the state of specific
                form control.
              </span>
            )],
            ['formState', 'object', (
              <span>
                Full state object for all controls, can be used to access data
                of another form control
              </span>
            )],
            ['...controlProps', 'object', (
              <span>
                All the props specified to the form <code>controlProps</code> prop
              </span>
            )]
          ]}
        >
          <p>
            Props that are passed to each <code>FormControl</code>:
          </p>
        </PropTypesDevcard>
        {/* eslint-disable no-console */}
        <Devcard id="forms/source/simple">
          <Code code={FORM_EXAMPLE}/>
        </Devcard>
        <Devcard id="forms/demo/simple">
          <Form onSubmit={::this.handleSubmitForm}>
            <ValidatedInput type="text" placeholder="Your name:" model="first_name"/>
            <Button type="submit" block>Click</Button>
          </Form>
          &nbsp;
          <Code mode="json" code={JSON.stringify(this.state.formData)}/>
        </Devcard>
      </div>
    );
  }
}
