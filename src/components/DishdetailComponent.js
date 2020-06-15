import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
   Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader,
    ModalBody, Label, Col , Row} from 'reactstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
  function RenderDish({dish}) {
            return(
              <div className="col-12 col-md-5 m-1">
                <Card>
                  <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
              </div>
            );

  }

  function  RenderComments({comments, addComment, dishId}) {
      if (comments != null){
          return(
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <ul className="list-unstyled">
                  {comments.map((comment) => {
                      return (
                        <li key={comment.id}>
                          <p>{comment.comment}</p>
                          <p>-- {comment.author} , {Moment(comment.date).format('MMM d, yyyy')}</p>
                        </li>
                      );
                  })}
              </ul>
              <CommentForm dishId={dishId} addComment={addComment} />
            </div>
          );
      }else
          return(
              <div></div>
          );
  }

  class CommentForm extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isModalOpen: false

      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
  }
    handleSubmit(values) {
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment );
      console.log('Current State is: ' + JSON.stringify(values))
      alert('Current State is: ' + JSON.stringify(values))
  }
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
  
    render() {
      return(
          <React.Fragment>
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg">Submite Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submite Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Col>
                      <Label htmlFor="username">Rating</Label>
                      <Control.select model=".rating" name="rating"
                      className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col>
                      <Label htmlFor="author">Your Name</Label>
                      <Control.text model=".author" name="author"
                      className="form-control" placeholder="Your Name"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                      }}
                      />
                      <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Must be greater than 3 characters',
                        maxLength: 'Must be 15 characters or less'
                      }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col>
                      <Label htmlFor="comment">Comment</Label>
                      <Control.textarea model=".comment" name="comment"
                      className="form-control" rows="6"/>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Button outline className="form-control" color="primary">Submit</Button>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </React.Fragment>
      );
    }
  }

  const DishDetail = (props) => {
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null) {
      return (
          <div className="container">
            <div className='row'>
              <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr/>
              </div>
            </div>
            <div className="row">
              <RenderDish dish={props.dish} />
              <RenderComments comments={props.comments} 
                addComment={props.addComment}
                dishId={props.dish.id}/>
            </div>
          </div>
      );
  } else {
        return (
          <div></div>
        );
  }
}



export default DishDetail;
