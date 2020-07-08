import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function EditPost(props) {
    const [title, setTitle] = useState(props.post.title)
    const [content, setContent] = useState(props.post.content)
    const handleSubmit = e => {
        e.preventDefault()
        fetch(`${props.url}/${props.post.id}`, {
            method: "PUT",
            headers: {
                'Authorization': window.localStorage.auth_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title, content
            })
        })
            .then(res => res.json())
            .then(json => {
                setTitle('')
                setContent('')
                props.toggleEditShow()
                props.updatePost(json.post)
            })
    }
    const onChange = (e) => {
        switch (e.target.name) {
            case "title":
                setTitle(e.target.value)
                break;
            case "content":
                setContent(e.target.value)
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <Modal show={props.show} onHide={props.toggleEditShow} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="New Post Title" name="title" value={title} onChange={onChange} />

                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows="3" name="content" value={content} onChange={onChange} />

                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.toggleEditShow}>Close</Button>
                            <Button type="submit" variant="primary">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
