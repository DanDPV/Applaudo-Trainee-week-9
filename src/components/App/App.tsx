import React from 'react';

const App = () => (
  <>
    <h1>{process.env.REACT_APP_API_URL}</h1>
    <h3>{JSON.stringify(process.env)}</h3>
  </>
);

export default App;
