import React, {createContext, useState} from 'react';

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [avaibleUser, setAvaibleUSer] = useState(false);
  const [userInfo, setUserInfo] = useState();
  return (
    <DataContext.Provider
      value={{avaibleUser, setAvaibleUSer, userInfo, setUserInfo}}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
