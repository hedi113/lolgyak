import { useEffect, useState } from "react";
import type { Champion } from "../types/Champion";
import { useNavigate } from "react-router-dom";
import apiClient, { BASE_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import * as Sentry from "@sentry/react";

const AllChampions = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/champions")
      .then((response) => setChampions(response.data))
      .catch((error) => {
        toast.error("Couldn't load champions!");
        Sentry.captureException(error);
      });
  }, []);

  const generateCard = (c: Champion) => {
    return (
      <>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Carousel>
              {c.images.map((i) => (
                <Carousel.Item>
                  <img
                    src={`${BASE_URL}/images/${i}`}
                    width={300}
                    height={200}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title>{c.name}</Card.Title>
              <Card.Text>{c.description}</Card.Text>
              <Button onClick={() => navigate(`/one-champion/${c.id}`)}>
                Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  };

  return (
    <>
      <Container>
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/new-champion")}>Add new</Button>
        <Row xs={"auto"} md={"auto"} className="g-4">
          {champions.map((c) => generateCard(c))}
        </Row>
      </Container>
    </>
  );
};

export default AllChampions;
