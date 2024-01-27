import React from 'react';
import NavigationBar from "@/components/nav/NavigationBar";
import {getLocale} from "@/lib/i18n";
import {Locale} from "../../../../../i18n.config";

const AccountPage = async ({params}: { params: { lang: Locale } }) => {
  const $t = await getLocale(params.lang)

  return (
    <div>
      <NavigationBar $t={$t}/>
    </div>
  );
};

export default AccountPage;