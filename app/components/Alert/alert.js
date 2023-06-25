import styles from './alert.module.css';
import { useEffect } from 'react';
import { useAppContext } from '@/app/context';

export default function Alert() {

    const {alert, setAlert} = useAppContext();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({status: false, message: ""});
        }, 2000)

        return () => {
          clearTimeout(timeout);
        }
    
    })
  return (
    <div className={styles.container}>
        {alert.message}
    </div>
  )
}
