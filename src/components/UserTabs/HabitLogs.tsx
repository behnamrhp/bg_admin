import { useState } from "react";
import { useGetHabitLogQuery } from "../../redux/fetches/habitLogs";
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { usersListFetchResult } from '../../utils/configs/types/api';

export const HabitLogs = ({selUser}: {selUser : usersListFetchResult}) => {
    const [page, setPage] = useState<number>(1);
	
    const { data, isLoading, isError } = useGetHabitLogQuery({page, user_id : +selUser.id});

    const habitLogItem = () => {
		if(data.data.ids.length === 0 ) return (
			<tr>
				<td colSpan={4} className="t-center">
					گزارشی ثبت نشده است
				</td>
			</tr>
		);

		return data.data.ids.map(id => {
			const habitLog = data.data.entities[id];
			return (
			<tr key={'skill_' + habitLog.id}>
				<td>{habitLog.subject}</td>
				<td>{habitLog.date}</td>
				<td>{habitLog.time}</td>
				<td>{habitLog.status}</td>
				
			</tr>
			)
		})
	}

    return (
        <div>
        <div className="card-body">
                    <Loading isFullWidth={false} isVisible={isLoading}/>
                                <div className="table-responsive">
                                    <table className="table text-md-nowrap" id="example1">
                                        <thead>
                                        <tr>
                                            <th className="wd-15p border-bottom-0">عنوان</th>
                                            <th className="wd-20p border-bottom-0">تاریخ</th>
                                            <th className="wd-20p border-bottom-0">زمان</th>
                                            <th className="wd-20p border-bottom-0">وضعیت</th>
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                            
                                            {!isError && data && data.data && habitLogItem()}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* pagination section */}
                            <div className="row">
									{!isError && data && data.page && +data.page.total_page !== 1 && +data.page.total_page !== 0 && (<Pagination page={data.page} setPage={setPage}/>)}

                            </div>
                            {/* /pagination section */}
                            
    </div>
    )
}