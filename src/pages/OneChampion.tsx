import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient, { BASE_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col } from "react-bootstrap";
import type { Champion } from "../types/Champion";

const OneChampion = () => {
  const [champion, setChampion] = useState<Champion>({
    name: "",
    role: "",
    lane: "",
    difficulity: 1,
    blue_essence: 1,
    damage_type: "",
    images: [],
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((response) => setChampion(response.data))
      .catch(() => toast.error("Couldn't load the champion!"));
  });

  const isLogged = () => localStorage.getItem("credentials") !== null;

  const deleteChampion = () => {
    apiClient
      .delete(`/champions/${id}`)
      .then(() => toast.success("Champion successfully deleted!"))
      .catch(() => toast.error("Couldn't delete champion!"));
  };

  return isLogged() ? (
    <>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Carousel>
            {champion.images.map((i) => (
              <Carousel.Item>
                <img src={`${BASE_URL}/images/${i}`} width={300} height={200} />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>{champion.name}</Card.Title>
            <Card.Text>
              {champion.description}
              <br />
              {champion.role}
              <br />
              {champion.lane}
              <br />
              {champion.blue_essence}
              <br />
              {champion.damage_type}
              <br />
              {champion.difficulity}
              <br />
            </Card.Text>
            <Button
              onClick={() => navigate("/edit-champion")}
              variant="warning"
            >
              Edit
            </Button>
            <Button onClick={deleteChampion} variant="danger">
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  ) : (
    <h1>Log in first!</h1>
  );
};

export default OneChampion;
