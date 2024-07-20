import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { calculateAge } from '../utils';
import { UserDetailsProps } from "../types";
import { GENDERTYPES, ISADULT } from "../constant";
import { RxCrossCircled } from "react-icons/rx";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useMemo, useState } from "react";
import Modal from "./Modal";



const UsersCard = ({
  userDetails,
  isEditOn,
  activeUserProfile,
  currentEditedUserDetails,
  index,
  onEditMode,
  handleActiveuserProfile,
  handleTextChange,
  isUserDeatilsChange,
  handleSave,
  handleDontSave,
  handleDelete
}: UserDetailsProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteTrigger=(e: React.MouseEvent<SVGElement, MouseEvent>)=>{
   e.stopPropagation();
   setOpenModal(true)
  }

  const handleClose=()=>{
    setOpenModal(false)
  }

  const handleDeleteAction=()=>{
    handleDelete(userDetails.id)
    handleClose()
  }

  const getUserAge=useMemo(()=>{
      const dob = isEditOn && currentEditedUserDetails
      ? currentEditedUserDetails.dob
      : userDetails.dob;

    if (!dob) return dob;

    if (dob.includes("-")) {
      return calculateAge(dob);
    }

    return dob;
  },[userDetails.dob,currentEditedUserDetails,isEditOn])


  const isAnyInputEmpty=()=>{
    return !currentEditedUserDetails?.country || !currentEditedUserDetails?.description || !currentEditedUserDetails.dob || !currentEditedUserDetails.first || !currentEditedUserDetails.gender
  }
  
  return (
    <>
      <div
        className="border border-gray-200 rounded-xl"
        onClick={() => handleActiveuserProfile(index)}
    >
      <div>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right "
        >
          <div className="flex flex-row items-center gap-5">
            <img
              src={userDetails.picture}
              alt="Profile pic"
              className="rounded-full"
            />
            {isEditOn && userDetails.id === currentEditedUserDetails?.id ? (
              <input
                type="text"
                name="first"
                value={currentEditedUserDetails?.first}
                className="border border-gray-300 rounded-md px-2 text-gray-800"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleTextChange(e)}
              />
            ) : (
              <p className="text-gray-800">{userDetails.first}</p>
            )}
          </div>
          <IoIosArrowDown
            className={activeUserProfile !== index ? "" : "rotate-180"}
          />
        </button>
        <div
          className={activeUserProfile !== index ? "hidden p-5" : "p-5"}
        >
          <div className="flex justify-between mb-8">
            <div className="w-1/3">
              <p className="text-gray-400">Age</p>
              {isEditOn ? (
                <input
                  type="text"
                  name="dob"
                  value={
                    currentEditedUserDetails?.dob &&
                    getUserAge
                  }
                  className="border border-gray-300 rounded-md px-2 w-[90%]"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleTextChange(e)}
                />
              ) : (
                <p>{getUserAge}</p>
              )}
            </div>
            <div className="w-1/3">
              <p className="text-gray-400">Gender</p>
              {isEditOn ? (
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 rounded-md px-2 w-4/5"
                  value={currentEditedUserDetails?.gender}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleTextChange(e)}
                >
                  {GENDERTYPES.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <p>{userDetails.gender}</p>
              )}
            </div>
            <div className="w-1/3">
              <p className="text-gray-400">Country</p>
              {isEditOn ? (
                <input
                  type="text"
                  name="country"
                  value={currentEditedUserDetails?.country}
                  className="border border-gray-300 rounded-md px-2 w-4/5"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleTextChange(e)}
                />
              ) : (
                <p>{userDetails.country}</p>
              )}
            </div>
          </div>
          <p className="text-gray-400">Description</p>
          {isEditOn ? (
            <textarea
              name="description"
              value={currentEditedUserDetails?.description}
              className="border border-gray-300 rounded-md px-2 w-full h-[130px]"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleTextChange(e)}
            />
          ) : (
            <p>{userDetails.description}</p>
          )}
          <div className="flex justify-end gap-5 text-2xl cursor-pointer">
            {isEditOn ? (
              <>
                <IoCheckmarkDoneCircleOutline
                  className={isUserDeatilsChange ? isAnyInputEmpty()?"text-gray-400":"text-green-500" : "text-gray-400"}
                  onClick={(e) => {
                    if (!isUserDeatilsChange) {
                      return;
                    }
                    if (isAnyInputEmpty()) {
                        return;
                    }
                    e.stopPropagation();
                    handleSave();
                  }}
                />
                <RxCrossCircled
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDontSave();
                  }}
                />
              </>
            ) : (
              <>
                <RiDeleteBin6Line
                  className="text-red-500"
                  onClick={handleDeleteTrigger}
                />
                {Number(getUserAge) >= ISADULT && (
                  <MdOutlineEdit
                    className="text-blue-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditMode(userDetails.id);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    <Modal  open={openModal} handleClose={handleClose} handleDelete={handleDeleteAction}/>
    </>
  )
}

export default UsersCard