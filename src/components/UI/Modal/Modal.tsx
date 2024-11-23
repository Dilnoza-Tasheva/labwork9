import * as React from 'react';
import Backdrop from '../Backdrop/Backdrop.tsx';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string;
  closeModal: () => void;
  defaultModalButton?: boolean;
}


const Modal: React.FC<Props> = ({show, title = 'Modal window title', children, closeModal, defaultModalButton}) => {
  return (
    <>
      <Backdrop show={show} onClick={closeModal}/>
      <div className="modal show" style={{
        display: show ? 'block' : 'none',
        width: "500px",
        position: 'fixed',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                className="btn-close btn-sm"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="p-2">
              {children}
            </div>
            <div className="modal-footer">
              {defaultModalButton ?
                <button onClick={closeModal} className="btn btn-primary" type="button">Close</button> : null}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Modal;