import React, {JSX} from "react"

const NavigationMenuTitle = ({children}: { children: JSX.Element | string }) => {
  return <div className={'text-lg font-bold'}>{children}</div>
}

export default NavigationMenuTitle
