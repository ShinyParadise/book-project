import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IDeleteBookProps {
  onHide: () => void;
  onDelete: () => void;
  show: boolean;
}

function ModalDeleteBook({ onHide, onDelete, show }: IDeleteBookProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить книгу</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Вы уверены что хотите безвозвратно удалить книгу?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Удалить книгу
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteBook;
