import { createContext, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    //authentication app user Login state
    const [auth, setAuth] = useState({});

    //save to local storage function
    const saveToStorage = (response)=>localStorage.setItem('usersAPI', JSON.stringify(response));

    //get usersAPI from local storage, if not data return []
    const getUsersData = ()=>{
        return localStorage.getItem('usersAPI')? JSON.parse(localStorage.getItem('usersAPI')) : [];
    }
    //get user from storage with id,return first-item if no id given 
    const getUserData = (id)=>{
        return getUsersData().find(user=> id? parseInt(user.id) === parseInt(id): parseInt(user.id) === 1)
    }
   
    //*** required application states***/
    const [searchStatus, setSearchStatus] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(true);

    const [profileData, setProfileData] = useState(getUserData());
    const [allUsersData, setAllUsersData] = useState(getUsersData());
    const [pageUsersList, setPageUsersList] = useState(
        []
    );
    

    return (
        <AuthContext.Provider value={{ auth, setAuth, saveToStorage,getUsersData,getUserData,profileData, setProfileData,allUsersData, setAllUsersData,pageUsersList, setPageUsersList,searchStatus, setSearchStatus,showSearchBar, setShowSearchBar}}>  
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthContext;