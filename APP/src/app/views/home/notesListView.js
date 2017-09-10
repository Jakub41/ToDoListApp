import NoteView from './noteView';

// notes list view
const NotesListView = Mn.CollectionView.extend({
  tagName: 'ul',
  className: 'notes-list',
  childView: NoteView,
});

export default NotesListView;
