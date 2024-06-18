"use client";
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CategoryMenu.module.scss";
import useLanguages from "../../hooks/useLanguages";

const CategoryMenu = ({ activePageName }) => {
  const LABELS = useLanguages();
  const router = useRouter();
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    fetch(`/api/topic/menu_list`)
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data?.list?.rows);
      });
  }, []);

  const isActiveMenu = (objectName) => {
    if (
      activePageName === "" &&
      (objectName === "All" || objectName === "Hepsi")
    ) {
      return true;
    } else if (activePageName === objectName) {
      return true;
    } else {
      return false;
    }
  };

  const goPage = (objectName) => {
    if (objectName === "All" || objectName === "Hepsi") {
      router.push("/");
    } else {
      router.push("/?search=" + objectName);
    }
  };

  return (
    <>
      <List className={styles.ListContainerStyle}>
        <ListItem key={"All"} disablePadding style={{ maxWidth: "100%" }}>
          <ListItemButton
            style={{ maxWidth: "100%" }}
            className={`${styles.menuItem} ${
              isActiveMenu(LABELS.ALL) ? styles.active : ""
            }`}
            onClick={() => goPage(LABELS.ALL)}
          >
            <ListItemText primary={LABELS.ALL} />
          </ListItemButton>
        </ListItem>

        {menuList?.map((object, index) => (
          <ListItem key={object.id} disablePadding style={{ maxWidth: "100%" }}>
            <ListItemButton
              style={{ maxWidth: "100%" }}
              className={`${styles.menuItem} ${
                isActiveMenu(object.name) ? styles.active : ""
              }`}
              onClick={() => goPage(object.name)}
            >
              {object?.image && (
                <ListItemIcon>
                  <Image
                    src={object?.image}
                    alt={"img_" + object?.image}
                    objectFit="contain"
                    width={32}
                    height={32}
                  />
                </ListItemIcon>
              )}
              <ListItemText primary={object.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CategoryMenu;
