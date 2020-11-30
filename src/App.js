import './App.css';
import TodoesList from './pages/List/TodoesList'
import AddTodo from './pages/Add/AddTodo'
import { Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Route path="/" component={TodoesList} exact />
      <Route path="/addtodo" component={AddTodo} exact />
    </>
  );
}

export default App;
