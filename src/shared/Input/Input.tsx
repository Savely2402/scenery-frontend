import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    sizeVariant?: 'S' | 'L'
}

export const Input: React.FC<InputProps> = ({ placeholder, type, sizeVariant, ...props }) => {

    const classNames = [styles.authInput];
    if (sizeVariant) {
        classNames.push(styles[sizeVariant]);
    }

    return <input {...props} type={type} className={classNames.join(' ')}
        placeholder={placeholder} />
}
