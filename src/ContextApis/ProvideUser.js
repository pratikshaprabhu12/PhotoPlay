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
  let val=JSON.parse(localStorage.getItem('Fav'))||'[]';
  let value=JSON.parse(localStorage.getItem('photo'))||'[]';
  //let valvideo=JSON.parse(localStorage.getItem('FavVideo'))||'[]';
  let valuevideo=JSON.parse(localStorage.getItem('video'))||'[]';
  const [fav, setFav] = useState(val.length!==0?val:[]);
  const [img, setImg] = useState([]);
  const [photo,setPhoto]=useState(value.length!==0?value:[]);
  const [video, setVideo] = useState([]);
  const [vid,SetVid]=useState( valuevideo!==0? valuevideo:[]);
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
        search, setSearch,
        photo,setPhoto,
        vid,SetVid
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
