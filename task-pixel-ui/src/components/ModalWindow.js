import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default class ModalWindow extends React.Component{
  render(){
    return (
        <Modal show={this.props.stateShow} onHide={this.props.hide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title className="pl-3">{this.props.modalInfo.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="p-3">
            {this.props.modalInfo.modalBody}
          </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="col-sm-6">
              <div>Created: <span className="text-primary">{this.props.modalInfo.modalCreateDate}</span></div>
            </div>
            <div className="col-sm-6">
              <div>Updated: <span className="text-primary">{this.props.modalInfo.modalUpdateDate}</span></div>
            </div>
          </Modal.Footer>
        </Modal>
    );
  }
}
