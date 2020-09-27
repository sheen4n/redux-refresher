import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug } from '../bugs';
import configureStore from '../configureStore';

// Arrange
// Act
// Assert

describe('bugsSlice', () => {
  it('shoud handle the addBug action', async () => {
    // Arrange
    const bug = { description: 'a' };
    const savedBug = { ...bug, id: 1 };
    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost('/bugs').reply(200, savedBug);
    const store = configureStore();

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});
