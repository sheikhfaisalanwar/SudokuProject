import React from 'react';
import Cell from "./Cell";
import API from '../api/api';
import Dialog from 'react-bootstrap-dialog'
import {Button} from "react-bootstrap";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: [],
            grid:Array(9).fill("0").map(x=>Array(9).fill("0")),
        }
        this.solve = this.solve.bind(this);
        this.reset = this.reset.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.getCustomPuzzle = this.getCustomPuzzle.bind(this);
    }

    showDialog () {
        this.dialog.show({
            body: 'Input your puzzle string. \b' +
                'Example: \b 856014730090000000240000160062059300031802450005340920024000073000000010018630294 ',
            prompt: Dialog.TextPrompt(),
            bsSize: 'lg',
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction((dialog) => {
                    const result = dialog.value
                    this.getCustomPuzzle(result);
                })
            ]
        })
    }

    solve(){
        let result = this.state.cells.map(a => a.value).join('');
        console.log(result);
        API.post('/solveCustomBoard/' + "" + result)
            .then(res => {
                const cells = res.data["Cells"];
                this.setState({cells: cells})
            })
    }

    getCustomPuzzle(result){
        if(typeof result === 'string'){
            API.post('/getCustomBoard/'+ result)
                .then(res => {
                    const cells = res.data["Cells"];
                    this.setState({cells: cells})
                })
        }

    }

    renderCell(i) {
        return <Cell value={i}/>;
    }

    findCell(position){
        let cell = this.state.cells.find(function(d, idx){
            return d.position === position
        });
        if(cell){
            return cell["value"];
        }
    }

    reset(){
        API.get('/getDefaultBoard')
            .then(res => {
                const cells = res.data["Cells"];
                this.setState({cells: cells})
            })
    }

    componentDidMount() {
        API.get('/getDefaultBoard')
            .then(res => {
                const cells = res.data["Cells"];
                this.setState({cells: cells})
            });
    }

    render() {

        const style = {
            margin:'auto',
            marginBottom: '1em',
            width: "auto",
            height:"auto",
            backgroundColor:'white',
            color:'white',
            fontSize:"1em",
            tableLayout:'fixed',
        }

        const rows = this.state.grid.map((r, i) => {return (
                <tr key={"row_"+ i}>
                    {
                        r.map((d, j) => {
                            return(<Cell value={this.findCell(`${i},${j}`)}/>
                        )})
                    }
                </tr>)
            }
        );

        return (

            <div style={{textAlign:"center"}}>
                <h1> Sudoko Solver- Sheikh Faisal Anwar </h1>
                <table cellSpacing="0" id="table" style={style}>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                <Button variant="primary" key="solve" style={{margin:"auto"}} onClick={this.solve}>Solve</Button>
                <Button variant="secondary" key="reset" style={{margin:"auto"}} onClick={this.reset}>Reset</Button>
                <Button variant="secondary" onClick={this.showDialog}>Add new Puzzle</Button>
                <Dialog contentStyle={{
                    width: '100%',
                    maxWidth: 'none',
                }} ref={(component) => { this.dialog = component }} />
            </div>

        );
    }
}
export default Board;