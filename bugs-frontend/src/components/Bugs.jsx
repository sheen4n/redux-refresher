import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUnresolvedBugs, loadBugs, resolveBug } from '../store/bugs';

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  handleResolve = (bugId) => () => {
    this.props.resolveBug(bugId);
  };

  render() {
    return (
      <>
        <ul>
          {this.props.bugs.map((bug) => (
            <li key={bug.id}>
              {bug.description}
              {!bug.resolved && <button onClick={this.handleResolve(bug.id)}>Resolve Bug</button>}
            </li>
          ))}
        </ul>

        <h2>Unresolved Bugs</h2>
        <ul>
          {this.props.unresolvedBugs.map((bug) => (
            <li key={bug.id}>{bug.description}</li>
          ))}
        </ul>
      </>
    );
  }
}
// bugs: state.entities.bugs.list = First Argument to Connect (To pass in state as props)
const mapStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
  unresolvedBugs: getUnresolvedBugs(state),
});

// Functions that will be passed as props to the component
const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

// Container Component that wraps
//  Presentational (Bugs)

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
