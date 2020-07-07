import React from 'react';
import './index.scss';

function Modal({ showModal, children, post, title }) {
  const modalClass = post ? 'content ModalPost' : 'content';
  return (
    <React.Fragment>
      {showModal ? (
        <>
          <div className="modal" id="modal">
            <div className="ModalMain">
              <div className={modalClass}>
                {title ? <h2 className="ModalTitle">{title}</h2> : null}
                {children}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </React.Fragment>
  );
}

export default Modal;
