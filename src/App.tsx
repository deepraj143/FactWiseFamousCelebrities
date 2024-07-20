import { useEffect, useMemo, useState } from 'react';
import { getUserList } from './api';
import { UserDetails } from './types';
import { compareObjects } from './utils';
import { CiSearch } from "react-icons/ci";
import UserCard from './components/UsersCard';

function App() {

  const [userDetailsList, setuserDetailsList] = useState<UserDetails[]>([])
  const [searchedUser, setsearchedUser] = useState<UserDetails[]>([])  
  const [isEditOn, setIsEditOn] = useState<boolean>(false)
  const [activeUserProfile, setactiveUserProfile] = useState<number|null>()  
  const [currentEditedUserDetails, setCurrentEditedUserDetails] = useState<UserDetails>()  
 
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const {value}=e.target
      const matchUser:UserDetails[]=[]
      userDetailsList.forEach(userDetails=> {
        if(userDetails.first.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
          matchUser.push(userDetails) 
        }
      })
      setsearchedUser(matchUser)
  } 

  const handleTextChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {name,value}=e.target
    const newData=currentEditedUserDetails;
    if(newData){
      if(name === "country") {
          const filteredInput = value.replace(/\d/g, ''); 
          setCurrentEditedUserDetails({...newData, [name]:filteredInput});
          return
      }
      if(name === "dob") {
        console.log("first")
        const numericValue = value.replace(/[^0-9]/g, ''); 
          console.log({...newData, [name]:numericValue})
          setCurrentEditedUserDetails({...newData, [name]:numericValue});
          return
      }
        setCurrentEditedUserDetails({...newData,[name]:value})
    }
  }

  const renderUserDetails=useMemo(() =>{
      return searchedUser.length>0 ? searchedUser : userDetailsList
  } , [userDetailsList,searchedUser])

  const onEditMode=(id:number)=>{
    setIsEditOn(true)
    const getActiveEditUser=renderUserDetails.find(userDetails=>userDetails.id === id)
    if(getActiveEditUser)  setCurrentEditedUserDetails(getActiveEditUser)
  }


  const handleActiveuserProfile=(index:number)=>{
    if(isEditOn) return
    setactiveUserProfile(prev=>prev === index ? null :index)
    setCurrentEditedUserDetails(undefined)
  }

  const isUserDeatilsChange=useMemo(()=>{
    const getUserObj=renderUserDetails.find(userDetails=>userDetails.id === currentEditedUserDetails?.id)
    return getUserObj && currentEditedUserDetails ? compareObjects(getUserObj,currentEditedUserDetails) :false
  },[currentEditedUserDetails,renderUserDetails])

  const handleSave=()=>{
    const updateData=renderUserDetails.map(userDetails=>{
      if(userDetails.id === currentEditedUserDetails?.id){
        return currentEditedUserDetails
      }else return userDetails
    })
    searchedUser.length>0 ? setsearchedUser(updateData) : setuserDetailsList(updateData)
    setIsEditOn(false)
  }


  const handleDontSave=()=>{
    setIsEditOn(false)
  }

  const handleDelete=(id:number)=>{
    const updateData=renderUserDetails.filter(userDetails=>userDetails.id !==id)
    searchedUser.length>0 ? setsearchedUser(updateData) : setuserDetailsList(updateData)
  }

  const fetchUserList=async()=>{
    try{
      const data= await getUserList()
      data && setuserDetailsList(data)
    }catch{
        throw new Error("something went wrong")
    }
  }

  useEffect(()=>{
    fetchUserList()
  },[])
  
  return (
    <div className="p-5">
      <div className="flex gap-5 flex-col">
        <h1 className="text-2xl font-bold">Famous Celebrities List</h1>
        
        <div className="border-2 rounded-lg flex gap-2 flex-row py-1 px-2 items-center">
          <CiSearch />
          <input
            type="text"
            placeholder="Search User"
            className="w-full focus:outline-none focus:ring-0"
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="flex flex-col gap-5">
            {renderUserDetails.length > 0 && renderUserDetails.map((userDetails, index) => (
              <UserCard
                key={index}
                index={index}
                userDetails={userDetails}
                isEditOn={isEditOn}
                onEditMode={onEditMode}
                activeUserProfile={activeUserProfile}
                currentEditedUserDetails={currentEditedUserDetails}
                handleActiveuserProfile={handleActiveuserProfile}
                handleTextChange={handleTextChange}
                handleSave={handleSave}
                handleDontSave={handleDontSave}
                isUserDeatilsChange={isUserDeatilsChange}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
