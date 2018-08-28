import React from 'react';
import '../index.css';

export default class newBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            board: []
        }
    }

    componentDidMount = async () => {            
        try {
            let response = await fetch(
              'http://localhost:3000/startGame',
              {
                method: 'POST',                                        
              });
            
            let responseJson = await response.json();                
            if(responseJson.result === "ok") {
                console.log(`responseJson = ${JSON.stringify(responseJson.products)}`);
                this.setState({
                    products: responseJson.products
                });
            }
          } catch (error) {
            console.error(error);
            this.setState({
                products: []
            });
          }            
    }





}