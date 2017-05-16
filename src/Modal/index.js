import React from 'react';
import './style.css';

export default class Modal extends React.Component {
    render () {
        const props = this.props;
        const { active } = props;
        return <div className={`cronyx-modal ${active ? 'active' : ''}`}>
            <div className="cronyx-modal-background"></div>
            <div className="cronyx-modal-window">
                <div className="cronyx-modal-title">{props.title}</div>
                <div className="cronyx-modal-subtitle">{props.subtitle}</div>
                <div className="cronyx-modal-content">
                    {props.children}
                </div>
                <div className="cronyx-modal-footer">
                    {props.buttons.map((btn, i) => {
                        return <div key={i} className="cronyx-modal-button"
                                onClick={btn.onClick}
                                data-primary={btn.primary}>
                            {btn.text}
                        </div>;
                    })}
                </div>
            </div>
        </div>
    }
}
