import CoasterBtns from "./CoasterBtns.js";
import {IoIosArrowDown} from 'react-icons/io';
import useAuth from '../../hooks/useAuth';

const DashboardFooter = () => {
   const{allUsersData,pageUsersList} = useAuth();
  return (
    <div className='DashboardFooter'>
        <div className="Showing">
          <span className="Showing__text">Showing</span>
          <span className="Showing__filter">
            <>{pageUsersList.length}</> <IoIosArrowDown/>
          </span>
          <span className="Showing__text">{`out of ${allUsersData.length}`}</span>
        </div>
        <CoasterBtns/>
    </div>
  )
}

export default DashboardFooter