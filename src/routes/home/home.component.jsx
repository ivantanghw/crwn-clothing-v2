import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  // Set up categories to avoid repeating hardcoded category

  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  ); 
    
};

export default Home;
