import { addBug } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
  it('addBug', async () => {
    const store = configureStore();
    const bug = { description: 'a' };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
