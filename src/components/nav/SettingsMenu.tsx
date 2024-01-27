import React from 'react';
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import AccountIcon from "@/components/icons/AccountIcon";
import {useRouter} from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

type SettingsMenuProps = {
  $t?: Record<string, any>
}

const SettingsMenu = ({$t}: SettingsMenuProps) => {
  return (
    <div className={'p-4 w-[240px]'}>
      <AccountButton label={$t?.navbar.account}/>
      <LogoutButton label={$t?.navbar.logout}/>
      <Separator className="my-1"/>
    </div>
  );
};

const AccountButton = ({label}: { label: string }) => {
  const router = useRouter()
  return <Button className={'w-full'} onClick={() => router.push("/admin/account")}>
    <AccountIcon width={18} height={18}/>
    <span className={'ml-2'}>{label}</span>
  </Button>
}

export default SettingsMenu;