import { ErrorsProps } from '@/interfaces/interfaces';
import style from './errors.module.css';

const Errors: React.FC<ErrorsProps> = ({
    children,
    ...props
}) => {
    return <p className={style.errors} {...props}>{children}</p>;
}

export default Errors;