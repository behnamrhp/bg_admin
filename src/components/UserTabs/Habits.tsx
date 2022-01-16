import { useEffect, useState } from "react";
import { useGetHabitQuery } from "../../redux/fetches/habits";
import { usersListFetchResult } from "../../utils/configs/types/api"

export const Habits = ({selUser}: {selUser : usersListFetchResult}) => {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useGetHabitQuery({page, user_id : +selUser.id});

    useEffect(() => {
        console.log(data);
    },[data]);

    return (
        <div>
        <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table text-md-nowrap" id="example1">
                                        <thead>
                                        <tr>
                                            <th className="wd-15p border-bottom-0">عنوان</th>
                                            <th className="wd-20p border-bottom-0">جزییات</th>
                                            <th className="wd-20p border-bottom-0">تصویر</th>
                                            <th className="wd-20p border-bottom-0">رنگ</th>
                                            <th className="wd-20p border-bottom-0">اهمیت</th>
                                            <th className="wd-20p border-bottom-0">سختی</th>
                                            <th className="wd-20p border-bottom-0">ترس</th>
                                            <th className="wd-20p border-bottom-0">امتیاز</th>
                                            <th className="wd-20p border-bottom-0">زمان</th>
                                            <th className="wd-20p border-bottom-0">تعداد تکرار</th>
                                            <th className="wd-20p border-bottom-0">روزهای هفته</th>
                                            <th className="wd-20p border-bottom-0">روزهای ماه</th>
                                            <th className="wd-20p border-bottom-0">زمان ایجاد</th>
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                        

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