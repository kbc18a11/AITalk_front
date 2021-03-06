import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMessageForm from '../../components/talk/MyMessageForm';
import SpeechBubble from '../../components/talk/SpeechBubble';
import TalkingLog from '../../components/talk/TalkingLog';
import AimodelFace from '../../components/talk/AimodelFace';
import '../../css/myMessageForm.css';

export default class Talking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //AIモデルのid
            aimodel_id: props.match.params.id,
            voiceText: '　',//ユーザーとAIのじゃべった内容
            log: { who: '', text: '' }//ログ1行分
        }
    }

    /**
     * MyMessageFormから来たAIのセリフを受け取る
     * @param {*} text 
     */
    setVoice(text) {

        this.setState({ voiceText: text });
    }

    /**
     * MyMessageFormからTalkingLogに送る新しいログを生成する
     * @param {*} inLog 
     */
    setLog(inLog) {
        //console.log(inLog);

        this.setState({ log: { who: inLog.who, text: inLog.text } });
    }

    render() {
        //console.log(this.state.voiceText, this.state.log);

        return (
            <Row>
                <Col md={4}><AimodelFace voiceText={this.state.voiceText} aimodel_id={this.state.aimodel_id} /></Col>
                <Col md={8}>
                    <SpeechBubble text={this.state.voiceText} />
                    <MyMessageForm setVoice={e => this.setVoice(e)} setLog={e => this.setLog(e)} />
                    <TalkingLog log={this.state.log} />
                </Col>
            </Row>
        );
    }
}
