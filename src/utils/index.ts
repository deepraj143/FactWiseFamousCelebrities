import { UserDetails } from "../types";

export const  calculateAge =(dateOfBirth:string) =>{
    const dob = new Date(dateOfBirth);
     
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  }
  
  export const compareObjects=(obj1: UserDetails, obj2: UserDetails):boolean =>{
    for (const key in obj1) {
        if (obj1[key as keyof UserDetails] !== obj2[key as keyof UserDetails]) {
          return true;
        }
      }
      return false;
  }