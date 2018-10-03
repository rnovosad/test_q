import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class CrewMember extends Component {
  render() {
    // debugger
    const {
      member, onUp, onDown, dataTest,
    } = this.props;
    const { name } = member;
    return (
      <div className="CrewMember-container">
        <div className="CrewMember-info">
          <div
            className="CrewMemeber-photo"
            style={{ backgroundImage: `url(${member.picture.medium})` }}
            data-test={`photo-${dataTest}`}
          />
          <div className="CrewMemeber-name">
            <div data-test={`name-${dataTest}`}>{`${name.first} ${name.last}`}</div>
            <div data-test={`city-${dataTest}`}>{member.location.city}</div>
          </div>
        </div>
        <div className="CrewMember-toolbar" data-test={`toolbar-${dataTest}`}>
          {onDown && <button onClick={onDown} type="button" data-test={`btn-down-${dataTest}`}>&lt;</button>}
          {onUp && <button onClick={onUp} className="CrewMember-up" data-test={`btn-up-${dataTest}`} type="button">&gt;</button>}
        </div>
      </div>
    );
  }
}

CrewMember.defaultProps = {
  member: null,
  onUp: null,
  onDown: null,
  dataTest: null,
};

CrewMember.propTypes = {
  member: PropTypes.object,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  dataTest: PropTypes.string,
};

export default CrewMember;
