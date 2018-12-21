import React from 'react';
import AnswerBox from '../AnswerBox/AnswerBox';

class Playground extends React.Component {

    state = {
        hintResult: "",
        attempts: 0,
        questionCount: 0
    }

    submitAnswer = (submittedAnswer) => {
        const answeredPost = this.props.posts.filter((post) => post.question === submittedAnswer.question); 
        console.log(answeredPost[0])
        console.log("ANSWER", submittedAnswer)
        if(answeredPost[0].answer === submittedAnswer.answer) {
            this.setState((prevState) => ({hintResult: "Answered Correctly", attempts: 0, questionCount: prevState.questionCount + 1}) )
        }else{
            this.setState((prevState) => ({hintResult: "Answer is false", attempts: prevState.attempts + 1}))
        }
    } 

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="column is-half">
                        <div className="box is-large">
                         <AnswerBox 
                            submitAnswer={this.submitAnswer} 
                            question= {this.props.posts[this.state.questionCount].question}/>
                            <React.Fragment>
                            <p className="is-size-6">Attempts: {this.state.attempts}</p>
                            <p className="is-size-2">{this.state.hintResult}</p>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Playground; 