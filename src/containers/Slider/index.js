import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Ajout d'une référence pour gérer le timer //
  const timerRef = useRef(null);

  // Optimisation du tri pour l'ordre d'affichage par date //
  const byDateDesc = useMemo(
    () =>
      data?.focus.sort(
        (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
      ),
    [data]
  );

  // Utilisation de useCallback pour mémoriser nextCard //
  const nextCard = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  }, [byDateDesc]);

  // Fonction pour réinitialiser le timer //
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(nextCard, 5000);
  }, [nextCard]);

  // Ajout de resetTimer au useEffect //
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index, resetTimer]);

  // Fonction pour gérer le changement de radio //
  const handleRadioChange = (newIndex) => {
    setIndex(newIndex);
    resetTimer();
  };

  // Ajout d'une vérification pour l'absence de données //
  if (!byDateDesc || byDateDesc.length === 0) {
    return <div>Aucun événement à afficher</div>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={event.id}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // Ajout d'un écouteur pour les boutons radio //
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
