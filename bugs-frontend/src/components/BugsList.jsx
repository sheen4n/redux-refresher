import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnresolvedBugs, loadBugs, resolveBug } from '../store/bugs';

const BugsList = () => {
  const dispatch = useDispatch();

  // Either put the function to get the slice or use a selector
  // useSelector(state => state.entities.bugs.list)
  const unresolvedBugs = useSelector(getUnresolvedBugs);

  const handleResolve = (bugId) => () => dispatch(resolveBug(bugId));

  useEffect(() => {
    dispatch(loadBugs());
  }, [dispatch]);

  return (
    <>
      <h2>Unresolved Bugs</h2>
      <ul>
        {unresolvedBugs.map((bug) => (
          <li key={bug.id}>
            {bug.description}
            <button onClick={handleResolve(bug.id)}>Resolve Bug</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BugsList;
