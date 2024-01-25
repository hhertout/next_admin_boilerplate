import React from 'react';
import LanguagesSwitcher from "@/components/nav/LanguagesSwitcher";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import AccountIcon from "@/components/icons/AccountIcon";
import {useRouter} from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import {ThemeToggle} from "@/components/ThemeToggle";

const SettingsMenu = () => {
  return (
    <div className={'p-4 w-[240px]'}>
      <AccountButton/>
      <LogoutButton/>
      <Separator className="my-1"/>
      <LanguagesSwitcher/>
    </div>
  );
};

const AccountButton = () => {
  const router = useRouter()
  return <Button className={'w-full'} onClick={() => router.push("/admin/account")}>
    <AccountIcon width={18} height={18}/>
    <span className={'ml-2'}>Account</span>
  </Button>
}

export default SettingsMenu;