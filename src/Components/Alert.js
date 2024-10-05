import React from 'react'
import { useContext } from 'react';
import AlertContext from '../Context/alert/AlertContext';


const Alert = () => {

    const context = useContext(AlertContext)
    const { alert } = context

    return (
        <div style={{height: "90px", top: "5px"}} className="sticky-top" >
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
                {alert.msg}
            </div>}
        </div>
    )
}

export default Alert
