import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routed from './Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: 'black',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Router>
        <Routed />
      </Router>
    </div>
  );
}

export default App;
