import styles from './alert.module.css';
import { useEffect } from 'react';
import { useAppContext } from '@/app/context';

export default function Alert() {

    const {alert, setAlert} = useAppContext();

    useEffect(() => {
        setTimeout(() => {
            setAlert({status: false, message: ""});
        }, 2000)
    
    })
  return (
    <div className={styles.container}>
        {alert.message}
    </div>
  )
}
