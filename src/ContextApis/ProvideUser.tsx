import React, {
  createContext,
  ReactChildren,
  ReactChild,
  useContext,
  useState,
} from 'react';

interface AuxProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

// @ts-ignore
export const userContext = createContext();

export const ProvideUser = ({ children }: AuxProps) => {
  const [fav, setFav]: any = useState([]);
  const [img, setImg]: any = useState([]);
  const [video, setVideo]: any = useState([]);
  return (
    <userContext.Provider
      value={{
        fav,
        setFav,
        img,
        setImg,
        video,
        setVideo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
