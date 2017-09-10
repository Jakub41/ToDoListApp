import TaskView from './task';

// shows when tasks list is empty
const NoTasksView = Mn.View.extend({
  tagName: 'li',
  template: _.template('No tasks yet'),
  className: 'no-tasks task-item'
});

// Tasks CollectionView to show tasks list
const TasksCollectionView = Mn.CollectionView.extend({
  tagName: 'ul',
  childView: TaskView,
  emptyView: NoTasksView,
});

export default TasksCollectionView;
