import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnresolvedBugs, loadBugs } from '../store/bugs';

const BugsList = () => {
  const dispatch = useDispatch();

  // Either put the function to get the slice or use a selector
  // useSelector(state => state.entities.bugs.list)
  const unresolvedBugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, [dispatch]);

  return (
    <ul>
      {unresolvedBugs.map((bug) => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  );
};

export default BugsList;
