import './modal.css'

type MyModalProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  children: React.ReactNode;
}

export const MyModal: React.FC<MyModalProps> = ({ isOpened, setIsOpened, children }) => {
  return (
    <div className="modal-container">
      {isOpened && (
        <div className="modal-overlay" onClick={() => setIsOpened(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};