import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { page } from '../utils/configs/types/api';

/**
 * @todo : should add siblingCount
 */
export const Pagination = ({page, setPage} : {page : page, setPage: any}) => {
    const page_arr = new Array();
    for(let i = 0; i < page.total_page; i++) {
        page_arr.push( (i+1) );
    }
    return (
        <ul className="pagination pagination-circled mb-0 align-items-center mt-2 justify-content-center">
          <li className="page-item"  onClick={()=> setPage(+page.page !== 1 ? +page.page - 1 : page.page)}>
              <button className={ (+page.page === 1) ? "page-link disabled" : "page-link"}>
                  <FontAwesomeIcon icon={faArrowRight} />
              </button>
          </li>
          {
              page_arr.map(item => {
                return (
                    <li key={`pageinate_`+item} className={+page.page === +item ? "page-item active" : "page-item"}>
                        <button className="page-link" onClick={()=> setPage(item)}>{item}</button>
                    </li>
                )
              })
          }
          
          <li className="page-item" onClick={()=> setPage(+page.page !== +page.total_page ? +page.page + 1 : page.page)}>
              <button className={(+page.total_page === +page.page) ? "page-link disabled" : "page-link"}>
                  <FontAwesomeIcon icon={faArrowLeft} />
              </button>
          </li>
      </ul>
    )
}