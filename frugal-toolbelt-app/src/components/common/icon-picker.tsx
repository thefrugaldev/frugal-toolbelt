import React, { useEffect, useState } from "react";
import { library, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Styles
// import "./icon-picker.scss";

interface Props {
  onIconSelection: (icon: IconProp) => void;
}

const IconPicker: React.FC<Props> = ({ onIconSelection }) => {
  const [iconNames, setIconNames] = useState([]);
  const [iconPack, setIconPack] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    console.log(iconNames);
  }, []);

  useEffect(() => {
    console.log("rendering icon picker component");

    library.add(fas);
    setIconPack(Object.values(fas));
  }, []);

  useEffect(() => {
    console.log("icon pack changed: ", iconPack);

    iconPack.forEach((icon) => {
      setIconNames((prevNames) => [...prevNames, icon.iconName]);
    });
  }, [iconPack]);

  return (
    <>
      <button
        className="button is-primary"
        data-target="icon-modal"
        aria-haspopup="true"
        onClick={(): void => setActiveModal(true)}
      >
        Icon
      </button>
      <div
        className={`modal ${activeModal ? "is-active" : ""}`}
        id="icon-modal"
      >
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head">
            <p className="modal-card-title">Select an Icon</p>
            <button
              className="delete"
              onClick={(): void => setActiveModal(false)}
              aria-label="close"
            ></button>
          </div>
          <div className="modal-card-body">
            {iconNames.map((icon) => {
              return (
                <span
                  className="icon has-text-info is-large"
                  key={icon}
                  onClick={(): void => {
                    onIconSelection(icon);
                    setActiveModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </span>
              );
            })}
          </div>
        </div>
        <button
          className="modal-close is-large"
          onClick={(): void => setActiveModal(false)}
          aria-label="close"
        ></button>
      </div>
    </>
  );
};

export default IconPicker;
