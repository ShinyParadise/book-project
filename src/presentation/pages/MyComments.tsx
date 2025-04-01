import { useEffect, useState } from "react";
import Comment from "../components/MyComment";
import DefaultPageLayout from "./DefaultPage";
import { Stack } from "react-bootstrap";
import { getCommentsByUser } from "../../data/apiService";
import { DBComment } from "../../models/comment";

export default function MyComments() {
  const [comments, setComments] = useState<DBComment[]>([]);

  useEffect(() => {
    getCommentsByUser()
      .then((comments: DBComment[]) => setComments(comments))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <DefaultPageLayout>
        <h4 className="mb-2 mt-2">Мои комментарии к книгам:</h4>
        <Stack direction="horizontal">
          {comments.map((comment) => (
            <Comment
              comment={comment}
              onDelete={() =>
                setComments(comments.filter((c) => c._id !== comment._id))
              }
            />
          ))}
        </Stack>
      </DefaultPageLayout>
    </>
  );
}
