'use client';

import Link from "next/link";
import clsx from "clsx";
import { IconType } from "react-icons"; // If you're using 'react-icons', use IconType

interface MobileItemProps {
  href: string;
  icon: IconType; // Change 'any' to 'IconType' (or React.ElementType)
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon, // Capitalize as it's a component
  active,
  onClick
}) => {
  return ( 
    <Link 
      onClick={onClick} // You are already handling the click here, no need for `handleClick`
      href={href}
      className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}

export default MobileItem;
