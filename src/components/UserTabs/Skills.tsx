import { useState, useEffect } from 'react';
import { useGetSkillsQuery } from '../../redux/fetches/skills';
import { usersListFetchResult } from '../../utils/configs/types/api';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';

export const Skills = ({selUser}: {selUser : usersListFetchResult}) => {

    const [page, setPage] = useState<number>(1);
	const skillsColumns = 4;
    const { data , isLoading, isError } = useGetSkillsQuery({page, user_id : +selUser.id})

	const skillItem = () => {
		if(data.data.ids.length === 0 ) return (
			<tr>
				<td colSpan={skillsColumns} className="t-center">
					گزارشی ثبت نشده است
				</td>
			</tr>
		);

		return data.data.ids.map((id,i) => {
			const skill = data.data.entities[id];
			return (
			<tr key={'skill_' + skill.id}>
				<td>{i + 1}</td>
				<td>{skill.subject}</td>
				<td>{skill.percent}%</td>
				<td>{skill.docount}</td>
			</tr>
			)
		})
	}

    useEffect(()=>{
        console.log(data);
    },[data])
    return (
        <div>
            <div className="card-body">
						<Loading isFullWidth={false} isVisible={isLoading}/>
									<div className="table-responsive">
										<table className="table text-md-nowrap" id="example1">
											<thead>
											<tr>
												<th className="wd-15p border-bottom-0">شمارنده</th>
												<th className="wd-15p border-bottom-0">عنوان</th>
												<th className="wd-20p border-bottom-0">درصد</th>
												<th className="wd-20p border-bottom-0">تعداد انجام</th>
											</tr>
                                            
											</thead>
											<tbody>
											
											{!isError && data && !data.error && skillItem()}
										
											</tbody>
										</table>
									</div>
								</div>
                                {/* pagination section */}
                                <div className="row">
                                    
                                </div>
                                {/* /pagination section */}
								{!isError && data && data.page && +data.page.total_page !== 1 && +data.page.total_page !== 0 && (<Pagination page={data.page} setPage={setPage}/>)}
                                
        </div>
    )
}