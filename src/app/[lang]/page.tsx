import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      This is the home page
      <div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
