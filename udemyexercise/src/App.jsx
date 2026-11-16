import { useContext } from 'react';
import { BookContext } from './bookContext';

const App = () => {
  const {count,increment}=useContext(BookContext);
  return (
    <div>App { count }


    <button onClick={increment}>add</button></div>
  )
}

export default App
