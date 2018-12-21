import React from 'react';

class AnswerBox extends React.Component {

    state = {
        answer: ''
    } 

    onSubmit = (event) => {
        event.preventDefault();
        let answer = this.state.answer.toLowerCase()
        if(!answer) return; 
        this.props.submitAnswer({ question: this.props.question, answer })
        this.setState({answer: ''})

    }

    onChange = (e) => {
     this.setState({answer: e.target.value})
    }

    render() {
        return (
            <div className="field">
                <label className="label is-large">{this.props.question}</label>
                <div className="control has-icons-left">
                    <form id="submitAnswer" onSubmit={this.onSubmit}>
                        <input  value= {this.state.answer} 
                                className="input is-large" 
                                placeholder="What's your answer?" 
                                onChange={this.onChange}
                                />
                        <span className="icon is-small is-left">
                            <i className="far fa-question-circle"></i>
                        </span>
                    </form>
                </div>
            </div>
        )
    }
}



    export default AnswerBox; 