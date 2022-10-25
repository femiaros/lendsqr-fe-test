import {HiUsers} from 'react-icons/hi';
import {FaUsers,FaCoins} from 'react-icons/fa';
import {MdNoteAdd} from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

const DashboardHeader = ({title}) => {
    const{getUsersData, setAllUsersData,setPageUsersList} = useAuth();

    //users with a guarantor probably has borrowed loan
    const usersWithLoans = getUsersData().filter(user=> user.guarantor);

    //users with a guarantor probably has borrowed loan
    const usersWithSavings = getUsersData().filter(user=> parseFloat(user.accountBalance) > 1 );
    // active users
    const ActiveUsers = getUsersData().filter(user=> user.status.active );

    const handleDisplayAllUser = ()=>{
        //set app users data
        setAllUsersData(getUsersData());
        //set default display users list
        setPageUsersList(
            getUsersData().filter((user,i)=> i<10)
        )
    }

    const handleDisplayActiveUser = ()=>{
        //set app users data
        setAllUsersData(ActiveUsers);
        //set default display users list
        setPageUsersList(
            ActiveUsers.filter((user,i)=> i<10)
        )
    }


  return (
    <div className="DashboardHeader">
        <div className="DashboardHeader__container">
            <div className="DashboardHeader__title">
                {title}
            </div>
            <div className="DashboardHeader__stats">
                <div className="DashboardHeader__stats__box"
                    onClick={handleDisplayAllUser}
                    role='button' tabIndex='0' 
                    aria-label='all users button'
                >
                    <span className="icon">
                        <HiUsers/>
                    </span>
                    <span className='state'>users</span>
                    <span className='count'>{getUsersData().length}</span>
                </div>

                <div className="DashboardHeader__stats__box"
                    onClick={handleDisplayActiveUser}
                    role='button' tabIndex='0' 
                    aria-label='active users button'
                >
                    <span className="icon">
                        <FaUsers/>
                    </span>
                    <span className='state'>active users</span>
                    <span className='count'>{ActiveUsers.length.toString().length === 1 ? `0${ActiveUsers.length}` : ActiveUsers.length }</span>
                </div>

                <div className="DashboardHeader__stats__box"
                    role='button' tabIndex='0' 
                    aria-label='users with loan button'
                >
                    <span className="icon">
                        <MdNoteAdd/>
                    </span>
                    <span className='state'>users with loans</span>
                    <span className='count'>{usersWithLoans.length}</span>
                </div>

                <div className="DashboardHeader__stats__box"
                    role='button' tabIndex='0' 
                    aria-label='user with savings button'
                >
                    <span className="icon">
                        <FaCoins/>
                    </span>
                    <span className='state'>users with saving</span>
                    <span className='count'>{usersWithSavings.length}</span>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default DashboardHeader