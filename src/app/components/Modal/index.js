import React from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button';
function Modal({ showModal, children, post }) {
  const modalClass = post ? 'content ModalPost' : 'content';
  return (
    <React.Fragment>
      {showModal ? (
        <>
          <div className="modal" id="modal">
            <div className="ModalMain">
              <div className={modalClass}>{children}</div>
            </div>
          </div>
        </>
      ) : null}
    </React.Fragment>
  );
}

export default Modal;
