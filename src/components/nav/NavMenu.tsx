import React from 'react';

type NavMenuProps = {
  $t: Record<string, any>
}

const NavMenu = ({}: NavMenuProps) => {
  return (
    <div className={'p-4 w-[240px]'}>
      <ul className={'flex flex-col justify-center items-center'}>
        <li>Link</li>
        <li>Link</li>
      </ul>
    </div>
  );
};

export default NavMenu;