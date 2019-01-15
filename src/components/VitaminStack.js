import React from 'react'
import logo from '../logo.svg';
import { Parallax } from 'react-scroll-parallax'
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

var requireContext = require('require-context');

class VitaminStack extends React.Component  {
    
    state = {

    }

    vitaminAmazonLink = () => {
      let link =  'http://www.amazon.co.uk/gp/aws/cart/add.html?AssociateTag=lolao-21'
    let counter = 1

   
    for (const vitamin of this.props.getStack()){
       link = link + `&ASIN.${counter}=${this.getVitaminInfo(vitamin).code}&Quantity.${counter}=1`
        
       ++counter}
       return link
    }

    getTrait = name => {
        return this.props.report.find(r => r.trait === `${name}`)
    }


    getVitaminInfo = name => {
        return this.props.vitamins.find(r => r.name === `${name}`)

    }

    avoidStack = () => {
        const badStack  = []
        for (const i of this.props.report)  {
            if (this.props.getScore(i.trait) === 4 ) {
                badStack.push(i.trait)
            }
        }
        return badStack
    }

    goToBasket = () =>{ const url = this.vitaminAmazonLink();  window.open(url, "_blank") }

    importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        console.log(images);
        return images;
      }
      
      



    render () {
        this.vitaminAmazonLink()
        const {onPage, page, getStack, getScore} = this.props
        const {getVitaminInfo} = this
        let num = 1000
        const checked = onPage('vitaminstack')
        const images = this.importAll(require.context('../images', true, /^\.\/.*\.(jpg|png|gif)$/))
   
        return (

            // <Parallax offsetYMax={25} offsetYMin={-35}>
                <div className="result">
                {/* <Button variant="outlined" color="primary" onClick={() => this.props.scrollTo(750)}> */}
                {/* Your phenotype results</Button> */}
                    <h2>Your Vitamin Stack</h2>
                    

                    <div className="flex-container">
                        {getStack().map(vitamin => 
                        
                            
                    
                            <Slide  direction="down" in={checked}  style={{ transformOrigin: '0 0 0' }}
                                {...(checked ? { timeout: num } : {})} mountOnEnter unmountOnExit>
                                <div className="flex-child"> 
                                    <h3>{vitamin}</h3>
                                    {/* <p>RDA: {getVitaminInfo(vitamin).rda}</p>
                                     */}
                                    <img className="vitstructure" src={images[`${getVitaminInfo(vitamin).image}`]} alt={`chemical structure of ${getVitaminInfo(vitamin).name}`} />
            
                                    {/* <ul>{getVitaminInfo(vitamin).sources.split(',').map( source =>
                                        <li>{source}</li>)}
                                        </ul>
                                    
                                    <p>{getVitaminInfo(vitamin).benefits}</p>
                                    <ul>{getVitaminInfo(vitamin).deficiency.split(',').map(deficiency =>
                                        <li>{deficiency}</li>)} */}
                                    {/* </ul> */}
                                </div>
                            </Slide>
                            ,
                            num = num + 100
                    )}
                    </div>
                    <Button variant="contained" color="primary" onClick={this.goToBasket}>Purchase vitamin stack</Button>
                    <br />
                    <br />
                    {/* <Button variant="outlined" color="primary" onClick={this.props.scrollToLast}>
                Recommended foods</Button> */}



                    <div id="section07" className="demo">
                        <p onClick={this.props.scrollToLast} ><span></span><span></span><span></span>Click to scroll</p>
                    </div>

                </div>
            // </Parallax>
        )
    }
}
 export default VitaminStack