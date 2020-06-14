import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle,
   Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader,
    ModalBody, Label, FormGroup, Row} from 'reactstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

  function RenderDish({dish}) {
            return(
              <div className="col-12 col-md-5 m-1">
                <Card>
                  <CardImg top src={dish.image} alt={dish.name}/>
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
              </div>
            );

  }

  function  RenderComments({comments}) {
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
            </div>
          );
      }else
          return(
              <div></div>
          );
  }


  const DishDetail = (props) => {
        if (props.dish != null) {
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
                        <RenderComments comments={props.comments} />
                        <CommentForm/>
                      </div>
                    </div>
               );
            } else {
                  return (
                    <div></div>
                  );
            }
          }

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      IsModelOpen: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
}
  handleSubmit(values) {
    this.toggleModal();
}
  toggleModal() {
    this.setState({
      IsModelOpen: !this.state.IsModelOpen
    });
  }

  render() {
    return(
        <React.Fragment>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg">Submite Comment</span>
          </Button>
          <Modal isOpen={this.state.IsModelOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submite Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <FormGroup>
                  <label htmlFor="username">Rating</label>
                  <Control.select model=".rating" name="rating"
                  className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="firstname">Your Name</label>
                  <Control.text model=".name" name="name"
                  className="form-control" placeholder="Your Name"
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }}
                  />
                  <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: 'Required ',
                    minLength: 'Must be greater than 3 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                  />
                  <FormGroup>
                    <label htmlFor="comment">Comment</label>
                    <Control.textarea model=".text" name="text"
                    className="form-control" rows="6"/>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Button outline className="form-control" color="primary">Submit</Button>
                </FormGroup>
              </LocalForm>
            </ModalBody>
          </Modal>
        </React.Fragment>
    );
  }
}

export default DishDetail;
