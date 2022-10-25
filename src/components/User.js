import UserHeader from "./reusables/UserHeader";
import UserBody from "./reusables/UserBody";
import { useParams} from "react-router-dom";
import useAuth from '../hooks/useAuth';
import {useEffect} from "react";

const User = () => {
  //***required states && functions***
  const {id} = useParams();
  const{getUserData,setShowSearchBar} = useAuth();
  const user = getUserData(id);

  useEffect(() => { 
    //when component loads hide search bar

    setShowSearchBar(false)  
  }, [])

  return (
    <div className='User'>
       <UserHeader title={'User Details'} user={user}/>
       <UserBody user={user}/>
    </div>
  )
}

export default User