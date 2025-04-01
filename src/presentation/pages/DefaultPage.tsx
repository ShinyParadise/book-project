import { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BooksNavbar from "../components/BooksNavbar";
import Sidebar from "../components/Sidebar";

interface DefaultPageProps {
  children: ReactNode;
}

const DefaultPageLayout: React.FC<DefaultPageProps> = ({ children }) => {
  return (
    <>
      <BooksNavbar />

      <Container fluid>
        <Row>
          <Col className="no-gutters sidebar" sm={2}>
            <Sidebar />
          </Col>
          <Col className="no-gutters" sm={10}>
            <Container>{children}</Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DefaultPageLayout;
