import { useState } from "react"
import styles from '../styles/Home.module.css'
import Filters from "./filters"
import Pagination from "./pagination"

const MainTable = ({ headers,DataAfterFilter, DataLog }: { headers: any,DataAfterFilter:any, DataLog: any }) => {
   
    // set filter value and on change 
    const [filterName, setFilterValues] = useState<any>({});
    
    // index, page for static pagenation
    const [page, setCurrentPage] = useState(1);
    const index = page * 10;
    const pageNumber = index - 10;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const submitFilter = (filterValue: any) => setFilterValues(filterValue);

    // filter on data and slice form the main data
    DataAfterFilter = filterData({ Data: DataAfterFilter, filterName })
    DataLog = DataAfterFilter.slice(pageNumber, index);
        
    return (
    <div>
        <Filters onClick={submitFilter} />
        <div  className={styles.MaintableContaner}>
            <table className={styles.Maintable}>
                <thead >
                    <tr key={headers.id}>
                        {headers.map((header:any) => (<th>{header.name}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {DataLog.map((log:any,i:any) => (
                        <tr key={i}> 
                            <td>{log.logId}</td>
                            <td>{log.applicationType?? <span className={styles.No_Row_data}> -/-</span>}</td>
                            <td>{log.applicationId?? <span className={styles.No_Row_data}> -/-</span>}</td>
                            <td>{log.actionType?? <span className={styles.No_Row_data}> -/-</span>}</td>
                            <td> <span className={styles.No_Row_data}> -/-</span></td>
                            <td className={styles.dataWidth} >{log.creationTimestamp?? <span className={styles.No_Row_data}> -/-</span>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {DataLog.length === 0 &&<div className="No-Data">No Data Matching This Filter</div>}

            {/* Pagenaion */}
            <Pagination totalUsers={DataAfterFilter.length} currentPage={page} paginate={paginate} />
        </div>
    </div>
    )

}

// add the logic here for easy review within the scope Otherwise "Best ractice" spraded model file
export default MainTable


 let filterData = ({Data,filterName}: {Data: any[];filterName: any;})=> {
    let filteredData = [];

  if (filterName.length === 0  ){
    return (filteredData = [...Data]);
    }

  filteredData = Data.filter((dataLog) => {
      let logIdFlag,actionFlag ,applicationFlag 
      ,applicationIdFlag , DateFlag,isResult = true;

    if (filterName.logId && filterName.logId !== "") {
      logIdFlag = dataLog.logId?.toString().includes(filterName.logId.toLowerCase());
          isResult = isResult && logIdFlag;
      }

    if (filterName.actionType && filterName.actionType !== "") {
      actionFlag = dataLog.actionType?.toString().trim().toLowerCase()
        .localeCompare(filterName.actionType.toLowerCase()) === 0;
        isResult = isResult && actionFlag;
    }

    if (filterName.applicationType && filterName.applicationType !== "") {
      applicationFlag = dataLog.applicationType?.toString().toLowerCase()
        .localeCompare(filterName.applicationType.toLowerCase()) === 0;
        isResult = isResult && applicationFlag;
    }

    if (filterName.applicationId && filterName.applicationId !== "") {
      applicationIdFlag = dataLog.applicationId?.toString().includes(filterName.applicationId.toLowerCase());
      isResult = isResult && applicationIdFlag;
    }

    if ( filterName.from && filterName.to ) {
      const logDate = new Date(dataLog.creationTimestamp);
      const filterFromDate = new Date(filterName.from);
      const filtertoDate = new Date(filterName.to);
      DateFlag = logDate >= filterFromDate && logDate <= filtertoDate;
      isResult = isResult && DateFlag;
    }

    if (isResult) {return dataLog}
  });

  return filteredData;
}
