import React, { Component } from 'react';
import './Chat.css';
import io from "socket.io-client";


class Chat extends Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
            message:'',
            messages:[]
        };
        this.socket = io('localhost:8085');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({ message: '' });
        }

    }
    render() {
        return (
            <div className="Chat-container">
                <div className="Chat-header">
                    <h1>Chat App</h1>
                </div>
                <div className="messages">
                    {this.state.messages.map(message => {
                        return (
                            <div>{message.author}: {message.message}</div>
                        )
                    })}
                </div>
                <div className="Chat-footer">
                    <input type="text" placeholder="Username" className="form uname" 
                    value={this.state.username} 
                    onChange={event=>this.setState({username:event.target.value})}/>
                    <input type="text" placeholder="Type message" className="form text"
                    value={this.state.message} 
                    onChange={event=>this.setState({message:event.target.value})}/>
                    <button onClick={this.sendMessage} className="form send "><i class="fas fa-check"></i></button>


                </div>

            </div>
        );
    }
}

export default Chat;
