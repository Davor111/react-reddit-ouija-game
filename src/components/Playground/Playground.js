import React from 'react';
import AnswerBox from '../AnswerBox/AnswerBox';

class Playground extends React.Component {

    state = {
        hintResult: "",
        hint: "",
        attempts: 0,
        questionCount: 0
    }

    submitAnswer = (submittedAnswer) => {
        const answeredPost = this.props.posts.filter((post) => post.question === submittedAnswer.question);
        const hint = answeredPost[0].answer.split('')
            .map((letter, index) => (Math.random() < 0.4 || (index === 0) ? letter : '_'))
            .join('');
        console.log(answeredPost[0]);
        console.log("ANSWER", submittedAnswer);
        console.log(hint)
        if (answeredPost[0].answer === submittedAnswer.answer) {
            this.setState((prevState) => ({ hintResult: "You got it!", attempts: 0, questionCount: prevState.questionCount + 1 }))
        } else {
            this.setState((prevState) => ({ hintResult: "Nope!", attempts: prevState.attempts + 1, hint }))
        }
    }

    render() {
        return (
            <section className="section">
                <div className="columns">
                    <div className="column is-three-quarters">
                        <div className="box is-large">
                            <AnswerBox
                                submitAnswer={this.submitAnswer}
                                question={this.props.posts[this.state.questionCount].question} />
                            <React.Fragment>
                                <p className="is-size-6">Attempts: {this.state.attempts}</p>
                                {this.state.attempts > 0 ? <p className="is-size-6">Hint: {this.state.hint}</p> : ''}
                                <p className="is-size-2">{this.state.hintResult}</p>
                            </React.Fragment>
                        </div>
                    </div>
                    {/* <div hidden className="column">
                        <div className="box">
                            <p className="is-size-3" >Score</p>

                        </div>
                    </div> */}
                </div>
            </section>
        )
    }
}

export default Playground; 