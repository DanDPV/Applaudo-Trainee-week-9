import React from 'react';

const App = () => {
  console.log(process.env);
  return <h1>{process.env.REACT_APP_API_URL}</h1>;
};

export default App;
