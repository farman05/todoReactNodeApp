import React from 'react';
import { Modal,Button } from 'react-bootstrap';

export default function Dialog(props) {
    const { ...rest } = props;
    return (
        <div>
            <Modal
                centered
                {...rest}
                >
                <Modal.Header  closeButton={props.closeButton == false ? false : true}>
                    <Modal.Title>
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                {props.children &&
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                }
                <Modal.Footer>
                    {props.footer}
                </Modal.Footer>
            </Modal>
        </div>
    );
}
