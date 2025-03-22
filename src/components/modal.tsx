import './modal.css'

type MyModalProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const MyModal: React.FC<MyModalProps> = ({ isOpened, setIsOpened, children, className }) => {
  return (
    <div className="modal-container">
      {isOpened && (
        <div className="modal-overlay" onClick={() => setIsOpened(false)}>
          <div className={className ?? "modal"} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};