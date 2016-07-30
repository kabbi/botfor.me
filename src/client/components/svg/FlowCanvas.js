import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { fromJS } from 'immutable';

import ImmutableComponent from 'components/utils/ImmutableComponent';

import css from './FlowCanvas.scss';

/* eslint-disable react/jsx-no-bind */

export default class BotCanvas extends ImmutableComponent {
  static propTypes = {
    className: PropTypes.string
  };

  state = fromJS({
    zoom: 2,
    offset: {
      x: 0, y: 0
    },
    dragging: null
  });

  getRelativeCoords(event) {
    const { left, top } = this.refs.canvas.getBoundingClientRect();
    return {
      x: event.clientX - left,
      y: event.clientY - top
    };
  }

  @autobind
  handleMouseDown(event) {
    const { x, y } = this.getRelativeCoords(event);

    event.preventDefault();
    this.setState(state => state.set('dragging', fromJS({
      dragging: true,
      relativeX: x - state.getIn(['offset', 'x']),
      relativeY: y - state.getIn(['offset', 'y'])
    })));
  }

  @autobind
  handleMouseMove(event) {
    const dragging = this.getState().get('dragging');
    if (!dragging) {
      return;
    }

    const { x, y } = this.getRelativeCoords(event);

    event.preventDefault();
    this.setState(state => state
      .setIn(['offset', 'x'], x - dragging.get('relativeX'))
      .setIn(['offset', 'y'], y - dragging.get('relativeY'))
    );
  }

  @autobind
  handleMouseUp() {
    this.setState(state => state.set('dragging', null));
  }

  @autobind
  handleScroll(event) {
    event.preventDefault();
    const delta = event.deltaY;
    this.setState(state => state
      .update('zoom', zoom => zoom + delta / 1000)
    );
  }

  render() {
    const { className } = this.props;
    const offset = this.getState().get('offset');
    const zoom = this.getState().get('zoom');
    return (
      <div className={`${css.window} ${className}`}>
        <svg
          ref="canvas"
          className={css.content}
          onWheel={this.handleScroll}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <g
            transform={
              `translate(${offset.get('x')} ${offset.get('y')}) scale(${zoom})`
            }
          >
            <circle x={0} y={0} r={5} fill="black"/>
            <rect x={10} y={10} width={100} height={50}/>
            <foreignObject width={200} height={200} y={60}>
              <p>Text goes here</p>
              <button className="btn btn-success btn-xs">a button</button>
            </foreignObject>
          </g>
        </svg>
      </div>
    );
  }
}
