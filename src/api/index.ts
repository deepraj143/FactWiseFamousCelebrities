import { DATA } from "../constant"
import { UserDetails } from "../types"

export const getUserList=()=>{
    return new Promise<UserDetails[]>((res)=>{
        setTimeout(()=>{
            res(DATA)
        },1000)
    })
}