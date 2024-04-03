import React from 'react'
import styles from "../../styles/common.scss";
import { Container } from '@mui/material';
const NotFoundPage = () => {
  return (
    <div className={styles.PanelContainerStyle}>
    <Container  maxWidth="lg">
      <h1 style={{textAlign: "center"}} >404 - This page could not be found.</h1>
    </Container>
    </div>
  )
}

export default NotFoundPage;