"use client";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingFullPage from "../reusableComponents/LoadingFullPage";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
  Tooltip,
  IconButton,
  Container,
  Backdrop,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import MyGrid from "../toolComponents/MyGrid";
import { Permanent_Marker } from "next/font/google";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import SearchBar from "../reusableComponents/SearchBar";
import LoginIcon from "@mui/icons-material/Login";

export default function Header({isMainPage}) {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [session, setSession] = useState("");
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(false);
  let iconHref = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/logo.png`;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const SkeletonHeader = () => {
    return (
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <MyGrid
          forHeader={true}
          leftContent={
            <Skeleton
              animation="wave"
              variant="rounded"
              width={isMobile ? 48 : 64}
              height={isMobile ? 48 : 64}
              style={{ marginTop: "-5px" }}
            />
          }
          middleContent={
            <Skeleton
              animation="wave"
              variant="rounded"
              height={35}
              style={{ marginTop: "10px" }}
            />
          }
          rightContent={
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
              style={{
                float: "right",
                marginTop: "5px",
                marginRight: "5px",
              }}
            />
          }
        />
      </div>
    );
  };

  useEffect(() => {
    setIsAuthChecked(false);
    fetch("/api/auth/whoAmI/session")
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setUserName(data?.name?.user?.name);
        setUserEmail(data?.name?.user?.email);
        setUserImage(data?.name?.user?.image);
        setIsAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  const goHomePage = () => {
    setIsLoadingFullPage(true);
    const handler = setTimeout(() => {
      router.push("/");
      setIsLoadingFullPage(false);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  };

  return (
    <>
      <LoadingFullPage isLoading={isLoadingFullPage} />
      <div className={styles.PanelContainerStyle}>
        <Container className={styles.header}>
          {!isAuthChecked && (
            <SkeletonHeader />
          )}

          {isAuthChecked && (
            <MyGrid
              forHeader={true}
              leftContent={
                <>
                  <h1 className={styles.LogoStyle} style={{ marginTop: "5px" }}>
                    <Image
                      src={iconHref}
                      width={isMobile ? 48 : 64}
                      height={isMobile ? 48 : 64}
                      onClick={() => goHomePage()}
                      alt={process.env.PROJECT_SITE_NAME+"-logo"} 
                    />
                  </h1>
                </>
              }
              middleContent={
                <div style={{ height: "35px", marginTop: "15px" }}>
                  <SearchBar setIsLoadingFullPage={setIsLoadingFullPage} />
                </div>
              }
              rightContent={
                <>
                  {/* While loading*/}
                  {!isAuthChecked && (
                    <CircularProgress
                      style={{
                        float: "right",
                        marginTop: "10px",
                        width: "32px",
                        height: "32px",
                      }}
                    />
                  )}

                  {isAuthChecked ? (
                    <>
                      {/* If user logged in */}
                      {userName && (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                              marginTop: "10px",
                              float: "right",
                            }}
                          >
                            <Tooltip title={userEmail}>
                              <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                              >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                  <Image
                                    src={userImage}
                                    width={isMobile ? 48 : 64}
                                    height={isMobile ? 48 : 64}
                                    alt="profile-logo"
                                  />{" "}
                                </Avatar>
                              </IconButton>
                            </Tooltip>

                            <Menu
                              anchorEl={anchorEl}
                              id="account-menu"
                              open={open}
                              onClose={handleClose}
                              onClick={handleClose}
                              PaperProps={{
                                elevation: 0,
                                sx: {
                                  overflow: "visible",
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                  mt: 1.5,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                  },
                                },
                              }}
                              transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                              }}
                            >
                              <MenuItem onClick={handleClose}>
                                {userName}
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={() => signOut()}>
                                {/* <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon> */}
                                Logout
                              </MenuItem>
                            </Menu>
                          </Box>
                        </>
                      )}

                      {/* If user is not logged in */}
                      {!userName && (
                        <>
                          {!isMobile && (
                            <button
                              onClick={() => signIn()} className={styles.blueButtonStyle}
                              style={isMainPage ? {marginRight: '0px'} : {marginRight: '20px'}}
                            >
                              Login
                            </button>
                          )}

                          {isMobile && (
                            <IconButton
                              className={styles.blueButtonStyleSmall}
                              onClick={() => signIn()}
                            >
                              <LoginIcon />
                            </IconButton>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              }
            />
          )}

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </div>
    </>
  );
}
