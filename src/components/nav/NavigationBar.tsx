import React from 'react';
import Link from "next/link";
import {RocketIcon} from "@radix-ui/react-icons";
import NavigationBarMenu from "@/components/nav/NavigationBarMenu";
import {ThemeToggle} from "@/components/nav/ThemeToggle";
import LanguagesSwitcher from "@/components/nav/LanguagesSwitcher";

const NavigationBar = () => {
  return (
    <nav className={'fixed top-0 left-0 px-6 py-2 flex justify-between w-screen'}>
      <Link href={"/"} className={'flex items-center justify-center'}>
        <div id={"navbar-logo"} aria-label={"logo"} className={'flex items-center gap-2'}>
          <RocketIcon width={30} height={30}/>
          <h1 className={'text-xl font-bold ml-3'}>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        </div>
      </Link>
      <NavigationBarMenu/>
      <div className={'flex justify-center items-center gap-2'}>
        <LanguagesSwitcher/>
        <ThemeToggle/>
      </div>
    </nav>
  );
};


export default NavigationBar;