import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IDeleteChapterProps {
  onHide: () => void;
  onDelete: () => void;
  show: boolean;
}

function ModalDeleteChapter({ onHide, onDelete, show }: IDeleteChapterProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить главу</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Вы уверены что хотите безвозвратно удалить главу из книги?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Удалить главу
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteChapter;
