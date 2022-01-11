import { useAppSelector } from "../../redux/hooks";
import { userFetchResult } from '../../utils/configs/types/api';


export const Home = () => {
    const user = useAppSelector(state => state.user.data) as userFetchResult;

    return (
        <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
                <div>
                    <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">سلام، {user.firstname} عزیز خوش آمدید!</h2>
                    <p className="mg-b-0">برای شروع، صفحه مورد نظر خود را انتخاب کنید.</p>
                </div>
            </div>
        </div>
    )
}