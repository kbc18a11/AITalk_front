import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/speechBubble.css';

export default class SpeechBubble extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //表示する内容
            text: this.props.text
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.text });
    }

    render() {
        return (
            <Container>
                <Row className="speechBubble .d-none .d-sm-block">
                    <h1>{this.state.text}</h1>
                </Row>
            </Container>

        )
    }
}
