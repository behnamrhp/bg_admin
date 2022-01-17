import { useSelfEvaluationQuestionsScoresQuery } from "../../redux/fetches/selfEvaluation"
import { useState, useEffect } from 'react';
import { usersListFetchResult } from '../../utils/configs/types/api';
import { selfQuestionTabTitle } from './../../utils/configs/constants/global';
import { Loading } from '../Loading';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

export const SelfEvaluation = ({selUser}: {selUser : usersListFetchResult}) => {
    
    const [ selfQuestionTab, setSelfQuestionTab ] = useState<number>(1);
    const {data, isLoading, isError} = useSelfEvaluationQuestionsScoresQuery({user_id : +selUser.id});
    const [ isEmpty, setIsEmpty ] = useState<boolean>(false);
    
    //check is there any result
    useEffect(() => {
        if(!data || (!data && !data.data) ) return;
        let isNotResult = true;
        for(const key in data.results) {
            if(+data.results[key] !== 0){
                isNotResult = false
            } 
        }
         setIsEmpty(isNotResult);        
    },[data, selfQuestionTab]);

    const selfQuestionItem = () => {
        console.log(data);
		if(data.data.ids.length === 0 ) return (
			<tr>
				<td colSpan={4} className="t-center">
					گزارشی ثبت نشده است
				</td>
			</tr>
		);

		return data.data.ids.map(id => {
			const selfQuestion = data.data.entities[id];
            if(+selfQuestion.section !== selfQuestionTab) return;
			return (
			<tr key={'skill_' + selfQuestion.id}>
				<td colSpan={3}>{selfQuestion.title}</td>
				<td>{selfQuestion.score}</td>								
			</tr>
			)
		})
	}
    
    return (
        <div>
            <div className="card-body">
            <Loading isFullWidth={false} isVisible={isLoading}/>

                <div className="main-contact-info-body ">
                        <nav className="nav main-nav-line main-nav-line-chat selfQuestionTabContainer pl-3">
							<button className={selfQuestionTab === 1 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(1) }>{selfQuestionTabTitle[1]}</button>
							<button className={selfQuestionTab === 2 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(2) }>{selfQuestionTabTitle[2]}</button>
							<button className={selfQuestionTab === 3 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(3) }>{selfQuestionTabTitle[3]}</button>
							<button className={selfQuestionTab === 4 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(4) }>{selfQuestionTabTitle[4]}</button>
							<button className={selfQuestionTab === 5 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(5) }>{selfQuestionTabTitle[5]}</button>
							<button className={selfQuestionTab === 6 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(6) }>{selfQuestionTabTitle[6]}</button>
							<button className={selfQuestionTab === 7 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(7) }>{selfQuestionTabTitle[7]}</button>
							<button className={selfQuestionTab === 8 ? "nav-link-button nav-link active" : "nav-link-button nav-link" } onClick={() =>setSelfQuestionTab(8) }>{selfQuestionTabTitle[8]}</button>
						</nav>
				</div>
                <div className="table-responsive mt-4">
                                    <table className="table text-md-nowrap" id="example1">
                                        <thead>
                                        <tr>
                                            <th className="wd-15p border-bottom-0">عنوان</th>
                                            <th className="wd-20p border-bottom-0"></th>
                                            <th className="wd-20p border-bottom-0"></th>
                                            <th className="wd-20p border-bottom-0">امتیاز</th>
                                            
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                            
                                             {!isError && data && data.data && selfQuestionItem()}
                                             {!isError && data && data.data && (
                                                 <>
                                                    <tr>
                                                        <td className="t-bold" colSpan={3}>جمع</td>
                                                        <td className="t-bold">{data.results[+selfQuestionTab]}</td>
                                                    </tr>
                                                 </>
                                                 )}
                                             
                                        </tbody>
                                    </table>
                                </div>
                <div>
                {!isError && data && data.data && data.results && !isEmpty && ( <Radar 
                    data={
                        {
                            labels : [
                                selfQuestionTabTitle[1],
                                selfQuestionTabTitle[2],
                                selfQuestionTabTitle[3],
                                selfQuestionTabTitle[4],
                                selfQuestionTabTitle[5],
                                selfQuestionTabTitle[6],
                                selfQuestionTabTitle[7],
                                selfQuestionTabTitle[8] 
                            ],
                            datasets : [{
                                label: `نمودار ارزیابی فردی ${selUser.firstname + ' ' + selUser.lastname}`,
                                data: [data.results[1], data.results[2], data.results[3], data.results[4], data.results[5], data.results[6], data.results[7], data.results[8]],
                                fill: true,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                pointBackgroundColor: 'rgb(255, 99, 132)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(255, 99, 132)'
                            }]
                        }
                    }
                    options={{
                        elements: {
                            line: {
                              borderWidth: 3
                            }
                          },
                          plugins: {
                            legend: {
                                labels: {
                                    
                                    // This more specific font property overrides the global property
                                    font: {
                                        size: 15,
                                        family : 'iransans'
                                    }
                                }
                            }
                        }
                      }}
                    /> )
                }
                </div>
            </div>
        </div>
    )
}