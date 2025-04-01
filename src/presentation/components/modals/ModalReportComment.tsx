import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";

interface ModalReportCommentProps {
  show: boolean;
  onHide: () => void;
  onReport: (text: string) => void;
}

function ModalReportComment({
  show,
  onHide,
  onReport,
}: ModalReportCommentProps) {
  const [reportText, setReportText] = useState("");

  const changeComplaintText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setReportText(e.currentTarget.value);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Пожаловаться на пользователя</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Укажите причину, по которой вы решили пожаловаться на комментарий. Для
          более быстрого рассмотрения жалобы рекомендуется прикрепить отрывок
          комментария, подтверждающий вашу жалобу.
        </p>
        <Form.Group className="mb-2">
          <Form.Label>Текстовый редактор</Form.Label>
          <Form.Control
            name="chapterText"
            value={reportText}
            onChange={changeComplaintText}
            type="text"
            as="textarea"
            rows={3}
            placeholder="Напишите вашу жалобу"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть окно
        </Button>
        <Button variant="primary" onClick={() => onReport(reportText)}>
          Отправить жалобу
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalReportComment;
