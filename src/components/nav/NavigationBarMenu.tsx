'use client'

import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import NavMenu from "@/components/nav/NavMenu";
import React, {useMemo} from "react";
import NavigationMenuTitle from "@/components/ui/navigation-menu-title";
import SettingsMenu from "@/components/nav/SettingsMenu";

const NavigationBarMenu = () => {
  const menu = useMemo(() => [
    {
      label: "Menu",
      subMenu: <NavMenu/>
    },
    {
      label: "Settings",
      subMenu: <SettingsMenu/>
    }
  ], [])

  return <NavigationMenu>
    <NavigationMenuList>
      {menu.map((item, index) => (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger>
            <NavigationMenuTitle>
              {item.label}
            </NavigationMenuTitle>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {item.subMenu}
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
}

export default NavigationBarMenu