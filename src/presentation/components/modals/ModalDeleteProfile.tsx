import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IDeleteProfileProps {
  onHide: () => void;
  onDelete: () => void;
  show: boolean;
}

function ModalDeleteProfile({ onHide, onDelete, show }: IDeleteProfileProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить аккаунт</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Обратите внимание, что с удалением аккаунта удалятся все ваши
          произведения и ваше избранное
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Удалить аккаунт
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteProfile;
