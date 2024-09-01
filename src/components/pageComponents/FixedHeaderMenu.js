"use client";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import Image from "next/image";

const FixedHeaderMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  let iconHref = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/logo.png`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <List>
      <ListItem button component="a" href="#">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="Services" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="Contact" />
      </ListItem>
    </List>
  );

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.logoContainer}>
          <a href="/">
            <Image src={iconHref} alt="Logo" width={40} height={40} />
          </a>
        </div>
        {!isMobile && (
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <a href="#" style={styles.navLink}>
                Home
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="#" style={styles.navLink}>
                About
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="#" style={styles.navLink}>
                Services
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="#" style={styles.navLink}>
                Contact
              </a>
            </li>
          </ul>
        )}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            style={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
      </nav>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {menuItems}
        </Box>
      </Drawer>
    </header>
  );
};

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Şeffaf arkaplan
    backdropFilter: "blur(10px)", // Arkaplanı bulanıklaştırma
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logoContainer: {
    marginRight: "auto",
  },
  navList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    marginRight: "20px",
  },
  navItem: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
  menuButton: {
    color: "#fff",
    position: "absolute", // İkonu sabit bir noktada tutmak için
    right: "55px", // Sağdan boşluk bırak
    top: "15px", // Üstten boşluk bırak
    zIndex: 1100, // Üstte kalmasını sağlamak için z-index yüksek
  },
};

export default FixedHeaderMenu;
