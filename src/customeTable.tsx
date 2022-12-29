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

    DataAfterFilter = filterData({ tableData: DataAfterFilter, filterName })
    DataLog = DataAfterFilter.slice(pageNumber, index);
        
    return (
    <div>
        <Filters onClick={submitFilter} />
        <div  className={styles.MaintableContaner}>
            <table className={styles.Maintable}>
                <thead>
                    <tr>
                        {headers.map((header:any) => (<th>{header.name}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {DataLog.map((user:any) => (
                        <tr>
                            <td>{user.logId}</td>
                            <td>{user.applicationType?? <span className={styles.No_Row_data}> -/-</span>}</td>
                            <td>{user.applicationId?? <span className={styles.No_Row_data}> -/-</span>}</td>
                            <td>{user.actionType?? <span className={styles.No_Row_data}> -/-</span>}</td>
                            <td> <span className={styles.No_Row_data}> -/-</span></td>
                            <td className={styles.dataWidth} >{user.creationTimestamp?? <span className={styles.No_Row_data}> -/-</span>}</td>
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
export default MainTable


 let filterData = ({tableData,filterName,}: {tableData: any[];filterName: any;})=> {
    let filteredData: any[] = [];

  if (
    filterName &&
    Object.keys(filterName).length === 0 &&
    Object.getPrototypeOf(filterName) === Object.prototype
  ) {
    return (filteredData = [...tableData]);
    }

  filteredData = tableData.filter((dataLog) => {
      let actionTypeFilter = null;
      let applicationTypeFilter = null;
      let applicationIdFilter = null;
      let logIdFilter = null;
      let creationTimestampFilter = null;
      let isResult = true;

    if (filterName.logId && filterName.logId !== "") {
        logIdFilter = dataLog.logId?.toString().includes(filterName.logId.toLowerCase());
          isResult = isResult && logIdFilter;
      }

    if (filterName.actionType && filterName.actionType !== "") {
      actionTypeFilter = dataLog.actionType?.toString().trim().toLowerCase()
        .localeCompare(filterName.actionType.toLowerCase()) === 0;
        isResult = isResult && actionTypeFilter;
    }

    if (filterName.applicationType && filterName.applicationType !== "") {
      applicationTypeFilter = dataLog.applicationType?.toString().toLowerCase()
        .localeCompare(filterName.applicationType.toLowerCase()) === 0;
        isResult = isResult && applicationTypeFilter;
    }

    if (filterName.applicationId && filterName.applicationId !== "") {
      applicationIdFilter = dataLog.applicationId?.toString().includes(filterName.applicationId.toLowerCase());
      isResult = isResult && applicationIdFilter;
    }

    if ( filterName.from && filterName.to ) {
      const logDate = new Date(dataLog.creationTimestamp);
      const filterFromDate = new Date(filterName.from);
      const filtertoDate = new Date(filterName.to);
      creationTimestampFilter = logDate >= filterFromDate && logDate <= filtertoDate;
      isResult = isResult && creationTimestampFilter;
    }

    if (isResult) {return dataLog}
  });

  return filteredData;
}
