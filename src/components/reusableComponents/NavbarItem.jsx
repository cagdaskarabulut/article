'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from "./NavBarItem.module.scss";

export default function NavbarItem({ title, param }) {
  const searchParams = useSearchParams();
  const orderby = searchParams.get('orderby') || 'create_date';
  return (
      <Link
      key={"NavbarItemId_"+param}
      className={
        orderby === param
          ? styles.greenButtonStyle
          : styles.whiteGreenButtonStyle
      }
        href={`/?orderby=${param}`}
      >
        {title}
      </Link>
  );
}
