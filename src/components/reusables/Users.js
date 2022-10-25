import {Link as LinkR} from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import {RiUserFollowLine,RiUserUnfollowLine} from 'react-icons/ri';
import {MdOutlineFilterList} from 'react-icons/md';
import {RiMore2Fill} from 'react-icons/ri';
import {MdClose} from 'react-icons/md';
import {FiEye} from 'react-icons/fi';
import { useState} from "react";

const Users = () => {
    //***required states && functions***
    const{pageUsersList,setPageUsersList,saveToStorage,getUserData,getUsersData,setAllUsersData,setProfileData} = useAuth();

    //filter form states
    const [formValues, setFormValues] = useState({
        organization: '',
        username:'',
        date:'',
        phone:'',
        active:''
    });

    //handle change in input state
    const handleChange =(e)=>{
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    //Handle filter form reset
    const handleFilterReset =()=>{
        setFormValues({
            organization: '',
            username:'',
            date:'',
            phone:'',
            active:''
        })
    }

    //handle form submission
    const handleFilterSubmit =(e,userID)=>{
        //prevent form default
        e.preventDefault();

        let updateUsersData;
        //update user orgName data
        if(formValues.organization){
            updateUsersData = getUsersData().map(user =>( 
                user.id === userID ?
                {
                    ...user,
                    orgName:formValues.organization
                } : user
            ))

            //save updated users data to storage 
            saveToStorage(updateUsersData); 
        }

        //update all users data username
        if(formValues.username){
            updateUsersData = getUsersData().map(user =>( 
                user.id === userID ?
                {
                    ...user,
                    userName:formValues.username
                } : user
            ))

            //save updated users data to storage
            saveToStorage(updateUsersData);
        }
        //update all user date data
        if(formValues.date){
            updateUsersData = getUsersData().map(user =>( 
                user.id === userID ?
                {
                    ...user,
                    createdAt:new Date(formValues.date).toISOString()
                } : user
            ))

            //save updated users data to storage
            saveToStorage(updateUsersData); 
        }
        //update user phone number data 
        if(formValues.phone){
            updateUsersData = getUsersData().map(user =>( 
                user.id === userID ?
                {
                    ...user,
                    phoneNumber:formValues.phone
                } : user
            ))

            //save updated users data to storage
            saveToStorage(updateUsersData); 
        }

        //update user status data
        if(formValues.active){

            formValues.active === 'active'?
                updateUsersData = getUsersData().map(user =>( 
                    user.id === userID ?
                    {
                        ...user,
                        status:{
                            active:true,
                            blacklist: false
                        }
                    } : user
                ))
            :
                updateUsersData = getUsersData().map(user =>( 
                    user.id === userID ?
                    {
                        ...user,
                        status:{
                            active:false,
                            blacklist: user.status.blacklist
                        }
                    } : user
                ))
            ;        
            //save updated users data to storage
            saveToStorage(updateUsersData); 
        }
        
        //reset form states to default
        setFormValues({
            organization: '',
            username:'',
            date:'',
            phone:'',
            active:''
        })
        //update app users data and displayed list
        setPageUsersList(
            getUsersData().filter((user,i)=> i<10)
        )
        //update app displayed list
        setAllUsersData(getUsersData())
    }

    const handleCloseFilterForm = (e)=>{
        const filterCloseBtn = e.target.closest('.user-filter__close');
        //target userFilter element
        const userFilter = filterCloseBtn.parentElement;

        //remove open-filter(CLASS) from userFilter
        userFilter.classList.remove('open-filter');
    }

    const handleOpenFilterForm = (e)=>{
        const orgName = e.target;
        const tableRow = orgName.parentElement;
        //target userFilter element
        const userFilter = tableRow.querySelector('.user-filter');
        //add open-filter(CLASS) from userFilter
        userFilter.classList.add('open-filter');
    }

    const handleShowMore = (e, userID)=>{
        const moreBtn = e.target.closest('.more');
        //end func if moreBtn not clicked
        if(!moreBtn) return;
        //target tableROW parentElement
        const tableRow = moreBtn.parentElement;
        //targeting more-menu ChildElement
        const moreMenu = tableRow.querySelector('.more-menu')
        //add open class to moremenu
        setTimeout(function(){
            moreMenu.classList.add('open-more');
        },200)
    }

    const handleCloseShowMenu = (e)=>{
        const table = e.target.closest('.Users__table');
        //end func if table not clicked
        if(!table) return;
        //target open-more Element inside Table
        const allMoreMenu = table.querySelectorAll('.open-more');
        //remove open class from all moremenu
        allMoreMenu.forEach(element => {
            element.classList.remove('open-more');
        });
    }

    const handleBlacklist = (e,userID)=>{
        //targer blacklist btn
        const blacklistUserBtn = e.target.closest('.more-menu-item');
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
        
        //target blacklist text tag
        const tag = blacklistUserBtn.lastChild;
        //target activate user btn 
        const activateUserBtn = blacklistUserBtn.nextElementSibling;
        //target status indicator
        const indicator = blacklistUserBtn.parentElement.previousElementSibling.previousElementSibling.firstChild;

        //condition to toggle class and innerText
        if(tag.innerText.toLowerCase() === 'blacklist user'){
            blacklistUserBtn.lastChild.innerText = 'unblacklist user';
            activateUserBtn.lastChild.innerText = 'activate user';
            indicator.innerText = 'blacklisted';
            indicator.classList.remove('active');
            indicator.classList.add('blacklist');
        }else{
            blacklistUserBtn.children[1].innerText = 'blacklist user';
            indicator.innerText = 'inactive';
            indicator.classList.remove('blacklist');
            indicator.classList.remove('active');
        }
        //save updated users data to storage
        saveToStorage(updateUsersData); 
    }
    const handleActivation = (e,userID)=>{
        //return function if user is blacklisted
        if(getUserData(userID).status.blacklist) return;
        //targer blacklist btn
        const activateUserBtn = e.target.closest('.more-menu-item');
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
        
        //target activate text tag
        const tag = activateUserBtn.children[1];
        //target status indicator
        const indicator = activateUserBtn.parentElement.previousElementSibling.previousElementSibling.firstChild;

        //condition to toggle class and innerText
        if(tag.innerText.toLowerCase() === 'activate user'){
            activateUserBtn.lastChild.innerText = 'deactivate user';
            indicator.innerText = 'active';
            indicator.classList.remove('blacklist');
            indicator.classList.add('active');
        }else{
            activateUserBtn.lastChild.innerText = 'activate user';
            indicator.innerText = 'inactive';
            indicator.classList.remove('active');
            indicator.classList.remove('blacklist');
        }
        //save updated users data to storage
        saveToStorage(updateUsersData); 
        //update app all user data
        setAllUsersData(updateUsersData)
    }

    const handleUserClick = (e,userID)=>{
        //set header user display content
        setProfileData(getUserData(userID))
    }

  return (
    <div className='Users'>
        <div className="Users__container">
                
            <table className="Users__table" onClick={(e)=>handleCloseShowMenu(e)}>
                <thead className='Users__table__title'>
                    <tr>
                        <th className="organization-item">
                            <>organization</>
                            <MdOutlineFilterList/>
                        </th>
                        <th className=" username-item">
                            <>username</>
                            <MdOutlineFilterList/>
                        </th>
                        <th className="email-item">
                            <>email</>
                            <MdOutlineFilterList/>
                        </th>
                        <th className="phone-item">
                            <>phone number</>
                            <MdOutlineFilterList/>
                        </th>
                        <th className="email-item">
                            <>date joined</>
                            <MdOutlineFilterList/>
                        </th>
                        <th className="status-item">
                            <>status</>
                            <MdOutlineFilterList/>
                        </th>
                    </tr>
                </thead>

                <tbody className='Users__table__body'>
                    {
                        pageUsersList.map(item=>(
                            <tr key={item.id}
                                onClick={(e)=>handleUserClick(e,item.id)}
                            >
                                <td className="organization-item" onClick={handleOpenFilterForm}>
                                    <>{item.orgName.slice(0,16)}</>
                                </td>
                                <td className="username-item">
                                    <>{item.userName}</>
                                </td>
                                <td className="email-item">
                                    <>{item.email}</>
                                </td>    
                                <td className="phone-item">
                                    <>{item.phoneNumber.split('x')[0]}</>
                                </td>
                                <td className="date-item">
                                    <span id="month">
                                        {
                                            new Date(item.createdAt).toString().split(' ')[1]
                                        }
                                    </span>
                                    <>
                                        {
                                            ` ${new Date(item.createdAt).getDate()}, ${new Date(item.createdAt).getFullYear()} ${new Date(item.createdAt).getHours()
                                            }:${new Date(item.createdAt).getMinutes()} ${new Date(item.createdAt).getHours() < 12 ? 'AM':'PM'
                                            }`
                                        }
                                    </>
                                </td>
                                <td className="status-item">
                                    
                                    {
                                        item.status?.blacklist ? 
                                        <span className="indicator blacklist"> 
                                            blacklisted 
                                        </span>
                                            : item.status?.active ?
                                                <span className="indicator active"> 
                                                    active 
                                                </span>
                                                :<span className="indicator"> 
                                                    inactive
                                                </span>
                                    }
                                    
                                </td>
                                <td className="more"
                                    onClick={(e)=>handleShowMore(e,item.id)}
                                    role='button' tabIndex='0' 
                                    aria-label='more on user'
                                >
                                    <RiMore2Fill/>
                                </td>
                                <td className="more-menu" >
                                    <LinkR 
                                        to={`/user/${item.id}`}
                                        className="more-menu-item"
                                        role='button' tabIndex='0' 
                                        aria-label='view user details'
                                    >
                                        <FiEye/><>view details</>
                                    </LinkR>
                                    <span 
                                        onClick={(e)=>handleBlacklist(e,item.id)}
                                        className="more-menu-item"
                                        role='button' tabIndex='0' 
                                        aria-label='blacklist user'
                                    >
                                        <RiUserUnfollowLine/>
                                        <span>
                                            {
                                                item.status?.blacklist ? 'unblacklist user' :
                                                'blacklist user'
                                            }
                                        </span>
                                    </span>
                                    <span className="more-menu-item"
                                        onClick={(e)=>handleActivation(e,item.id)}
                                        role='button' tabIndex='0' 
                                        aria-label='Activate user'
                                    >
                                        <RiUserFollowLine/>
                                        <span>
                                            {
                                                item.status?.active ? 'deactivate user' :
                                                'activate user'
                                            }
                                        </span>
                                    </span>
                                </td>
                                <td className="user-filter">
                                    <span className="user-filter__close" onClick={(e)=>handleCloseFilterForm(e)}>
                                        <MdClose
                                            role='button' tabIndex='0' 
                                            aria-label='close filter form'
                                        />
                                    </span>

                                    <form onSubmit={(e)=>handleFilterSubmit(e,item.id)}>
                                        <div className="input-wrapper">
                                            <label 
                                                htmlFor="input-organization"
                                            >
                                                Organization
                                            </label>
                                            
                                            <select 
                                                id="input-organization"
                                                name="organization"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value="">Select</option>
                                                <option value={item.orgName}>{item.orgName.slice(0,20)}</option>
                                                <option value="InterSwitch">InterSwitch</option>
                                                <option value="Ancla Techs">Ancla Techs</option>
                                                <option value="Lenovo Techs">Lenovo Techs</option>
                                            </select>
                                        </div>

                                        <div className="input-wrapper">
                                            <label htmlFor="input-username">Username</label>
                                            
                                            <input 
                                                id="input-username"
                                                type="text" 
                                                name="username"
                                                onChange={handleChange}
                                                placeholder="User"
                                                value={formValues.username}
                                            />
                                        </div>

                                        <div className="input-wrapper">
                                            <label htmlFor="input-date">Date</label>

                                            <input 
                                                id="input-date"
                                                type="datetime-local" 
                                                name="date"
                                                value={formValues.date}
                                                onChange={handleChange}
                                                placeholder="Date"
                                                required
                                            />
                                        </div>

                                        <div className="input-wrapper">
                                            <label htmlFor="input-phone">Phone Number</label>
                                            
                                            <input 
                                                id="input-phone"
                                                type="tel" 
                                                name="phone"
                                                value={formValues.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                            />
                                        </div>

                                        <div className="input-wrapper">
                                            <label htmlFor="input-status">Status</label>
                                            
                                            <select 
                                                id="input-status"
                                                name="active"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="active">active</option>
                                                <option value="inactive">inactive</option>
                                            </select>
                                        </div>

                                        <div className="btn-wrapper">
                                            <input 
                                                type="reset" 
                                                value="Reset" 
                                                onClick={handleFilterReset}
                                            />
                                            <input 
                                                type="submit" 
                                                value="Filter" 
                                            />
                                        </div>

                                    </form>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
               
        </div>
    </div>
  )
}

export default Users