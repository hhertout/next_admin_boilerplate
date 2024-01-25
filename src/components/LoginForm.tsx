'use client'

import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import InputGroup from "@/components/ui/input-group";
import {useUser} from "@/hooks/useUser";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

const LoginForm = () => {
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
      if (res.status === 200) {
        const data = await res.json()
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

      return
    } catch (err: any) {
      console.error(err)
      setError({message: "The service is temporally unavailable"})
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoginLoading/>
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <label htmlFor={"email"} className={'dark:text-black'}>Email</label>
        <Input
          id={"email"}
          value={credentials.email}
          onChange={handleChange}
          name={'email'}
          type={'email'}
          placeholder={'Email'}
          className={'bg-white'}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor={'password'} className={'dark:text-black'}>Password</label>
        <Input
          id={"password"}
          value={credentials.password}
          onChange={handleChange}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          className={'bg-white'}
        />
      </InputGroup>
      {error && <div className={'text-sm text-red-700 text-center mt-3'}>{error.message}</div>}
      <Button
        type={'submit'}
        variant={'outline'}
        className={"w-full text-center mt-5 bg-gray-950 text-gray-50 hover:bg-gray-700 font-bold"}
      >
        Login
      </Button>
    </form>
  );
};

const LoginLoading = () => {
  return <div className={"w-full h-full flex flex-col justify-center items-center gap-3"}>
    <div className={"animate-spin dark:text-black"}>
      <SpinnerIcon size={24}/>
    </div>
    <div className={'font-bold dark:text-black'}>Please wait ...</div>
  </div>
}

export default LoginForm;