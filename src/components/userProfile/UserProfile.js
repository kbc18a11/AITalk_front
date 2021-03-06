import React, { Component } from 'react'
import { Jumbotron, Media } from 'react-bootstrap';
import axios from 'axios';
import { _APIURL } from '../../apiURL/AITalk_outApiCall_and_Auth';
import { _S3URL } from '../../apiURL/s3';
import '../../css/inputImage.css';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.user_id,
            name: '',
            icon: null
        }
    }

    /**
     * ユーザー情報をセット
     */
    async setUserData() {
        //ユーザー情報を取得
        const userData = await (await axios(_APIURL + `/user/${this.state.id}`)).data;

        //ユーザーの名前をセット
        this.setState({ name: userData.name });
        //ユーザーアイコンのURLをセット
        this.setState({ icon: userData.icon });

    }

    componentDidMount() {
        //ユーザー情報を取得
        this.setUserData();
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Media>
                        <img
                            width={64} height={64}
                            className="imageFile"
                            src={_S3URL + this.state.icon}
                            alt="Generic placeholder" />
                        <Media.Body className="text-left">
                            <h3>{this.state.name}さんのAIモデル一覧</h3>
                        </Media.Body>
                    </Media>
                </Jumbotron>
            </div>
        )
    }
}
