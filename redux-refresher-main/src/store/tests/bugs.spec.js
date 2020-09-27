import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, getUnresolvedBugs, loadBugs, resolveBug } from '../bugs';
import configureStore from '../configureStore';

// Arrange
// Act
// Assert

describe('bugsSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  describe('addBug', () => {
    it('should add the bug to the store if it is saved to the server', async () => {
      const bug = { description: 'a' };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost('/bugs').reply(200, savedBug);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it('should add no bug to the store if it is saved to the server', async () => {
      const bug = { description: 'a' };
      fakeAxios.onPost('/bugs').reply(500);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(0);
    });
  });

  describe('resolveBug', () => {
    it('should resolve a bug in the store if api call for bug resolve succeed', async () => {
      // AAA
      const bugId = 1;
      fakeAxios.onPost('/bugs').reply(200, { id: bugId });
      fakeAxios.onPatch(`/bugs/${bugId}`).reply(200, { id: bugId, resolved: true });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(bugId));

      expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it('should not resolve a bug in the store if api call for bug resolve failed', async () => {
      const bugId = 1;
      fakeAxios.onPost('/bugs').reply(200, { id: 1 });
      fakeAxios.onPatch(`/bugs/${bugId}`).reply(500);

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(bugId));

      expect(bugsSlice().list[0].resolved).not.toBe(true);
    });
  });

  describe('loadBugs', () => {
    describe('if the bugs exist in the cache', () => {
      it('they should not be fetched from the server again.', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        // See if there are multiple http call to the backend
        expect(fakeAxios.history.get.length).toEqual(1);
      });
    });
    describe('if the bugs do not exist in the cache', () => {
      it('they should be fetched from the server and put in the store', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe('loading indicator', () => {
        it('should be true while fetching the bugs', () => {
          fakeAxios.onGet('/bugs').reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it('should be false after fetching the bugs', async () => {
          fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it('should be false if the server returns an error', async () => {
          fakeAxios.onGet('/bugs').reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  describe('selectors', () => {
    it('getUnresolvedBugs', async () => {
      const state = createState();
      state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
