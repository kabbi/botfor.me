import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/tomorrow_night_eighties';
import 'brace/mode/javascript';
import 'brace/mode/json';

import { randomId } from 'utils/Random';

export default class Code extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    mode: PropTypes.string
  };

  static defaultProps = {
    mode: 'javascript'
  };

  componentWillMount() {
    this.id = randomId();
  }

  render() {
    const { code, mode } = this.props;
    return (
      <AceEditor readOnly
        name={this.id}
        mode={mode}
        value={code}
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        className="bfm-ace-noselect"
        theme="tomorrow_night_eighties"
        width="100%" height="100" tabSize={2}
        minLines={1} maxLines={Infinity}
        editorProps={{
          $blockScrolling: true
        }}
      />
    );
  }
}
