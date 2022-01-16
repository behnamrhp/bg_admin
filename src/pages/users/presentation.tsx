import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { userTab } from '../../utils/configs/constants/global';
import { usersListPropTypes } from '../../utils/configs/types/global';
import { UsersList } from '../../components/UsersList';
import { SelectedUser } from '../../components/selectedUser';
import { Skills } from '../../components/UserTabs/Skills';
import { Habits } from '../../components/UserTabs/Habits';
import { HabitLogs } from '../../components/UserTabs/HabitLogs';
import { SelfEvaluation } from '../../components/UserTabs/SelfEvaluation';
import { Scores } from '../../components/UserTabs/Scores';



const UserTabItemSelect = (tab : string, props : {selUser}) => {

	const tab_map = new Map();
	tab_map.set(userTab.skills, <Skills  {...props} />);
	tab_map.set(userTab.habits, <Habits  {...props} />);
	// tab_map.set(userTab.habitLogs, <HabitLogs  {...props} />);
	// tab_map.set(userTab.selfEvaluation, <SelfEvaluation  {...props} />);
	// tab_map.set(userTab.userScores, <Scores  {...props} />);

	return tab_map.get(tab)
}

export const UserPresentation = ({usersListData, usersListIsLoading, usersListIsError, selUser, setSelUser, setSelTab, selTab} : usersListPropTypes) => {


	const onClickTabHandler = (e) => {
		const tab = e.target as HTMLElement;
		setSelTab(tab.dataset.toggle);
	}

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
                                        { !usersListIsError && usersListData && !usersListData.error && selUser  && (<UsersList usersListData={usersListData} usersListIsLoading={usersListIsLoading} usersListIsError={usersListIsError} setSelUser={setSelUser} selUser={selUser} selTab={selTab} setSelTab={setSelTab}/>)}
                                        {/* /users list */}

									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-lg-7 col-xl-8">
							<div className="">
								<a className="main-header-arrow" href="#" id="ChatBodyHide"><i className="icon ion-md-arrow-back"></i></a>
								<div className="main-content-body main-content-body-contacts card custom-card">

									{ !usersListIsError && usersListData && selUser && (<SelectedUser selUser={selUser}/> )}									
								
                                    {/* tabs */}
									<div className="main-contact-info-body p-4">
                                            <nav className="nav main-nav-line main-nav-line-chat  pl-3">
												<button className={selTab === userTab.skills ? "nav-link-button nav-link active" : "nav-link-button nav-link"} data-toggle={userTab.skills} onClick={(e) => onClickTabHandler(e)}>{userTab.skills}</button>
												<button className={selTab === userTab.habits ? "nav-link-button nav-link active" : "nav-link-button nav-link"} data-toggle={userTab.habits} onClick={(e) => onClickTabHandler(e)}>{userTab.habits}</button>
												<button className={selTab === userTab.habitLogs ? "nav-link-button nav-link active" : "nav-link-button nav-link"} data-toggle={userTab.habitLogs} onClick={(e) => onClickTabHandler(e)}>{userTab.habitLogs}</button>
												<button className={selTab === userTab.userScores ? "nav-link-button nav-link active" : "nav-link-button nav-link"} data-toggle={userTab.userScores} onClick={(e) => onClickTabHandler(e)}>{userTab.userScores}</button>
												<button className={selTab === userTab.selfEvaluation ? "nav-link-button nav-link active" : "nav-link-button nav-link"} data-toggle={userTab.selfEvaluation} onClick={(e) => onClickTabHandler(e)}>{userTab.selfEvaluation}</button>
											</nav>
									</div>
                                    {/* /tabs */}
									<div className="main-contact-info-body px-4 pb-3 ps">
										{ !usersListIsError && usersListData && selUser && UserTabItemSelect(selTab, {selUser})}
									</div>

								</div>
							</div>
						</div>
					</div>
		</div>
    </>
    )
}