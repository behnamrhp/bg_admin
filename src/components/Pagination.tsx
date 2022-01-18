import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { page } from '../utils/configs/types/api';


export const Pagination = ({page, setPage} : {page : page, setPage: any}) => {
    const page_arr = new Array();
    for(let i = 0; i < page.total_page; i++) {
        page_arr.push( (i+1) );
    }
    const cur_page = +page.page;
    const sibling_count = 5;
    return (
        <ul className="pagination pagination-circled mb-0 align-items-center mt-2 justify-content-center">
          <li className="page-item"  onClick={()=> setPage(cur_page !== 1 ? cur_page - 1 : cur_page)}>
              <button className={ (cur_page === 1) ? "page-link disabled" : "page-link"}>
                  <FontAwesomeIcon icon={faArrowRight} />
              </button>
          </li>
          {
              page_arr.map(item => {
                  
                  if(+item === 1 || +item === +page.total_page || (+item < (cur_page + sibling_count) && +item > (cur_page - sibling_count)) ){
                    return (
                        <li key={`pageinate_`+item} className={+page.page === +item ? "page-item active" : "page-item"}>
                            <button className="page-link" onClick={()=> setPage(item)}>{item}</button>
                        </li>
                    )
                  } 
                  if(+item === (cur_page + sibling_count) || +item === (cur_page - sibling_count)) return '...';

                
              })
          }
          
          <li className="page-item" onClick={()=> setPage(cur_page !== +page.total_page ? cur_page + 1 : cur_page)}>
              <button className={(+page.total_page === cur_page) ? "page-link disabled" : "page-link"}>
                  <FontAwesomeIcon icon={faArrowLeft} />
              </button>
          </li>
      </ul>
    )
}