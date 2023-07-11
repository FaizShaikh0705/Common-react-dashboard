import React, { Component } from 'react';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import './Modal.css';

import Backdrop from './../Backdrop/Backdrop';
import { red } from '@mui/material/colors';

class Modal extends Component {
    
    render() {
      
        return (
            <div>
                <Backdrop />
                <div className="modalbody">
                <Button className="closebutton" onClick = {() => this.props.close(this.props.modalCloseHandler)}>
                    <CancelIcon
                    fontSize="large" 
                    sx={{ color: red[500] }}
                    />
                    </Button>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default Modal;
