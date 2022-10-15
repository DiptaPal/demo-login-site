import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Registration/Registration';
import Main from './Layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Registration></Registration>
      },
      {
        path: '/registration',
        element: <Registration></Registration>
      },
      {
        path: '/login',
        element: <Login></Login>
      }
  ]
  }
])
function App() {
  return (
    <div className="App bg-gray-300">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
