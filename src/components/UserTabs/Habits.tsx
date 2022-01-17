import { useEffect, useState } from "react";
import { useGetHabitQuery } from "../../redux/fetches/habits";
import { usersListFetchResult } from "../../utils/configs/types/api"
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';

export const Habits = ({selUser}: {selUser : usersListFetchResult}) => {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useGetHabitQuery({page, user_id : +selUser.id});
	

    const habitItem = () => {
		if(data.data.ids.length === 0 ) return (
			<tr>
				<td colSpan={4} className="t-center">
					گزارشی ثبت نشده است
				</td>
			</tr>
		);

		return data.data.ids.map(id => {
			const habit = data.data.entities[id];
			return (
			<tr key={'skill_' + habit.id}>
				<td>{habit.subject}</td>
				<td>{habit.details}</td>
				<td>{habit.importance}</td>
				<td>{habit.difficulty}</td>
				<td>{habit.fear}</td>
				<td>{habit.score}</td>
				<td>{habit.time}</td>
				<td>{habit.repeat_period}</td>
				<td>{habit.days_of_week}</td>
				<td>{habit.days_of_month}</td>
				<td>{habit.skills?.subject}</td>
				<td>{habit.skills?.percent}</td>
				<td>{habit.skills?.failed_count}</td>
				<td>{habit.skills?.success_count}</td>
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
                                            <th className="wd-20p border-bottom-0">جزییات</th>
                                            <th className="wd-20p border-bottom-0">اهمیت</th>
                                            <th className="wd-20p border-bottom-0">سختی</th>
                                            <th className="wd-20p border-bottom-0">ترس</th>
                                            <th className="wd-20p border-bottom-0">امتیاز</th>
                                            <th className="wd-20p border-bottom-0">زمان</th>
                                            <th className="wd-20p border-bottom-0">دوره تکرار</th>
                                            <th className="wd-20p border-bottom-0">روزهای هفته</th>
                                            <th className="wd-20p border-bottom-0">روزهای ماه</th>
                                            <th className="wd-20p border-bottom-0">عنوان توانایی عادت</th>
                                            <th className="wd-20p border-bottom-0">درصد</th>
                                            <th className="wd-20p border-bottom-0">شکست ها</th>
                                            <th className="wd-20p border-bottom-0">موفقیت ها</th>
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                            
                                            {!isError && data && data.data && habitItem()}

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