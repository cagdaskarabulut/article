"use client";
import { Divider } from "@mui/material";
import { format } from "date-fns";
const CommentItem = ({ comment, isMobile }) => {
  return (
    <>
        <br />
        <b>{comment?.user_name}</b>
        {isMobile ? (<br />) : (<span> - </span>)}
        <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          {format(comment?.create_date, "dd/MM/yyyy hh:mm")}
        </span>
        <p dangerouslySetInnerHTML={{ __html: comment?.comment }}></p>
      <Divider />
    </>
  );
};

export default CommentItem;
