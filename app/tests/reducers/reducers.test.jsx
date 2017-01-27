var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle show completed', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'A new task'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });

    it('should toggle todo', () => {
      var todo = [{
        id: 1,
        text: "Some task",
        completed: false,
        createdAt: 1,
        completedAt: undefined
      }];
      var action = {
        type: 'TOGGLE_TODO',
        id: 1
      };

      var toggledTodo = reducers.todosReducer(df(todo), df(action));

      expect(toggledTodo[0].completed).toEqual(true);
      expect(toggledTodo[0].completedAt).toBeA('number');

      toggledTodo = reducers.todosReducer(df(toggledTodo), df(action));

      expect(toggledTodo[0].completed).toEqual(false);
      expect(toggledTodo[0].completedAt).toBe(undefined);
    });
  });
});
