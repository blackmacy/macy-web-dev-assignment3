import Axios from 'axios';
import React from 'react';
import './editUrl.css';
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

export default class EditUrl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shortUrl: this.getShortUrl(),
            urlCode: this.getUrlCode(),
            longUrl: '',
            displayDeleteMessage: false,
        };
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    onReset() {
        this.setState({
            urlCode: '',
            longUrl: '',
            shortUrl: '',
            urlExisted: false,
        });
    }

    onEdit() {
        Axios.put(
            `http://localhost:3000/api/shorterUrl/${this.state.urlCode}`,
            {
                longUrl: this.state.longUrl,
            }
        ).then(response => {
            console.log(response);
            if (response.data.ok) {
                alert('Successfully edited url destination!');
            }
        });
    }

    onDelete() {
        Axios.delete(
            `http://localhost:3000/api/shorterUrl/${this.state.urlCode}`,
            {
                longUrl: this.state.longUrl,
            }
        )
            .then(() => {
                this.setState({
                    displayDeleteMessage: !this.state.displayDeleteMessage,
                });
            })
            .catch(error => console.log(error));
    }

    getShortUrl() {
        let path = '';
        let pathArray = window.location.pathname.split('/');

        for (let i = 0; i < pathArray.length - 1; i++) {
            path += pathArray[i];
            path += '/';
        }
        return path;
    }

    getUrlCode() {
        let path = '';

        let pathArray = window.location.pathname.split('/');
        path = String(pathArray[pathArray.length - 2]);
        return path;
    }

    showDeleteMessage() {
        if (this.state.displayDeleteMessage === true) {
            alert('Url has been deleted!');
            return <Redirect to="/" />;
        }
    }

    goBack() {
        window.history.back();
    }

    render() {
        return (
            <div id="edit-wrapper">
                <div id="go-back">
                    <Button
                        className="lg"
                        variant="secondary"
                        onClick={() => this.goBack()}>
                        ⬅️ Go Back
                    </Button>
                </div>
                <h1 className="title">Edit URL</h1>
                <h4> Please enter your destination url for short url:</h4>
                <a>{this.state.shortUrl}</a>
                <div>
                    <div>
                        <Container id="url-container">
                            <Form.Control
                                className="input"
                                placeholder="Enter Long URL"
                                value={this.state.longUrl}
                                onChange={e => this.onChange('longUrl', e)}
                            />
                        </Container>
                    </div>
                    <div id="button">
                        <div>
                            <Button
                                onClick={() => this.onEdit()}
                                className="ml-4"
                                variant="info">
                                Edit Url
                            </Button>
                        </div>
                        <div>
                            <Button
                                className="ml-4"
                                variant="warning"
                                onClick={() => this.onReset()}>
                                Reset
                            </Button>
                        </div>
                    </div>
                    <div id="delete">
                        <h4>To delete this url, press here:</h4>
                        <Button
                            onClick={() => this.onDelete()}
                            className="ml-4"
                            variant="danger">
                            Delete
                        </Button>
                        <div>{this.showDeleteMessage()}</div>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
