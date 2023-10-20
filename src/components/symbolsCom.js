import React, {Component} from "react";
import axios from 'axios'; // npm init react-app .

class SymbolsCom extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg:"You wallet balance",
            arrSymbol:[],
            amount:0
        };
    }

    componentDidMount() {
        this.updateBalance();
    }

    render(){
        return(
            <div className="SymbolsCom">
                <div>{this.state.msg}</div>
                <ul>
                {this.state.arrSymbol.map((sym, i) => {     
                    return (<li key={i} >{sym.symb} : {sym.free}</li>) 
                })}
                </ul>

                <div className="TradingCom">
                <h3>In want to buy 
                    <input type="text" 
                    value={this.state.amount} onChange={(txt)=>this.setState({amount:txt.target.value})} 
                    /> BNB (via USDT)</h3>
                <button onClick={()=>{this.sendOrder()}}>Buy BNB {this.state.amount}</button>

            </div>
            </div>
        )
    }

    updateBalance(){
        axios.post(`http://localhost:3001/balance`)
        .then(res => {
            this.setState({ arrSymbol: res.data.symbols });
        })
        .catch(error => console.log(error));  
    }

    sendOrder(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/userSendOrder',
            data: new URLSearchParams({
                amount: this.state.amount})
        })
        .then(res => {
            console.log(res.data);
            this.updateBalance();
        })
        .catch(error => console.log(error));  
    }
}

export default SymbolsCom;