import {DialogTrigger, Modal, ModalOverlay} from 'react-aria-components';
import './modal.css'

type MyModal = {
  isOpened: boolean;
  children: React.ReactNode;
}

export const MyModal: React.FC<MyModal> = ({ isOpened, children }) => {
  return(
    <div className='modal-container'>
      <DialogTrigger isOpen={isOpened}>
        <ModalOverlay className='modal-overlay'>
          <Modal className='modal'>
            {children}
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  )
}