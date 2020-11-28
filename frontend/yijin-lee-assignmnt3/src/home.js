import Axios from 'axios';
import React from 'react';
import './home.css';
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            urlCode: '',
            longUrl: '',
            shortUrl: '',
            urlExisted: false,
        };
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    onSubmit() {
        Axios.post('http://localhost:3000/api/shorterUrl', {
            longUrl: this.state.longUrl,
            urlCode: this.state.urlCode,
        })
            .then(response => {
                if (
                    this.state.urlCode &&
                    response.data.urlCode !== this.state.urlCode
                ) {
                    alert(
                        'Sorry, this url existed in out database so would not be able to use your url ending'
                    );
                }

                if (this.state.urlExisted) {
                    return;
                } else {
                    this.setState({
                        urlCode: response.data.urlCode,
                        longUrl: response.data.longUrl,
                        shortUrl: response.data.shortUrl,
                    });
                }
            })
            .catch(error => {
                if (error.response.data === 'This Ending Code Is Existed') {
                    alert('This Ending Code Is Existed');
                } else if (error.response.data === 'Invalid base url') {
                    alert('Invalid base url');
                } else if (error.response.data === 'Invalid url') {
                    alert('Invalid url');
                }
            })
            .finally(() => {
                this.setState({
                    urlExisted: false,
                });
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

    render() {
        return (
            <div id="wrapper">
                <h1 className="title">URL Shortener</h1>
                <h4> Please enter your url:</h4>
                <div>
                    <div>
                        <Container id="long-url-container">
                            <Form.Control
                                className="input"
                                placeholder="Enter Long URL"
                                value={this.state.longUrl}
                                onChange={e => this.onChange('longUrl', e)}
                            />
                        </Container>
                    </div>
                    <div>
                        <Container id="customized-url-container">
                            <Form.Control
                                className="input"
                                placeholder="OPTIONAL: Enter Your Customized URL Ending"
                                value={this.state.urlCode}
                                onChange={e => this.onChange('urlCode', e)}
                            />
                        </Container>
                        <div className="warning">
                            {this.state.urlExisted
                                ? 'This URL Ending Existed!'
                                : ''}
                        </div>
                    </div>
                    <div id="button">
                        <div>
                            <Button
                                variant="info"
                                onClick={() => this.onSubmit()}>
                                Submit
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
                    {this.state.shortUrl ? (
                        <input type="button" value={this.state.shortUrl} />
                    ) : null}
                    <div></div>
                    {this.state.shortUrl ? (
                        <Link to={`/api/shorterUrl/${this.state.urlCode}/edit`}>
                            Edit
                        </Link>
                    ) : null}
                </div>
            </div>
        );
    }
}
