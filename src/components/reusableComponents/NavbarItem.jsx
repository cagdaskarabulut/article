'use client';

// import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import styles from "./NavBarItem.module.scss";
import LoadingFullPage from "../reusableComponents/LoadingFullPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@mui/material";

export default function NavbarItem({ title, param }) {
  const searchParams = useSearchParams();
  const orderby = searchParams.get('orderby') || 'create_date';
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(false);
  const router = useRouter();

  const goTarget = (param) => {
    setIsLoadingFullPage(true);
    const handler = setTimeout(() => {
      router.push("/?orderby="+param);
      setIsLoadingFullPage(false);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }

  return (
    <>
    <LoadingFullPage isLoading={isLoadingFullPage} />
    
      <Link
      key={"NavbarItemId_"+param}
      className={
        orderby === param
          ? styles.greenButtonStyle
          : styles.whiteGreenButtonStyle
      }
      onClick={() => goTarget(param)}
        // href={`/?orderby=${param}`}
      >
        {title}
      </Link>
      </>
  );
}
