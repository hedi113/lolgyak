import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Container } from "react-bootstrap";
import type { Champion } from "../types/Champion";

const EditChampion = () => {
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

  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((response) => setChampion(response.data))
      .catch(() => toast.error("Couldn't load the champion!"));
  });

  const auth = JSON.parse(localStorage.getItem("credentials") ?? "{}");

  const submit = () => {
    if (auth == "{}") {
      return;
    }

    const editedChampion = {
      name: champion.name,
      role: champion.role,
      lane: champion.lane,
      difficulity: champion.difficulity,
      blue_essence: champion.blue_essence,
      damage_type: champion.damage_type,
      images: [champion.images],
      description: champion.description,
    };

    apiClient
      .put(`/champions/${id}`, editedChampion)
      .then(() => toast.success("Successfully edited!"))
      .catch(() => toast.error("Edit failed!"));
  };

  return auth !== "{}" ? (
    <>
      <Container>
        <h3>Name: </h3>
        <input
          type="text"
          onChange={(e) => setChampion({ ...champion, name: e.target.value })}
        />
        <h3>Role: </h3>
        <input
          type="text"
          onChange={(e) => setChampion({ ...champion, role: e.target.value })}
        />
        <h3>Lane: </h3>
        <input
          type="text"
          onChange={(e) => setChampion({ ...champion, lane: e.target.value })}
        />
        <h3>Lane: </h3>
        <input
          type="text"
          onChange={(e) => setChampion({ ...champion, lane: e.target.value })}
        />
        <h3>Difficulity: </h3>
        <input
          type="text"
          onChange={(e) =>
            setChampion({ ...champion, difficulity: Number(e.target.value) })
          }
        />
        <h3>Blue essence: </h3>
        <input
          type="text"
          onChange={(e) =>
            setChampion({ ...champion, blue_essence: Number(e.target.value) })
          }
        />
        <h3>Damage type: </h3>
        <input
          type="text"
          onChange={(e) =>
            setChampion({ ...champion, damage_type: e.target.value })
          }
        />
        <h3>Image url: </h3>
        <input
          type="text"
          onChange={(e) =>
            setChampion({ ...champion, images: [e.target.value] })
          }
        />
        <h3>Description: </h3>
        <input
          type="text"
          onChange={(e) =>
            setChampion({ ...champion, description: e.target.value })
          }
        />

        <Button onClick={submit}>Submit</Button>
      </Container>
    </>
  ) : (
    <h1>Log in first!</h1>
  );
};

export default EditChampion;
