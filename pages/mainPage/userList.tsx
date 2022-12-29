import type { GetStaticProps, NextPage } from 'next';
import MainTable from '../../src/customeTable';
import styles from '../../styles/Home.module.css'

const customTable: NextPage<{DataLog: any[],DataAfterFilter: any[],headers: any[];}> =({ DataLog,DataAfterFilter, headers })=>{
    return (
        <div className={styles.mainContainer} >
            <MainTable headers={headers} DataAfterFilter={DataAfterFilter} DataLog={DataLog} />
        </div>
    )};

export const getStaticProps: GetStaticProps = async () => {
    const mainAPI = await fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
    const data = await mainAPI.json();

    const  headers = [
        { Id: 1,  name: 'Log ID' },
        { Id: 2,  name: 'Application Type' },
        { Id: 3,  name: 'Application ID' },
        { Id: 4,  name: ' Action' },
        { Id: 5,  name: 'Action Details' },
        { Id: 6,  name: 'Date:Time' }
    ]

    return {
        props: {
            DataAfterFilter: data.result.auditLog,
            DataLog: data.result.auditLog,
            headers
        }
    }
}

export default customTable