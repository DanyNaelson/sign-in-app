import React from 'react'
import { Form } from 'rsuite';
import 'rsuite/Form/styles/index.less';
import './index.less';

const TextField = ({ name, label, accepter, tooltipComp, ...rest }) => (
    <Form.Group controlId={name}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <div className='form-control-container'>
            <Form.Control name={name} accepter={accepter} {...rest} />
            {tooltipComp && <Form.HelpText tooltip>{tooltipComp}</Form.HelpText>}
        </div>
    </Form.Group>
);

export default TextField