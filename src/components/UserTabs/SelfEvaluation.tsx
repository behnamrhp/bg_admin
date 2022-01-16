import { useSelfEvaluationQuestionsScoresQuery } from "../../redux/fetches/selfEvaluation"
import { useState } from 'react';
import { usersListFetchResult } from '../../utils/configs/types/api';

export const SelfEvaluation = ({selUser}: {selUser : usersListFetchResult}) => {
    const [page, setPage] = useState<number>(1);
    
    const {data, isLoading, isError} = useSelfEvaluationQuestionsScoresQuery({page, user_id : +selUser.id});
    return (
        <div>
            selfEvaluation Tab
        </div>
    )
}