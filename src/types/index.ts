export interface UserDetails{
        id: number,
        first: string,
        last: string,
        dob: string,
        gender: string,
        email: string,
        picture: string,
        country: string,
        description: string
}

export interface UserDetailsProps{
        userDetails:UserDetails
        isEditOn:boolean
        activeUserProfile?:number | null
        currentEditedUserDetails?:UserDetails
        index:number
        onEditMode:(id:number)=>void
        isUserDeatilsChange: boolean
        handleSave:()=>void
        handleDontSave:()=>void
        handleActiveuserProfile:(index:number)=>void
        handleDelete:(index:number)=>void
        handleTextChange:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>)=>void
}

    
export interface ModalProps{
        open:boolean
        handleClose:()=>void
        handleDelete:()=>void
}
    