import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBugs } from '../store/bugs';

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}
// bugs: state.entities.bugs.list = First Argument to Connect
const mapStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
});

// Functions that will be passed as props to the component
const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
});

// Container Component that wraps
//  Presentational (Bugs)

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
