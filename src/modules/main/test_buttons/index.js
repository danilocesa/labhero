import React from 'react';
import { Button, Icon } from 'antd';

import './style.css';

const iconLoading = {
    display: 'none'
};

class TestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onClickTestButton = () => {
        setTimeout(() => {
            this.setState ({
                loading: true
            });
        });
    }

    onClickHelloButton = () => {
        setTimeout(() => {
            document.getElementById('mybtn').innerHTML = "EXTRACTED";
        }, 2000);
    }

    render() {
        return(
            <div>
                <Button
                    id="button_1"
                    onClick={this.onClickTestButton} 
                    className="test-buttons" 
                    type="primary" 
                    loading={this.state.loading}
                >
                    Button 1
                </Button>

                <Button
                    id="button_2" 
                    onClick={this.onClickTestButton} 
                    className="test-buttons" 
                    type="primary" 
                    loading={this.state.loading}
                >
                    Button 2
                </Button>

                <Button
                    id="button_3" 
                    onClick={this.onClickTestButton} 
                    className="test-buttons" 
                    type="primary" 
                    loading={this.state.loading}
                >
                    Button 3
                </Button>

                <Button
                    id="mybtn"
                    type="primary"
                    onClick={() => {
                        setTimeout(() => {
                            document.getElementById('mybtn').innerHTML = "EXTRACTED";
                        }, 2000);
                    }}
                >   
                    <Icon type="loading" />
                    EXTRACT
                </Button>

            </div>
        );
    }
}

export default TestScreen;