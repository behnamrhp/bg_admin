import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { userTab } from '../../utils/configs/constants/global';

export const UserPresentation = () => {
    return (
        <>
    {/* header */}
        <div className="breadcrumb-header justify-content-between title-header">
            <div className="left-content">
                <div>
                    <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">مدیریت کاربران</h2>
                </div>
            </div>
        </div>
    {/* header */}
	<div className="container content-container">
    				<div className="row">
						<div className="col-sm-12 col-lg-5 col-xl-4">
							<div className="card custom-card">
								<div className="">
									<div className="main-content-app main-content-contacts pt-0">
                                        {/* users list */}
										<div className="main-content-left main-content-left-contacts">

                                            <div className="main-header-center mt-2 mx-2 d-lg-block">
                                                <input className="form-control" placeholder="هر چیزی را جستجو کنید ..." type="search" />
                                                <button className="btn search-button">
                                                    <FontAwesomeIcon icon={faSearch}/>
                                                </button>
                                            </div>

											<div className="main-contacts-list" id="mainContactList">
												<div className="main-contact-label">
													آ
												</div>

                                                {/* user item */}
												<div className="main-contact-item selected">
													{/* <div className="main-img-user online">
                                                        <img alt="آواتار" src="assets/img/faces/2.jpg"/>
                                                    </div> */}
                                                    <div className="avatar-min">
														آ
													</div>
													<div className="main-contact-body">
														<h6>ابیگل جانسون</h6><span className="phone">+ 1-234-567-890</span>
													</div>
													<a className="main-contact-star" href="#">
														<i className="fe fe-star mr-1 text-warning"></i>
														<i className="fe fe-edit-2 mr-1"></i>
														<i className="fe fe-more-vertical"></i>
													</a>
												</div>
                                                {/* /user item */}
						
												
												<div className="main-contact-label">
													د
												</div>

											</div>
										</div>
                                        {/* /users list */}

									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-lg-7 col-xl-8">
							<div className="">
								<a className="main-header-arrow" href="#" id="ChatBodyHide"><i className="icon ion-md-arrow-back"></i></a>
								<div className="main-content-body main-content-body-contacts card custom-card">

									<div className="main-contact-info-header pt-3">
										<div className="media">
											{/* <div className="main-img-user">
												<img alt="آواتار" src="assets/img/faces/6.jpg" />
											</div> */}
                                            <div className="avatar bg-primary avatar-xl brround avatar-custom">
												آ
											</div>
											<div className="media-body">
												<h5>پتی کروزر</h5>
												<p>طراح وب</p>
											
											</div>
										</div>
										<div className="main-contact-action btn-list pt-3 pr-3">
											<button className="btn delete-user ripple btn-secondary text-white btn-icon" data-placement="top" data-toggle="tooltip" title="حذف کاربر">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
										</div>
									</div>

                                    {/* tabs */}
									<div className="main-contact-info-body p-4">
                                            <nav className="nav main-nav-line main-nav-line-chat  pl-3">
												<button className="nav-link-button nav-link active" data-toggle="tab" >{userTab.skills}</button>
												<button className="nav-link-button nav-link" data-toggle="tab" >{userTab.habits}</button>
												<button className="nav-link-button nav-link" data-toggle="tab" >{userTab.habitLogs}</button>
												<button className="nav-link-button nav-link" data-toggle="tab" >{userTab.userScores}</button>
												<button className="nav-link-button nav-link" data-toggle="tab" >{userTab.selfEvaluation}</button>
											</nav>
									</div>
                                    {/* /tabs */}
                                    
								</div>
							</div>
						</div>
					</div>
		</div>
    </>
    )
}