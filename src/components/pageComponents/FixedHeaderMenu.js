// "use client";
// import React, { useState, useEffect } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
// } from "@mui/material";
// import Image from "next/image";
// import styles from "./FixedHeaderMenu.module.scss";

// const FixedHeaderMenu = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   let iconHref = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/logo.png`;

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const menuItems = (
//     <List>
//       <ListItem button component="a" href="#">
//         <ListItemText primary="Anasayfa" />
//       </ListItem>
//       <ListItem button component="a" href="e-sinav-deneme">
//         <ListItemText primary="E-Sınav Deneme" />
//       </ListItem>
//       <ListItem button component="a" href="#">
//         <ListItemText primary="Hakkımızda" />
//       </ListItem>
//       <ListItem button component="a" href="#">
//         <ListItemText primary="Ekibimiz" />
//       </ListItem>
//       <ListItem button component="a" href="#">
//         <ListItemText primary="Galeri" />
//       </ListItem>
//       <ListItem button component="a" href="#">
//         <ListItemText primary="İletişim" />
//       </ListItem>
//     </List>
//   );

//   return (
//     <header className={styles.header}>
//       <nav className={styles.nav}>
//         <div className={styles.logoContainer}>
//           <a href="/">
//             <Image src={iconHref} alt="Logo" width={40} height={40} />
//           </a>
//         </div>
//         {!isMobile && (
//           <ul className={styles.navList}>
//             <li className={styles.navItem}>
//               <a href="#" className={styles.navLink}>
//                 Anasayfa
//               </a>
//             </li>
//             <li className={styles.navItem}>
//               <a href="e-sinav-deneme" className={styles.navLink}>
//                 E-Sınav Deneme
//               </a>
//             </li>
//             <li className={styles.navItem}>
//               <a href="#" className={styles.navLink}>
//                 Hakkımızda
//               </a>
//             </li>
//             <li className={styles.navItem}>
//               <a href="#" className={styles.navLink}>
//                 Ekibimiz
//               </a>
//             </li>
//             <li className={styles.navItem}>
//               <a href="#" className={styles.navLink}>
//                 Galeri
//               </a>
//             </li>
//             <li className={styles.navItem}>
//               <a href="#" className={styles.navLink}>
//                 İletişim
//               </a>
//             </li>
//           </ul>
//         )}
//         {isMobile && (
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleDrawer(true)}
//             className={styles.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}
//       </nav>

//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         classes={{ paper: styles.drawer }} // Applying the custom drawer class
//       >
//         <Box
//           sx={{ width: 250 }}
//           role="presentation"
//           onClick={toggleDrawer(false)}
//           onKeyDown={toggleDrawer(false)}
//           className={styles.drawer}
//         >
//           {menuItems}
//         </Box>
//       </Drawer>
//     </header>
//   );
// };

// export default FixedHeaderMenu;

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
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import styles from "./FixedHeaderMenu.module.scss";

const FixedHeaderMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true); // Loading durumunu yönetmek için useState ekleyin
  let iconHref = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/logo.png`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Sayfa tamamen yüklendiğinde loading durumunu false yapın
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 saniye sonra loading tamamlanmış olacak

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <List>
      <ListItem button component="a" href="#">
        <ListItemText primary="Anasayfa" />
      </ListItem>
      <ListItem button component="a" href="e-sinav-deneme">
        <ListItemText primary="E-Sınav Deneme" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="Hakkımızda" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="Ekibimiz" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="Galeri" />
      </ListItem>
      <ListItem button component="a" href="#">
        <ListItemText primary="İletişim" />
      </ListItem>
    </List>
  );

  if (loading) {
    return (
      // <div className={styles.loadingContainer}>
      //   <CircularProgress color="inherit" />
      // </div>
      <></>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <a href="/">
            <Image src={iconHref} alt="Logo" width={40} height={40} />
          </a>
        </div>
        {!isMobile && (
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Anasayfa
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="e-sinav-deneme" className={styles.navLink}>
                E-Sınav Deneme
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Hakkımızda
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Ekibimiz
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Galeri
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                İletişim
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
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
      </nav>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: styles.drawer }} // Applying the custom drawer class
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className={styles.drawer}
        >
          {menuItems}
        </Box>
      </Drawer>
    </header>
  );
};

export default FixedHeaderMenu;
