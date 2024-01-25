import {useContext} from "react";
import {UserContext} from "@/context/UserContext";

export const useUser = () => {
  const {userData, setUserData} = useContext(UserContext)

  return {user: userData, setUser: setUserData}
}