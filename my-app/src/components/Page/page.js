import React from 'react';
import {Button} from '../Button/button';

export class Page extends React.Component {
    render() {
        return (
            <div className="my-class">
                <div>Page</div>
                {this.props.children ? this.props.children : <Button/>}
            </div>
        )
    }
}
