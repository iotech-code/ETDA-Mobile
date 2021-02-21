
// import React, { useState, useEffect } from 'react';

import React from 'react';
import RouterPage from './src/scene/Router';
// import trans from './src/constant/lang'
const App = () => {

  // useEffect(() => {
  //   async function setGobalLang() {
  //     global.lng = await trans() // เปลี่ยนตัวแปร
  //   }
  //   setGobalLang();
  // });

  return (
    <RouterPage />
  );
};

export default App;
