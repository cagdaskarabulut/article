"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/mainComponents/Header";
import FooterPanel from "../../../components/mainComponents/FooterPanel";
import NavbarAdminPanel from "../../../components/reusableComponents/NavbarAdminPanel";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import styles from "../AdminPanel.module.scss";
import LoadingFullPage from "../../../components/reusableComponents/LoadingFullPage";
import MyAlert from "../../../components/reusableComponents/MyAlert";
import TopicList from "../../../components/TopicList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useLanguages from "../../../hooks/useLanguages";
import { useRouter } from "next/navigation";
import { isEmailInList } from "../../../utils/ListUtils";

const AdminPanel = () => {
  const router = useRouter();
  const [isSuperAuthorizedUser, setIsSuperAuthorizedUser] = useState(false);

  const LABELS = useLanguages();
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [topicListInfo, setTopicListInfo] = useState("");
  const [isRefreshingTopicList, setIsRefreshingTopicList] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  useEffect(() => {
    fetch("/api/auth/whoAmI/email")
      .then((res) => res.json())
      .then((data) => {
        if (
          isEmailInList(data.email, process.env.NEXT_PUBLIC_SUPER_ADMIN_USER)
        ) {
          setIsSuperAuthorizedUser(true);
          setIsAuthorizedUser(true);
        } else if (
          isEmailInList(data.email, process.env.NEXT_PUBLIC_ADMIN_USER)
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

  const handleClose = () => {
    setOpenDialog(false);
  };

  const AddTopicAction = async () => {
    setIsLoading(true);
    if (!newTopicName) {
      setShowError(true);
      setErrorMessage("Title is required");
      return;
    }
    try {
      fetch("/api/topic/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTopicName,
        }),
      }).then((res) => res.json());
      setNewTopicName("");
      setIsRefreshingTopicList(true);
      setTopicList(null);
      setOpenDialog(false);
      setIsLoading(false);
      setIsMessageOpen(true);
    } catch (error) {
      setErrorMessage("Title is required");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <>
        {isAuthorizedUser && (
          <>
            <LoadingFullPage isLoading={isLoading} />
            <NavbarAdminPanel />
            <Container maxWidth="md">
              <h3 style={{ textAlign: "center" }}>{LABELS.SUBJECT}</h3>
              <Grid item xs={12} sm={12}>
                <Grid item xs={8} sm={4}>
                  <TopicList
                    topicList={topicList}
                    setTopicList={setTopicList}
                    isRefreshingTopicList={isRefreshingTopicList}
                    setIsRefreshingTopicList={setIsRefreshingTopicList}
                  />
                  <>
                    <br />
                    <span>{topicListInfo}</span>
                  </>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Button
                    onClick={() => setOpenDialog(true)}
                    variant="contained"
                  >
                    {LABELS.ADD_NEW_TAG}
                  </Button>
                </Grid>
              </Grid>
            </Container>

            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <h3 style={{ textAlign: "center" }}>{LABELS.CREATE_TOPIC}</h3>
                <div style={{ width: "400px" }}>
                  <div style={{ width: "90%", float: "left" }}>
                    <TextField
                      className={styles.TextFieldStyle}
                      label={LABELS.ENTER_NEW_TOPIC_NAME}
                      value={newTopicName}
                      onChange={(event) => setNewTopicName(event.target.value)}
                    />
                  </div>
                  <div style={{ width: "10%", float: "right" }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => AddTopicAction(true)}
                    >
                      <AddCircleIcon fontSize="inherit" color="success" />
                    </IconButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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
