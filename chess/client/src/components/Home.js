import React from 'react';
import '../index.css';

export default class Home extends React.Component {
        constructor() {
            super();
            this.state = {
                products: []
            }
        }

        componentDidMount = async () => {            
            try {
                let response = await fetch(
                  'http://localhost:3000/users',
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
        //HOC
        convertProductsToProductList = () => {            
            let productsList = this.state.products.map(product => {
                return <li>
                    <p>Name: {product.name}</p>
                    <p>Year : {product.year}</p>
                </li>
            });
            return <ol>
            {productsList}
            </ol>
        }
        render() {  
            console.log("reeee");
            return ( 
                <div>
                    {this.convertProductsToProductList()}
                </div>);
            }
        }