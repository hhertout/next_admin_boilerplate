import React from 'react';
import LoginForm from "@/components/LoginForm";
import Container from "@/components/ui/container";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import NextIcon from "@/components/icons/NextIcon";
import {getLocale} from "@/lib/i18n";
import {Locale} from "../../../i18n.config";

const Login = async ({params}: { params: { lang: Locale } }) => {
  const $t = await getLocale(params.lang)

  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <Container type={"lg"}>
        <Card className={"w-96 bg-gray-50"}>
          <CardHeader>
            <div className={"flex justify-center mb-6"}>
              <NextIcon size={70}/>
            </div>
            <CardTitle className={"font-extrabold text-xl dark:text-black"}>
              {$t.login.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm $t={$t}/>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;

