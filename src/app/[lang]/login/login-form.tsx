"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputGroup from "@/components/ui/input-group";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { login } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";

type LoginProps = {
  $t?: Record<string, any | Record<string, any>>;
};

type LoginFormProps = {
  $t?: Record<string, any | Record<string, any>>;
  formState: LoginFormState;
};

export type LoginFormState = {
  type: "error" | "success" | "idle";
  message?: string;
  errors?: Array<string>;
};

const LoginForm = ({ $t }: LoginProps) => {
  const [formState, action] = useFormState(login, {
    type: "idle",
  });

  useEffect(() => {
    if (formState.type === "success") {
      redirect("/admin");
    }
  }, [formState]);

  return (
    <form action={action}>
      <LoggingFormContent $t={$t} formState={formState} />
    </form>
  );
};

const LoggingFormContent = ({ $t, formState }: LoginFormProps) => {
  const { pending } = useFormStatus();

  const findErrorI18n = (err: string) => {
    const found = Object.entries($t?.error ?? []).find(([key, value]) => {
      console.log(key, value);
      if (key === err.toLocaleLowerCase().replaceAll(" ", "_")) {
        console.log("FIND");
        return value;
      }
    });
    if (found) return found[1];
    return err;
  };

  if (pending) {
    return <LoginLoading $t={$t} />;
  }
  return (
    <>
      <InputGroup>
        <Input
          id={"email"}
          autoComplete={"email"}
          name={"email"}
          type={"email"}
          placeholder={$t?.login.email || "Email"}
          className={"bg-white"}
          aria-label={$t?.login.email || "Email"}
          required
        />
      </InputGroup>
      <InputGroup>
        <Input
          id={"password"}
          autoComplete={"password"}
          name={"password"}
          type={"password"}
          placeholder={$t?.login.password || "Password"}
          className={"bg-white"}
          aria-label={$t?.login.password || "Password"}
          required
        />
      </InputGroup>

      {formState.errors
        ? formState.errors.map(err => (
            <div className="mt-6 font-semibold text-destructive text-sm">
              {$t?.error.error || "Error"} : {findErrorI18n(err)}
            </div>
          ))
        : null}

      <Button
        type={"submit"}
        variant={"outline"}
        className={
          "w-full text-center mt-5 bg-gray-950 text-gray-50 hover:bg-gray-700 font-bold"
        }
      >
        {$t?.login.buttonLabel || "Login"}
      </Button>
    </>
  );
};

type LoginLoadingProps = {
  $t?: Record<string, any>;
};

const LoginLoading = ({ $t }: LoginLoadingProps) => {
  return (
    <div
      className={
        "w-full h-full flex flex-col justify-center items-center gap-3"
      }
    >
      <div className={"animate-spin dark:text-black"}>
        <SpinnerIcon size={24} />
      </div>
      <div className={"font-bold dark:text-black"}>
        {$t?.login.loadingMessage || "Loading..."}
      </div>
    </div>
  );
};

export default LoginForm;
