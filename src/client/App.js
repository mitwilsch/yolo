import React, { useState, useEffect } from 'react';

const fetchUpdate = () => {
  const res = fetch('/api/').then((response) => response.json());

  return res;
};
const App = () => <div>Hello World</div>;

export default App;
