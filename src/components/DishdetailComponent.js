import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle,CardColumns } from 'reactstrap';
import Moment from 'moment';

class DishDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const dish = this.props.dish;
        if (dish != null) {
            const comments = dish.comments.map(comment => {
               return (
               <CardBody>
                 <CardText>{comment.comment}</CardText>
                 <CardText>-- {comment.author}, {Moment(comment.date).format('MMM d, yyyy')}</CardText>
               </CardBody>
               )
            } );
        return(
            <div className="row">
              <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
              </div>
              <div className="col-12 col-md-5 m-1">
                <Card>
                    <h4>Comments</h4>
                    {comments}
                </Card>
              </div>
            </div>
            )
            }else {
                return(
                    <div></div>
                )
            }
    }
}
export default DishDetail;

