import React from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ExitIcon} from "@radix-ui/react-icons";

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      credentials: 'include'
    })
    if(res.status === 200) router.push("/")
  }

  return (
    <div>
      <Button variant={'destructive'} onClick={handleLogout} className={'w-full'}>
        <ExitIcon />
        <span className={'ml-3'}>Logout</span>
      </Button>
    </div>
  );
};

export default LogoutButton;