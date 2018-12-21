import React, { Component } from 'react';
import Topheader from './components/Topheader/Topheader';
import './App.scss'
import Playground from './components/Playground/Playground';

class App extends Component {
  state = {
    posts: [{
      question: "",
      answer: "",
      attempt: 0,
      knewAnswer: undefined
    }]
  }

  componentDidMount() {
    fetch("https://www.reddit.com/r/askouija.json").then((data) => data.json())
      .then((jsonBody) => {
        let posts = jsonBody.data.children;
        posts = posts.filter(post => {
          if (!post.data.link_flair_text) return false;
          if (post.data.link_flair_text.indexOf(":") === -1) return false;
          if (!post.data.link_flair_text.split(":")[1].trim()) return false;
          return true;
        })
        posts.shift(); //remove mod post. The answer is too easy.
        const mappedPosts = posts.map(post => (
          {
            question: post.data.title,
            answer: post.data.link_flair_text.split(":")[1].trim().toLowerCase(),
            knewAnswer: null,
            attempt: 0
          })
        )
        this.setState(() => ({ posts: this.shufflePosts(mappedPosts) }))
      })

      .catch((err) => {
        console.log(err)
      })
  }

  shufflePosts(posts) {
    return posts.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
  }

  render() {
    return (
      <div className="App">
        <Topheader />
        <section>
          <div className="container">
            <div className="column is-half is-offset-one-quarter">
              {/* <a class="button is-primary is-inverted is-large center">START</a> */}
              <Playground posts={this.state.posts}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
