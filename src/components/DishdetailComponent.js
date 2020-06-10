import React, { Component, isValidElement } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle,CardColumns } from 'reactstrap';
import Moment from 'moment';

class DishDetail extends Component{


    renderDish(dish) {
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

    renderComments(comments) {
      if (comments != null)
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
    }

    render() {
        const dish = this.props.dish;
        if (dish != null) {
               return (
                    <div className="container">
                      <div className="row">
                        {this.renderDish(dish)}
                        {this.renderComments(dish.comments)}
                      </div>
                    </div>
               );
            } else {
                  return (
                    <div></div>
                  );
            }
          }
}
export default DishDetail;
