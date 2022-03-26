import { usersListFetchResult } from "../../utils/configs/types/api"

export const SelectedUser = ({selUser}:{selUser : usersListFetchResult}) => {
    const fullName = selUser.firstname + ' ' + (selUser.lastname ? selUser.lastname : '');
    return (
        
        <div className="main-contact-info-header pt-3">
										<div className="media">
                                            {
                                                selUser.image && selUser.image !== 'null' ? 
                                                    (<div className="main-img-user">
                                                        <img alt="user avatar" src={selUser.image} />
                                                    </div>)
                                                :
                                                    (
                                                    <>
                                                    <div className="avatar bg-primary avatar-xl brround avatar-custom">
                                                        {selUser.firstname ? selUser.firstname[0] : '' }
                                                    </div>
                                                    <div className="media-body">
                                                        <h5>{ selUser.firstname ? fullName : 'بدون نام'}</h5>
                                                        <p>{selUser.mobile}</p>
                                                    
                                                    </div>
                                                    </>
                                                    )
                                            }
											
										</div>
										
		    </div>
        
    )
}