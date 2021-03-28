import React, {
  createContext,
  ReactChildren,
  ReactChild,
  useContext,
  useState,
} from 'react';

// interface AuxProps {
//   children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
// }

// @ts-ignore
export const userContext = createContext();

export const ProvideUser = ({ children }) => {
  const [fav, setFav] = useState([]);
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState('animal');
  return (
    <userContext.Provider
      value={{
        fav,
        setFav,
        img,
        setImg,
        video,
        setVideo,
        search, setSearch
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
