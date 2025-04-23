import React from "react";
import styles from "./styles/SlidePanel.module.css";

function SlidePanel({ show, onClose, heading, children }) {
  return (
    <>
      <div
        className={`${styles.backdrop} ${show ? styles.show : ""}`}
        onClick={onClose}
      />
      <div className={`${styles["slide-panel"]} ${show ? styles.show : ""}`}>
        <div className={styles["slide-panel-inner"]}>
          <button className={styles["close-button"]} onClick={onClose}>×</button>
          <h2 className={styles.heading}>{heading}</h2>
          {children}
        </div>
      </div>
    </>
  );
}

export default SlidePanel;