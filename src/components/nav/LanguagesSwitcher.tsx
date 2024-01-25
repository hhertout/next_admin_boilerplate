'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {i18n, Locale} from "../../../i18n.config";
import {useRouter} from "next/navigation";

const LanguagesSwitcher = () => {
  const router = useRouter();

  const handleLocaleChange = (lang: Locale) => {
    document.cookie = `i18n_locale=${lang}; Path=/`;
    const location = window.location.pathname
    i18n.locales.forEach(locale => {
      if (location.startsWith(`/${locale}`)) {
        router.push(`/${lang}${location.slice(locale.length + 1)}`)
      }
    })
  }

  return (
    <>
      <div className={'text-sm opacity-60'}>Languages :</div>
      <div className={'columns-2 my-1'}>
        <div className={"flex justify-center"}>
          <Button variant={"outline"} size={'icon'} className={'w-full text-sm'}
                  onClick={() => handleLocaleChange('en')}>en</Button>
        </div>
        <div className={"flex justify-center"}>
          <Button variant={"outline"} size={'icon'} className={'w-full text-sm'}
                  onClick={() => handleLocaleChange('fr')}>fr</Button>
        </div>
      </div>
    </>
  )
};

export default LanguagesSwitcher;