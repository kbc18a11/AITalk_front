import React, { Component } from 'react'
import { Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import axios from 'axios';

export default class MyMessageForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //送信するメッセージの内容
            message: '',
            //通信中を表す
            nowConnecting: false
        }

        this.doChangeMessage = this.doChangeMessage.bind(this);
        this.resetMessage = this.resetMessage.bind(this);
        this.doGetAPI = this.doGetAPI.bind(this);
    }

    /**
     * バリデーション
     * 妥当性に問題が無ければ、false
     */
    validation() {
        const errorList = [];//エラーメッセージのリスト

        //送信するメッセージは、空文字列か？
        if (!this.state.message) {
            errorList.push('メッセージがありません。')
        }

        //エラーメッセージは存在するか？
        if (errorList.length > 0) {
            alert(errorList);
            return true;
        }

        return false;
    }


    /**
     * messageの値の変更を受け付ける
     * @param {*} e 
     */
    doChangeMessage(e) {
        this.setState({ message: e.target.value });
    }

    /**
     * messageを空にする
     */
    resetMessage() {
        this.setState({ message: '' });
    }


    /**
     * APIとの通信
     * @param {*} e 
     */
    async doGetAPI(e) {
        //バリデーションの検証
        if (this.validation()) return;

        //通信を開始するため、ボタンを押せなくする
        this.setState({ nowConnecting: true });

        try {
            //NobyAPIとの通信開始
            const responce = await axios.get(_APIURL + '/talkText?text=' + this.state.message);
            //console.log(responce);

            //SpeechBubbleに送るtext
            this.props.setVoice(responce.data.text);

            //TalkingLogに上げる自分の会話のログ
            this.props.setLog({ who: '自分', text: this.state.message });
            //TalkingLogに送るAIの会話のlog
            this.props.setLog({ who: 'AI', text: responce.data.text });
        } catch (error) {
            console.log(error);
            alert('サーバー側でエラーが発生しました。');
            return;
        } finally {
            //通信が終了したため、ボタンを押せるようにする
            this.setState({ nowConnecting: false });
        }
    }


    render() {
        const marginStyle = {
            margin: '1px'
        }

        return (
            <Container className="container">
                <Form>
                    <Row>
                        <Col xs={12} md={6} className="buttons">
                            <FormControl type="text" style={marginStyle} value={this.state.message}
                                placeholder="メッセージを入力してください"
                                className="" onChange={this.doChangeMessage} />
                        </Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="" onClick={this.resetMessage} disabled={this.state.nowConnecting}>リセット</Button></Col>
                        <Col xs={6} md={3}><Button variant="primary" block className="" onClick={this.doGetAPI} disabled={this.state.nowConnecting}>メッセージを送る</Button></Col>
                    </Row>
                </Form>
            </Container>

        )
    }
}
