'use client'

import {createContext, Dispatch, PropsWithChildren, Reducer, useReducer} from "react";

type UserContext = {
  userData: UserData | null,
  setUserData: Dispatch<UserReducerAction>
}

type UserData = {
  email: string
}

type UserReducerAction = {
  type: "login" | "logout",
  data: UserData
}

const initialContextValue = {
  userData: null,
  setUserData: () => {
  }
}

const userReducer: Reducer<UserData | null, UserReducerAction> = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.data))
      return {
        ...action.data
      }

    case "logout":
      localStorage.removeItem("user")
      return initialContextValue.userData
  }
}

export const UserContext = createContext<UserContext>(initialContextValue)

const UserContextProvider = ({children}: PropsWithChildren) => {
  let initialState: UserData | null;
  try {
    initialState = JSON.parse(localStorage.getItem('user') ?? '')
  } catch (_) {
    initialState = null
  }
  const [user, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{userData: user, setUserData: dispatch}}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider