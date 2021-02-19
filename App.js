
import React, { useState, useEffect } from 'react';
import RouterPage from './src/scene/Router';
import tr from './src/constant/lang'
const App = () => {

  useEffect(async () => {
    global.testGobal = await tr() // เปลี่ยนตัวแปร
  });

  return (
    <RouterPage />
  );
};

export default App;
