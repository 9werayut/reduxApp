import React, {Component} from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks} from '../../actions/bookActions';

class BooksForm extends Component {

  handleSubmit() {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBooks(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    
    this.props.deleteBooks(bookId);
  }

  render() {

    const bookList = this.props.books.map(function(booksArr) {
      return (
        <option key={booksArr._id}> {booksArr._id}</option>
      )
    })

    return(
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title">
            </FormControl>
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Description"
              ref="description">
            </FormControl>
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Price"
              ref="price">
            </FormControl>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>Save book</Button>
        </Panel>
        <Panel style={{marginTop: '25px'}}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a book id to delete</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
              <option value="select">select</option>
              {bookList}
            </FormControl>
          </FormGroup>
          <Button onClick={() => this.onDelete()} bsStyle="danger">Delete book</Button>
        </Panel>
      </Well>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.books.books
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    postBooks,
    deleteBooks
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
