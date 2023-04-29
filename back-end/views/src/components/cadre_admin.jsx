import React, { useState } from "react";
import { Offcanvas, Modal, Card, Button } from "react-bootstrap";
import "../styles/button.css";
import "../styles/button-red.css";
import axios from "axios";
import FormComponent from "./Form";
function Cadre(props) {
  const [showModal, setShowModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/admin/${id}`);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
    // la suppression se fait ici
    setShowModal(false);
  };
  const handleClickModifier = (id) => {
    setShowOffcanvas(true);
    //fetchData(id);
  };
  return (
    <>
      <Card
        className="mx-1 mx-md-3 mx-lg-5 flex-fill"
        style={{
          width: "18rem",
          marginBottom: "30px",
          maxWidth: "400px",
          minWidth: "200px",
        }}
      >
        <Card.Img
          variant="top"
          src="https://mabanque.bnpparibas/rsc/contrib/script/cookielaw/consent/eca11097-be94-4209-912e-825b1c49288d/b3b62f33-0cda-42c9-88b7-620ae7e562a1/logos/static/ot_logo.jpg"
        />
        <Card.Body>
          <Card.Title
            style={{
              height: "100px",
              overflow: "hidden",
            }}
          >
            {props.value.Nom_banque}
          </Card.Title>
          <Card.Text style={{ height: "70px", overflow: "hidden" }}>
            {props.value.Siege_social}
          </Card.Text>
          <Card.Text>Telephone: {props.value.Telephone}</Card.Text>
          <Card.Text>Fax: {props.value.Fax}</Card.Text>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="myButtonVariant"
              style={{ width: "46%" }}
              onClick={() => {
                handleClickModifier(props.Banque_id);
              }}
            >
              Modifier
            </Button>
            <Button
              variant="myRedVariant"
              style={{ width: "46%" }}
              onClick={() => setShowModal(true)}
            >
              Supprimer
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de bien vouloir supprimer {props.value.Nom_banque}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button
            variant="myRedVariant"
            onClick={() => {
              handleDelete(props.value.Banque_id);
            }}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas
        show={showOffcanvas}
        onHide={() => {
          setShowOffcanvas(false);
        }}
        placement="bottom"
        style={{ height: "95%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ textAlign: "center", width: "100%" }}>
            {props.Nom_banque}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormComponent />
          <button
            type="submit"
            className="mb-2 m-2 rounded-3 border border-1 d-flex justify-content-center mx-auto"
            style={{
              width: "74.72px",
              height: "36px",
              backgroundColor: "#0027F6",
              color: "white",
            }}
            onClick={() => {
              setShowOffcanvas(false);
            }}
          >
            Valider
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cadre;
