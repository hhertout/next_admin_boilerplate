'use client'

import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import InputGroup from "@/components/ui/input-group";
import {useUser} from "@/hooks/useUser";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

type LoginFormProps = {
  $t: Record<string, any | Record<string, any>>
}

const LoginForm = ({$t}: LoginFormProps) => {
  const {setUser} = useUser()
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState<{ message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/login", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      })
      const data = await res.json()

      if (res.status === 200) {
        setUser({
          type: "login",
          data: {email: data.email}
        })
        router.push("/admin")
      } else if (res.status === 400) {
        setError({message: "Failed to connect : Check your information"})
      } else if (res.status >= 500) {
        setError({message: "The service is temporally unavailable"})
      }
    } catch (err: any) {
      console.error(err)
      setError({message: "The service is temporally unavailable"})
    } finally {
      setLoading(false)
    }

    return
  }

  if (loading) {
    return <LoginLoading $t={$t}/>
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          id={"email"}
          value={credentials.email}
          onChange={handleChange}
          name={'email'}
          type={'email'}
          placeholder={$t.login.email}
          className={'bg-white'}
          aria-label={$t.login.email}
        />
      </InputGroup>
      <InputGroup>
        <Input
          id={"password"}
          value={credentials.password}
          onChange={handleChange}
          name={'password'}
          type={'password'}
          placeholder={$t.login.password}
          className={'bg-white'}
          aria-label={$t.login.password}
        />
      </InputGroup>
      {error && <div className={'text-sm text-red-700 text-center mt-3'}>{error.message}</div>}
      <Button
        type={'submit'}
        variant={'outline'}
        className={"w-full text-center mt-5 bg-gray-950 text-gray-50 hover:bg-gray-700 font-bold"}
      >
        {$t.login.buttonLabel}
      </Button>
    </form>
  );
};

type LoginLoadingProps = {
  $t: Record<string, any>
}

const LoginLoading = ({$t}: LoginLoadingProps) => {
  return <div className={"w-full h-full flex flex-col justify-center items-center gap-3"}>
    <div className={"animate-spin dark:text-black"}>
      <SpinnerIcon size={24}/>
    </div>
    <div className={'font-bold dark:text-black'}>{$t.login.loadingMessage}</div>
  </div>
}

export default LoginForm;