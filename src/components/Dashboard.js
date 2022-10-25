// import { Link as LinkR} from "react-router-dom";
// import logo_icon from '../svgs/lendsqr_icon.svg';
import DashboardHeader from "./reusables/DashboardHeader";
import DashboardFooter from "./reusables/DashboardFooter";
import Users from "./reusables/Users";
import useAuth from '../hooks/useAuth';
import {useEffect} from "react";

const Dashboard = () => {
  //REQUIRED STATES
  const{allUsersData,setPageUsersList,setShowSearchBar} = useAuth();

    useEffect(() => { //when component loads set default users display list
      setPageUsersList(
        allUsersData.filter((user,i)=> i<10)
      )   
      setShowSearchBar(true)  
    }, [])

  return (
    <div className='Dashboard'>      
      <DashboardHeader title={'users'}/>
      <Users />
      <DashboardFooter />
    </div>
  )
}

export default Dashboard