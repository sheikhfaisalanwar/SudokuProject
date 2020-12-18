import { Modal, Button } from "react-bootstrap";
import React from 'react';

class NewPuzzle extends React.Component {
    render() {
        return (
            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NewPuzzle;