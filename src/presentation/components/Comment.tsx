import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "../styles/App.scss";
import ModalReportComment from "./modals/ModalReportComment";
import { sendUserReport } from "../../data/apiService";
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/slices/commentsSlice";
import { DBComment } from "../../models/comment";

interface CommentProps {
  comment: DBComment;
}

const Comment = ({ comment }: CommentProps) => {
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showModal, setShowModal] = useState(false);

  const handleLikeClick = () => {
    const updatedComment = { ...comment, likes: likeCount + 1 };
    dispatch(updateComment(updatedComment));
    setLikeCount(likeCount + 1);
  };

  const handleReportClick = async (text: string) => {
    try {
      //тут всплывающая модалка с подтверждением что пользователь хочет удалить книгу
      await sendUserReport(comment.userId, text);
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className="comment">
      <Card.Body>
        <Card.Title>{comment.user.name}</Card.Title>
        <Card.Text>{comment.content}</Card.Text>
        <Button variant="primary" onClick={handleLikeClick}>
          Лайк <Badge>{likeCount}</Badge>
        </Button>{" "}
        <Button onClick={() => setShowModal(true)} variant="danger">
          Пожаловаться
        </Button>
      </Card.Body>

      <ModalReportComment
        show={showModal}
        onHide={() => setShowModal(false)}
        onReport={handleReportClick}
      />
    </Card>
  );
};

export default Comment;
