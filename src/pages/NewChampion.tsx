import { useState } from "react";
import type { Champion } from "../types/Champion";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const NewChampion = () => {
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

  const isLogged = () => localStorage.getItem("credentials") !== null;

  const submit = () => {
    apiClient
      .post("/new-champion", champion)
      .then(() => toast.success("Successfully added!"))
      .catch(() => toast.error("Couldn't add champion!"));
  };

  return isLogged() ? (
    <>
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
        onChange={(e) => setChampion({ ...champion, images: [e.target.value] })}
      />
      <h3>Description: </h3>
      <input
        type="text"
        onChange={(e) =>
          setChampion({ ...champion, description: e.target.value })
        }
      />

      <Button onClick={submit}>Submit</Button>
    </>
  ) : (
    <h1>Log in in order to add a new chapion!</h1>
  );
};

export default NewChampion;
