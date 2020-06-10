import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const dish = this.props.dish;
        if (dish != null) {
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                <CardTitle heading>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            )
            }else {
                return(
                    <div></div>
                )
            }
    }
}
export default DishDetail;

