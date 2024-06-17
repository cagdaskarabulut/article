"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/mainComponents/Header";
import FooterPanel from "../../../components/mainComponents/FooterPanel";
import NavbarAdminPanel from "../../../pages/components/NavbarAdminPanel";
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
import { isEmailInList } from "../../../utils/ListUtils";

const AdminPanel = () => {
  const router = useRouter();
  const LABELS = useLanguages();
  const [isSuperAuthorizedUser, setIsSuperAuthorizedUser] = useState(false);

  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/whoAmI/email")
      .then((res) => res.json())
      .then((data) => {
        if (
          isEmailInList(
            data.email,
            process.env.PROJECT_SUPER_PROJECT_PROJECT_ADMIN_USER
          )
        ) {
          setIsSuperAuthorizedUser(true);
          setIsAuthorizedUser(true);
        } else if (
          isEmailInList(data.email, process.env.PROJECT_PROJECT_ADMIN_USER)
        ) {
          setIsAuthorizedUser(true);
          setIsSuperAuthorizedUser(false);
        } else {
          setIsAuthorizedUser(false);
          setIsSuperAuthorizedUser(false);
          router.push("/api/auth/signin", { scroll: false });
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
              <h3 style={{ textAlign: "center" }}>{LABELS.DESIGN}</h3>
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
