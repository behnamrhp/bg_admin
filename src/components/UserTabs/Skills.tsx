import { useState, useEffect } from 'react';
import { useGetSkillsQuery } from '../../redux/fetches/skills';
import { usersListFetchResult } from '../../utils/configs/types/api';

export const Skills = ({selUser}: {selUser : usersListFetchResult}) => {

    const [page, setPage] = useState<number>(1);

    const { data , isLoading, isError } = useGetSkillsQuery({page, user_id : +selUser.id})

    useEffect(()=>{
        console.log(data);
    },[data])
    return (
        <div>
            <div className="card-body">
									<div className="table-responsive">
										<table className="table text-md-nowrap" id="example1">
											<thead>
											<tr>
												<th className="wd-15p border-bottom-0">شناسه</th>
												<th className="wd-15p border-bottom-0">عنوان</th>
												<th className="wd-20p border-bottom-0">درصد</th>
											</tr>
                                            
											</thead>
											<tbody>
											<tr>
												<td>1</td>
												<td>تست</td>
												<td>50%</td>
											</tr>
											<tr>
												<td>2</td>
												<td>تست</td>
												<td>50%</td>
											</tr>
										
											</tbody>
										</table>
									</div>
								</div>
                                {/* pagination section */}
                                <div className="row">
                                    
                                </div>
                                {/* /pagination section */}
                                
        </div>
    )
}