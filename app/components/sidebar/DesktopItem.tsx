'use client';

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons"; // If you're using react-icons, this can be the type for icons.

interface DesktopItemProps {
  label: string;
  icon: IconType; // Assuming you're using a common icon component type like from 'react-icons'
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon, // Icon component
  href,
  onClick,
  active
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <li onClick={handleClick}>
      <Link 
        href={href}
        className={clsx(`
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-black
          hover:bg-gray-100
        `,
          active && 'bg-gray-100 text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
   );
}
 
export default DesktopItem;
