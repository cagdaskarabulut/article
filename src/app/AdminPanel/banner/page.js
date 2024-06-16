"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/mainComponents/Header";
import FooterPanel from "../../../components/mainComponents/FooterPanel";
import NavbarAdminPanel from "../../../components/reusableComponents/NavbarAdminPanel";
import {
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import styles from "../AdminPanel.module.scss";
import LoadingFullPage from "../../../components/reusableComponents/LoadingFullPage";
import MyAlert from "../../../components/reusableComponents/MyAlert";
import useLanguages from "../../../hooks/useLanguages";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const router = useRouter();
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const LABELS = useLanguages();

  useEffect(() => {
    fetch("/api/auth/whoAmI/email")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthorizedUser(false);
        if (data.email !== process.env.NEXT_PUBLIC_ADMIN_USER) {
          router.push("/api/auth/signin", { scroll: false });
        } else {
          setIsAuthorizedUser(true);
        }
      });
  }, []);

  return (
    <>
      <Header />
      <>
        {isAuthorizedUser && (
          <>
            <LoadingFullPage isLoading={isLoading} />
            <NavbarAdminPanel />
            <Container maxWidth="md">
              <h3 style={{ textAlign: "center" }}>Banner</h3>
            </Container>
            <MyAlert
              text={LABELS.PAGE_IS_SUCCESFULLY_SAVED}
              isOpen={isMessageOpen}
              setIsOpen={setIsMessageOpen}
            />
          </>
        )}
      </>
    </>
  );
};

export default AdminPanel;
