import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // Ajout d'un state pour gérer les données du formulaire //
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    type: "",
    email: "",
    message: "",
  });

  // Ajout d'une fonction pour les changements dans les champs du formulaire //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        // Vider les champs du formulaire à la soumission //
        setFormData({
          name: "",
          firstName: "",
          type: "",
          email: "",
          message: "",
        });
        // Appeler onSuccess pour afficher le modal //
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          {/* Modification de Field, ajout de value et onChange */}
          <Field
            placeholder=""
            label="Nom"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Field
            placeholder=""
            label="Prénom"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {/* Modification de Select pour les changements de valeur */}
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) =>
              setFormData((prevData) => ({ ...prevData, type: value }))
            }
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
          />
          <Field
            placeholder=""
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
