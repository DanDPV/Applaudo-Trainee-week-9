/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import 'components/ConfirmModal/ConfirmModal.scss';

interface IConfirmModal {
  title: string;
  children: ReactNode;
  confirmText: string;
  open: boolean;
  handleAction(confirmed: boolean): void;
}

const ConfirmModal = ({
  title,
  children,
  confirmText,
  open,
  handleAction,
}: IConfirmModal) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal" />
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            onClick={() => handleAction(false)}
          >
            &times;
          </button>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="modal-btn confirm"
            onClick={() => handleAction(true)}
          >
            {confirmText}
          </button>
          <button
            type="button"
            className="modal-btn"
            onClick={() => handleAction(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById('modal-portal')!,
  );
};

export default ConfirmModal;
