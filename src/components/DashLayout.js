import {Outlet, Link as LinkR} from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Lendsqrlogo from "./reusables/Lendsqrlogo";
import {IoMdNotificationsOutline,IoIosArrowDown} from 'react-icons/io';
import {FiSearch} from 'react-icons/fi';
import {HiUsers,HiClipboardList} from 'react-icons/hi';
import {FaHome,FaUsers,FaScroll,FaRegHandshake,FaUserTimes,FaUserCheck,FaCoins} from 'react-icons/fa';
import {GiMoneyStack,GiReceiveMoney,GiCircularSawblade,GiBank} from 'react-icons/gi';
import {BsPiggyBank} from 'react-icons/bs';
import {RiMenu2Line,RiUserSettingsFill,RiSettings6Line} from 'react-icons/ri';
import {CgToolbox} from 'react-icons/cg';
import {MdClose,MdOutlineSendToMobile,MdOutlineArrowDropDown} from 'react-icons/md';
import {GoGraph} from 'react-icons/go';
import {AiOutlineControl} from 'react-icons/ai';
import autoPageUp from '../hooks/autoPageUp';
import useLogout from '../hooks/useLogout';
import { useState,useEffect} from "react";

const DashLayout = () => {
  //***required states***
   const {profileData,getUsersData,getUserData,setAllUsersData,setPageUsersList,showSearchBar} = useAuth();
   const logout = useLogout();
   const [menuOpen, setMenuOpen] = useState(false);
   const [search, setSearch] = useState('');

   useEffect(() => {
      //auto scroll page back up
      autoPageUp();
    }, [])

   const handleProfileClick=(e)=>{
      const profileUsername = e.target.closest('.profile-username');
      //end func if profileUsername not clicked
      if(!profileUsername) return;
      //targeting the parent Element
      const profileToggle = profileUsername.parentElement;
      //toggling open(class) on the parent Element
      profileToggle.classList.toggle('open');
   };

   const handleSwitchOrganization=(e)=>{
      //targeting link
      const navLinkActive = e.target.closest('.Nav__top__link');
      //targeting Nav top list tag
      const navTopList = navLinkActive.nextSibling;
      // toggling open(class) on link
      navLinkActive.classList.toggle('open');
      // toggling open(class) on Nav top list tag
      navTopList.classList.toggle('open');
   };

   const handleMenuToggle = (e)=>{
      //targeting menuBtn
      const menuToggleBtn = e.target.closest('.menu-toggle');
      //targeting Nav
      const content = menuToggleBtn.parentElement.parentElement.nextSibling;
      const nav = content.querySelector('.Nav');
      
      // toggle open(class) on btn 
      menuToggleBtn.classList.toggle('open');
      // toggle the menuOpen State && change the icon 
      setMenuOpen(prev=>!prev);

      //toggle open(class) on Nav Element
      nav.classList.toggle('open');
  }
  const handleDashClick =(e)=>{
    //target dashboaard link
    const dashboardLink = e.target.closest('.Nav__top__link');
    //target parent Nav tag
    const Nav = dashboardLink.parentElement.parentElement.parentElement;
    //remove open(CLASS) when link is click
    Nav.classList.remove('open');
    // toggle the menuOpen State && change the icon 
    setMenuOpen(prev=>!prev);
  }
  const handleUserClick =(e)=>{
    //target userpage link
    const userpageLink = e.target.closest('.Nav__category__link');
    //target parent Nav tag
    const Nav = userpageLink.parentElement.parentElement.parentElement.parentElement;
    //remove open(CLASS) when link is click
    Nav.classList.remove('open');
    // toggle the menuOpen State && change the icon 
    setMenuOpen(prev=>!prev);
  }

  const handleSearch = (e)=>{
    e.preventDefault();
    autoPageUp();
    // filter items in storage with search
    const filteredResults = getUsersData().filter(user=>(
      ((user.userName).toLowerCase()).includes(search.toLowerCase()) || ((user.phoneNumber).toLowerCase()).includes(search.toLowerCase()) || ((user.email).toLowerCase()).includes(search.toLowerCase()) || ((user.orgName).toLowerCase()).includes(search.toLowerCase()) || ((user.accountNumber).toLowerCase()).includes(search.toLowerCase())
    ))
    //empty search
    setSearch('');
    //set search results to app all users data
    setAllUsersData(filteredResults);
    //set users page display list 
    setPageUsersList(
      filteredResults.length ? filteredResults.filter((user,i)=> i<10) : []
    )
  }

  //app user Sign out function
  const signOut =()=>{
    logout();
  }

  const pageReset =()=>{
    setAllUsersData(getUsersData());
     setPageUsersList(
      getUsersData().filter((user,i)=> i<10)
    )
  }

  return (
    <>
        <header className="Header">
          <div className="Header__container">
            <div className="Header__logo">
                <LinkR to="/dashboard"
                  onClick={pageReset}
                >
                  <Lendsqrlogo/>
                </LinkR>
            </div>

            {
              showSearchBar?
                  <div className="Header__search">
                    <form onSubmit={(e)=>handleSearch(e)}>
                      <label htmlFor="search">Search</label>
                      <input 
                        id="search"
                        type="text" 
                        placeholder="Search for anything"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                      />
                      <button><FiSearch/></button>
                    </form>
                </div>
                :
                <></>
            }
            
            <div className="Header__info">
                <div className="docs">
                  Docs
                </div>
                <div className="alarm">
                  <IoMdNotificationsOutline/>
                </div>
                <div className="profile">
                  <div className="profile-image">
                    <img src={profileData ?
                      profileData?.profile.avatar :
                      getUserData()?.profile.avatar
                    } alt="avatar" />
                  </div>
                  <div className="profile-toggle" 
                    onClick={(e)=>handleProfileClick(e)}
                    role='button' tabIndex='0' 
                    aria-label='account log out menu'
                  >
                    <span className="profile-username">
                      <small>{profileData ?
                        profileData?.userName :
                        getUserData()?.userName
                      }</small>
                      <MdOutlineArrowDropDown/>
                    </span>
                    <span 
                      className="profile-logout"
                      onClick={signOut}
                    >
                      logout
                    </span>
                  </div>
                </div>
                

            </div>

            <span className={!showSearchBar? "menu-toggle adjust": "menu-toggle" }
              onClick={(e)=>handleMenuToggle(e)}
            >
              {menuOpen? 
              <MdClose 
                className="close-svg"
                role='button' tabIndex='0' 
                aria-label='close menu button'
              /> :
              <RiMenu2Line
                role='button' tabIndex='0' 
                aria-label='open menu button'
              />}
            </span>

          </div>           
            
        </header>

        {/* Main section mark-up  */}
        <div className="Content">

          <nav className="Nav">

            <div className="Nav__container">
              <div className="Nav__top">
                <span className="Nav__top__link" onClick={(e)=>handleSwitchOrganization(e)}>
                  <CgToolbox/>
                  <span className="Nav__top__link-name">
                    <small>Switch Organization </small>
                    <span className="icon">
                      <IoIosArrowDown/> 
                    </span>
                  </span>
                </span>

                <span className="Nav__top__list">
                  <div className="Nav__top__list-item">Lendsqr</div>
                  <div className="Nav__top__list-item">irorun</div>
                  <div className="Nav__top__list-item">sparter</div>
                </span>

                <LinkR to="/dashboard" 
                  className="Nav__top__link"
                  onClick={(e)=>handleDashClick(e)}
                >
                  <FaHome/> <>dashboard</>
                </LinkR>

              </div>
              <div className="Nav__category">
                <div className="Nav__category__title">
                  customers
                </div>
                <ul className="Nav__category__links">
                  <LinkR to="/users" 
                    className="Nav__category__link"
                    onClick={(e)=>handleUserClick(e)}
                  >
                    <HiUsers/> <>users</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <FaUsers/> <>guarantors</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <GiMoneyStack/> <>loans</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <FaRegHandshake/> <>decision models</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <BsPiggyBank/> <>savings</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <GiReceiveMoney/> <>Loan Requests</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <FaUserCheck/> <>whitelist</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <FaUserTimes/> <>karma</>
                  </LinkR>
                </ul>
              </div>

              <div className="Nav__category">
                <div className="Nav__category__title">
                  businesses
                </div>
                <ul className="Nav__category__links">
                  <LinkR className="Nav__category__link">
                    <CgToolbox/> <>organization</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <GiReceiveMoney/> <>loan products</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <GiBank/> <>saving products</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <FaCoins/> <>fees and charges</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <MdOutlineSendToMobile/> <>transactions</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <GiCircularSawblade/> <>services</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <RiUserSettingsFill/> <>service account</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <FaScroll/> <>settlements</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <GoGraph/> <>reports</>
                  </LinkR>
                </ul>
              </div>

              <div className="Nav__category">
                <div className="Nav__category__title">
                  settings
                </div>
                <ul className="Nav__category__links">
                  <LinkR className="Nav__category__link">
                    <AiOutlineControl/> <>preferences</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <RiSettings6Line/> <>fees and pricing</>
                  </LinkR>
                  <LinkR className="Nav__category__link">
                    <HiClipboardList/> <>audit logs</>
                  </LinkR>
                </ul>
              </div>
            </div>
          </nav>

          <main>

            <Outlet/>
          </main>
            
        </div>
    </>
  )
}

export default DashLayout