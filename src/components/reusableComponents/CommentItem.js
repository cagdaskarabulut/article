"use client";
import { Divider } from "@mui/material";
import { format } from "date-fns";
const CommentItem = ({ comment }) => {
  return (
    <>
        <br />
        <b>{comment?.user_email}</b>
        <span> - </span>
        <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          {format(comment?.create_date, "dd/MM/yyyy hh:mm")}
        </span>
        <p dangerouslySetInnerHTML={{ __html: comment?.comment }}></p>
      <Divider />
    </>
  );
};

export default CommentItem;
