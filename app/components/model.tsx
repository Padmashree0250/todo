interface ModalProps {
  modalOpen: boolean;
  setModelOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModelOpen,children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : " "}`}>
      <div className="modal-box relative">
        <label
          onClick={() => setModelOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          x
        </label>
       {children}
      </div>
    </div>
  );
};
export default Modal;
