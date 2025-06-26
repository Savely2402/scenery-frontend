import styles from './authInput.module.scss'
import { type InputHTMLAttributes } from 'react';

interface InputProps{
    placeholder: string;
    type: string;
}

export const AuthInput: React.FC<InputProps> = ({placeholder, type, ...props}) => {
    return <input {...props} type={type} className={styles.authInput} 
    placeholder={placeholder}/>
}
