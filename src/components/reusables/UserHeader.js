import {Link as LinkR } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import autoPageUp from '../../hooks/autoPageUp';
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi';
import {BsStarFill,BsStar} from 'react-icons/bs';

const UserHeader = ({title,user}) => {
    const userID = user.id;
    //***required states && functions***
    const{getUsersData,saveToStorage,getUserData} = useAuth();

    const handleSwitchDetails = (e,num)=>{
        //target clicked link
        const detailsLink = e.target;
        //target parent wrapper
        const navWrapper = detailsLink.parentElement;
        //filter out links not clicked
        const otherLinks = [...navWrapper.children].filter(link=> link !== detailsLink);
        //add active(CLASS) to clicked link
        detailsLink.classList.add('active');
        //romove active(CLASS) from links not clicked
        otherLinks.forEach(element => {
            element.classList.remove('active');
        });

        //*** switch to corresponding detail info ***/
        const Header = detailsLink.parentElement.parentElement.parentElement.parentElement.parentElement;
        const BodyContainer = Header.nextElementSibling.firstChild;
        const corresponding = [...BodyContainer.children].find(item=> item.id === `box${num}` )
        const otherBoxs = [...BodyContainer.children].filter(item=> item.id !== `box${num}` )

        corresponding.classList.add('open')

        otherBoxs.forEach(element => {
            element.classList.remove('open');
        });
        //scroll back up
        autoPageUp();
    }
    
    const handleBlacklist = (e)=>{
        //targer blacklist btn
        const blacklistUserBtn = e.target;
        //update all users data
        const updateUsersData = getUsersData().map(user =>( 
            user.id === userID ?
            {
                ...user,
                status:{
                    active:false,
                    blacklist: !user.status.blacklist
                }
            } : user
        ))

        //condition to toggle class and innerText
        if(blacklistUserBtn.innerText.toLowerCase() === 'blacklist user'){
            blacklistUserBtn.innerText = 'unblacklist user';
            blacklistUserBtn.nextElementSibling.innerText = 'activate user';
            blacklistUserBtn.classList.add('action');
            blacklistUserBtn.nextElementSibling.classList.remove('action');
        }else{
            blacklistUserBtn.innerText = 'blacklist user';
            blacklistUserBtn.nextElementSibling.innerText = 'activate user';
            blacklistUserBtn.classList.remove('action');
            blacklistUserBtn.classList.remove('action');
        }
        //save updated users data to storage
        saveToStorage(updateUsersData); 
    }

     const handleActivation = (e)=>{
        //return function if user is blacklisted
        if(getUserData(userID).status.blacklist) {
            window.alert('blacklist user is auto deactivated, unblacklist to be able to activate user');
            return;
        };

        //targer activation btn
        const activateUserBtn = e.target;
        //update all users data
        const updateUsersData = getUsersData().map(user =>( 
            user.id === userID ?
            {
                ...user,
                status:{
                    active:!user.status.active,
                    blacklist: false
                }
            } : user
        ))

        //condition to toggle class and innerText
        if(activateUserBtn.innerText.toLowerCase() === 'activate user'){
            activateUserBtn.innerText = 'deactivate user';
            activateUserBtn.classList.add('action');
        }else{
            activateUserBtn.innerText = 'activate user';
            activateUserBtn.classList.remove('active');
        }
        //save updated users data to storage
        saveToStorage(updateUsersData); 
    }

    const pageReset =()=>{
        autoPageUp();
    }

  return (
    <div className="UserHeader">
        <div className="UserHeader__container">
            <LinkR className="back"
                to="/dashboard"
                onClick={pageReset}
            >
                <HiOutlineArrowNarrowLeft/>
                <>Back to Users</>
            </LinkR>

            <div className="UserHeader__title">
                <div className="title-title">{title}</div>
                <div className="title-controls">
                    <span 
                        className= {user.status?.blacklist ?"blacklist action" : "blacklist"}
                        onClick={(e)=>handleBlacklist(e)}
                    >
                        {
                            user.status?.blacklist ? 'unblacklist user' :
                            'blacklist user'
                        }
                    </span>
                    <span 
                        className= {user.status?.active ?"activate action" : "activate"}
                        onClick={(e)=>handleActivation(e)}
                    >
                        {
                            user.status?.active ? 'deactivate user' :
                            'activate user'
                        }
                    </span>
                </div>
            </div>
            <div className="UserHeader__stats">
                <div className="UserHeader__stats__wrapper">
                    <div className="UserHeader__stats__profile">
                        <span className="profile-image">
                            <img src={user.profile.avatar} alt={`user${user.id}`}/>
                        </span>
                        <span className="profile-info">
                            <span className="profile-name">
                                {`${user.profile.firstName} ${user.profile.lastName}`}
                            </span>
                            <span className="profile-id">
                                {`user-id-${user.id} `}
                            </span>
                        </span>
                    </div>
                    <div className="UserHeader__stats__tier">
                        <h6>User's Tier</h6>
                        <span className="tier-icons">
                            <BsStarFill/>
                            <BsStar/> 
                            <BsStar/> 
                        </span>
                    </div>
                    <div className="UserHeader__stats__account">
                        <span className="account-balance">
                               <small>N</small>
                               <>{`${user.accountBalance}`}</> 
                        </span>
                        <span className="account-details">
                             {`${user.profile.bvn}/Providus Bank`}
                        </span>
                    </div>
                </div> 
                <div className="UserHeader__stats__navdetails">
                    <div className="nav-wrapper" >
                        <span className="details-link active" key='1'
                            onClick={(e)=>handleSwitchDetails(e,1)}
                        >
                            General Details
                        </span>
                        <span className="details-link" key='2'
                            onClick={(e)=>handleSwitchDetails(e,2)}
                        >
                            Documents
                        </span>
                        <span className="details-link" key='3'
                            onClick={(e)=>handleSwitchDetails(e,3)}
                        >
                            Bank Details
                        </span>
                        <span className="details-link" key='4'
                            onClick={(e)=>handleSwitchDetails(e,4)}
                        >
                            Loans
                        </span>
                        <span className="details-link" key='5'
                            onClick={(e)=>handleSwitchDetails(e,5)}
                        >
                            Savings
                        </span>
                        <span className="details-link" key='6'
                            onClick={(e)=>handleSwitchDetails(e,6)}
                        >
                            App and System
                        </span>
                    </div>
                </div>   
            </div>
        </div>
    </div>
  )
}

export default UserHeader