import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconProps } from '@/interfaces/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, far);

export default function Icon({
    icon,
    className = '',
    ...props
}: IconProps) {
    return <FontAwesomeIcon
        icon={icon}
        className={className}
        aria-hidden={!props.title}
        {...props}
    />;
}