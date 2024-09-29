import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    {/* Ajout d'une verification des éléments avant leurs rendus */}
    <div className="EventCard__imageContainer">
      {imageSrc && (
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      )}
      {label && <div className="EventCard__label">{label}</div>}
    </div>
    <div className="EventCard__descriptionContainer">
      {title && <div className="EventCard__title">{title}</div>}
      {date && (
        <div className="EventCard__month">{getMonth(new Date(date))}</div>
      )}
    </div>
  </div>
);

// Modification des PropTypes pour rendre toutes les props optionnelles //
EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,
};

// Ajout de valeurs par défaut pour toutes les props //
EventCard.defaultProps = {
  imageSrc: "",
  imageAlt: "event",
  date: "",
  title: "",
  small: false,
  label: "",
};

export default EventCard;
