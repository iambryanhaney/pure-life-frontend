import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function NewPost(props) {
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        fetch(props.url, {
            method: "POST",
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

                if (json.post) {
                    setTitle('')
                    setContent('')
                    setShow(false)
                    props.addNewPost(json.post)
                } else {
                    alert("Oops, something went wrong! Check that the 'Title' and 'Content' have text and try again!")
                }
            })
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
            <Button variant="primary" onClick={handleShow}>
                Create New Post
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="New Post Title" name="title" value={title} onChange={onChange} />

                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows="3" name="content" value={content} onChange={onChange} />

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            {
                                title.length > 0 && content.length > 0 ?
                                    <Button type="submit" variant="primary">Save Post</Button>
                                    :
                                    null
                            }
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )

}
