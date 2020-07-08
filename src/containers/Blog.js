import React, { Component } from 'react'

import Spinner from 'react-bootstrap/Spinner'

import Post from '../Components/Post'
import NewPost from '../Components/NewPost'
import EditPost from '../Components/EditPost'
const blogURL = 'http://localhost:3001/posts'

export default class Blog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            spinner: true,
            editShow: false,
            post_id: undefined
        }
    }
    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts() {
        fetch(blogURL)
            .then(res => res.json())
            .then(posts => {
                const sortedPosts = [...posts].sort((a, b) => a.id - b.id)

                this.setState({ posts: sortedPosts, spinner: false })
            })
    }

    renderPosts() {
        return this.state.posts.map(post => <Post key={post.id} post={post} is_admin={this.props.is_admin} editPost={this.editPost} deletePost={this.deletePost} />)
    }
    addNewPost = (post) => {
        this.setState({ posts: [...this.state.posts, post] })
    }
    editPost = id => {
        this.setState({ post_id: id, editShow: true })
    }

    toggleEditShow = () => this.setState({ editShow: !this.state.editShow })

    updatePost = post => {
        const posts = [...this.state.posts]
        posts.forEach(p => {
            if (p.id === post.id) {
                p.title = post.title
                p.content = post.content
            }
        })
        this.setState({ posts })
    }

    renderEditPost() {
        if (this.state.editShow) {
            const post = this.state.posts.find(post => post.id === this.state.post_id)
            return <EditPost post={post} toggleEditShow={this.toggleEditShow} show={this.state.editShow} url={blogURL} updatePost={this.updatePost} />
        }
    }

    deletePost = id => {
        fetch(`${blogURL}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': window.localStorage.auth_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                const posts = [...this.state.posts]
                const postIndex = posts.findIndex( post => post.id === id)
                posts.splice(postIndex, 1)
                this.setState({posts})
                
            })
    }

    render() {
        return (
            <div>
                <h1> Blog +Inspire</h1>
                {
                    this.props.is_admin ? <NewPost url={blogURL} addNewPost={this.addNewPost} /> : null
                }
                {this.renderEditPost()}
                {
                    this.state.spinner
                        ?
                        <div style={{ margin: '5px auto', textAlign: 'center' }}><Spinner variant="secondary" animation="border" role="status" /></div>
                        :
                        this.state.posts.length > 0 ?
                            this.renderPosts()
                            :
                            <h3 style={{ textAlign: 'center', color: 'red' }}> NO POSTS YET!</h3>
                }
            </div>
        )
    }
}

