import './popup.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';


export const Popup = ({ isOpen, onClose, postId, onDelete}) => {
    // Создаем состояние для хранения видимости окна
    const [visible, setVisible] = useState(isOpen);

    // Обработчик закрытия окна
    const handleCancel = () => {
        setVisible(false);
        // Вызываем переданный колбэк для уведомления родительского компонента
        onClose();
    };

    const handleOk = () => {
        onDelete(postId);
        setVisible(false);
        // Вызываем переданный колбэк для уведомления родительского компонента
        onClose();
    };

    // Если окно не видимо, то ничего не рендерим
    if (!visible) {
        return null;
    }

    

    // Рендерим окно
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal__header">
                    <h2>Delete this post?</h2>
                </div>
                <div className="modal__footer">
                    <button className="modal__ok" onClick={handleOk}>Ok</button>
                    <button className="modal__cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
};
