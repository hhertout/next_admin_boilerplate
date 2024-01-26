'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {i18n, Locale} from "../../../i18n.config";
import {useRouter} from "next/navigation";
import {DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import {GlobeIcon} from "@radix-ui/react-icons";

const LanguagesSwitcher = () => {
  const [locale, setLocale] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    setLocale(window.location.pathname.slice(1, 3))
  }, [])

  const handleLocaleChange = (lang: Locale) => {
    document.cookie = `i18n_locale=${lang}; Path=/`;
    const location = window.location.pathname
    i18n.locales.forEach(locale => {
      if (location.startsWith(`/${locale}`)) {
        setLocale(lang => lang)
        router.push(`/${lang}${location.slice(locale.length + 1)}`)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {locale && locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale, index) => (
          <DropdownMenuItem key={index} onClick={() => handleLocaleChange(locale)} aria-label={'language'}>
            <GlobeIcon/>
            <span className={'ml-2'}>{locale}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default LanguagesSwitcher;