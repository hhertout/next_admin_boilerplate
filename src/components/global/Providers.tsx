'use client'

import React, {PropsWithChildren} from 'react';
import UserContextProvider from "@/context/UserContext";
import {ThemeProvider as NextThemesProvider} from "next-themes"

const Providers = ({children}: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </NextThemesProvider>
    </UserContextProvider>
  );
};

export default Providers;