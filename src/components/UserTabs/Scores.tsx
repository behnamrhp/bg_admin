import { useState } from "react";
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { usersListFetchResult } from '../../utils/configs/types/api';
import { useGetUserScoresQuery } from "../../redux/fetches/userScores";

export const Scores = ({selUser}: {selUser : usersListFetchResult}) => {
    const [page, setPage] = useState<number>(1);
	
    const { data, isLoading, isError } = useGetUserScoresQuery({page, user_id : +selUser.id});

    const ScoreItem = () => {
		if(data.data.ids.length === 0 ) return (
			<tr>
				<td colSpan={4} className="t-center">
					گزارشی ثبت نشده است
				</td>
			</tr>
		);

		return data.data.ids.map(id => {
			const score = data.data.entities[id];
			return (
			<tr key={'skill_' + score.id}>
				<td>{score.date}</td>
				<td>{score.score}</td>
				
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
                                            <th className="wd-20p border-bottom-0">تاریخ</th>
                                            <th className="wd-20p border-bottom-0">امتیاز</th>
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                            
                                            {!isError && data && data.data && ScoreItem()}

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