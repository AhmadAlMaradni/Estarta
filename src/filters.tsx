import { withRouter, NextRouter } from 'next/router'
import React from "react"
import { MouseEventHandler } from "react"
import styles from '../styles/Home.module.css'

class Filters extends React.Component<{ onClick: MouseEventHandler<any>, router: NextRouter }, { filterName: any, onClick: MouseEventHandler<any> }> {

      constructor(props: any) {
        super(props);
        this.state = {
            filterName: {},
            onClick: () => { }
        };
    }

    useEffect() {
            let Params = this.props.router.query
            this.setState((state: any) => ({
                filterName: {
                    logId:Params?.logId??'',
                    applicationId: Params?.applicationId??'',
                    actionType: Params?.actionType??'',
                    applicationType: Params?.applicationType??'',
                    from: Params?.from??'',
                    to: Params?.to??''
                },
            }))
            this.props.onClick(this.state.filterName)
    }

    applyFilter = ($event: any, key: string) => {
        this.setState({ filterName: { ...this.state.filterName, [key]: $event.target.value } })
    }

    submitFilter = () => {
        this.props.router.push({ pathname: '/mainPage/userList', query: { ...this.state.filterName } })
        this.props.onClick(this.state.filterName)
    }


    render() {
        return (
            <div className={styles.FilterـMain_Div}>

                <div>
                    <label  className={styles.Filterـlabel} htmlFor="logId">log ID</label>
                    <input className={styles.Filterـbox} value={this.state.filterName.logId} placeholder="eg. 906468196730134" name="logId" type="text" onChange={(e) => this.applyFilter(e, 'logId')} />
                </div>

                <div>
                    <label className={styles.Filterـlabel} htmlFor="applicationType">Application Type</label>
                    <select className={styles.Filterـbox} value={this.state.filterName.applicationType} name="applicationType" onChange={(e) => this.applyFilter(e, 'applicationType')} >
                        <option key={'empty_null'} value={''}>All Type</option>
                        <option key={'ADD_COMPANY'} value={'ADD_COMPANY'}>ADD_COMPANY</option>
                        <option key={'ADD_COMPANY_EMPLOYEE'} value={'ADD_COMPANY_EMPLOYEE'}>ADD_COMPANY_EMPLOYEE</option>
                        <option key={'ADD_POA'} value={'ADD_POA'}>ADD_POA</option>
                        <option key={'CERT_PROP_OWNERSHIP'} value={'CERT_PROP_OWNERSHIP'}>CERT_PROP_OWNERSHIP</option>
                        <option key={'CERT_TITLE_DEED_PLOT'} value={'CERT_TITLE_DEED_PLOT'}>CERT_TITLE_DEED_PLOT</option>
                        <option key={'LEASE_CLOSURE'} value={'LEASE_CLOSURE'}>LEASE_CLOSURE</option>
                        <option key={'LEASE_REGISTRATION'} value={'LEASE_REGISTRATION'}>LEASE_REGISTRATION</option>

                    </select>
                </div>
           
                <div>
                    <label  className={styles.Filterـlabel} htmlFor="applicationId">Application ID</label>
                    <input className={styles.Filterـbox} value={this.state.filterName.applicationId} placeholder="eg. 219841/2021" name="applicationId" type="text" onChange={(e) => this.applyFilter(e, 'applicationId')} />
                </div>

                <div>
                    <label className={styles.Filterـlabel} htmlFor="actionType">Action Type</label>
                    <select className={styles.Filterـbox} value={this.state.filterName.actionType} name="actionType" onChange={(e) => this.applyFilter(e, 'actionType')} >
                        <option key={'empty_null'} value={''}>All Type</option>
                            <option key={'ADD_EMPLOYEE'} value={'ADD_EMPLOYEE'}>{'ADD_EMPLOYEE'}</option>
                            <option key={'DARI_APP_LOGIN'} value={'DARI_APP_LOGIN'}>{'DARI_APP_LOGIN'}</option>
                            <option key={'DARI_REFRESH_TOKEN'} value={'DARI_REFRESH_TOKEN'}>{'DARI_REFRESH_TOKEN'}</option>
                            <option key={'INITIATE_APPLICATION'} value={'INITIATE_APPLICATION'}>{'INITIATE_APPLICATION'}</option>
                            <option key={'SUBMIT_APPLICATION'} value={'SUBMIT_APPLICATION'}>{'SUBMIT_APPLICATION'}</option>
                    </select>
                </div>

                <div>
                    <label className={styles.Filterـlabel} htmlFor="fromDate">From Date</label>
                    <input className={styles.Filterـbox_date} value={this.state.filterName.from} placeholder="Select Date" name="fromDate" type="date" onChange={(e) => this.applyFilter(e, 'from')} />
                </div>
                <div>
                    <label className={styles.Filterـlabel} htmlFor="toDate">To Date</label>
                    <input className={styles.Filterـbox_date} value={this.state.filterName.to} placeholder="Select Date" name="toDate" type="date" onChange={(e) => this.applyFilter(e, 'to')} />
                </div>
             
                 <div>
                    <label className={styles.Filterـlabel} htmlFor="filterButton">&nbsp;</label>
                    <button name="filterButton" className={styles.Filterـbutton} onClick={this.submitFilter}>Search Logger</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Filters)