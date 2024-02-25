"use client";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { wait } from "../../utils/CommonUtils";
import { Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyGrid from "../toolComponents/MyGrid";
import { Permanent_Marker } from "next/font/google";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header({ middleContent }) {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    setIsAuthChecked(false);
    fetch("/api/whoAmI/session")
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setUserName(data?.name?.user?.name);
        setUserEmail(data?.name?.user?.userEmail);
        setUserImage(data?.name?.user?.userImage);
        setIsAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
      setIsShowSearchBox(true);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
      setIsShowSearchBox(!(innerWidth < MOBILE_SCREEN_SIZE));
    }
  }, [innerWidth]);

  async function selectAction(event, newValue) {
    setIsLoading(true);
    let selectedSkin = null;
    pageList?.map((option) =>
      option.searchField?.toLowerCase() == newValue?.toLowerCase()
        ? (selectedSkin = option)
        : ""
    );
    if (selectedSkin !== null) {
      router.push("/" + selectedSkin.newPageUrl);
    }
    await wait(200);
    setIsLoading(false);
  }

  function goHomePage() {
    router.push("/");
  }

  return (
    <div className={styles.PanelContainerStyle}>
      <Container className={styles.header}>
        <MyGrid
          forHeader={true}
          leftContent={
            <>
              <h1 className={styles.LogoStyle} style={{ marginTop: "5px" }}>
                <Image
                  src={"/images/logo.png"}
                  width={isMobile ? 48 : 64}
                  height={isMobile ? 48 : 64}
                  onClick={() => goHomePage()}
                  alt="newszipped-logo"
                />
              </h1>
            </>
          }
          middleContent={
            <div style={{ height: "35px", marginTop: "15px" }}>
              {middleContent}
            </div>
          }
          rightContent={isAuthChecked ? 
            <>
              <div className={styles.SearchBoxStyle}>
                {userName && (
                  <div style={{ fontWeight: "400"}}>
                  <span >{userName}</span>
                  <br />
                    {/* <button onClick={() => signOut()}>Sign out</button> */}
                    <Button style={{float:"right", marginTop:"10px"}} variant="contained" color="primary" onClick={() => signOut()}>Sign out</Button>

                  </div>
                )}
                {!userName && (
                  <>
                    <Button variant="contained" color="success" onClick={() => signIn()}>Sign in</Button>
                  </>
                )}
              </div>
            </>
            : 
            <></>
          }
        />

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  );
}
