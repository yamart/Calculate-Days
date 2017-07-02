import * as getNumberOfDays from "./calculate/calculate";
import * as React from "react"; 
import * as ReactDOM from "react-dom"; 

interface AppState {
    startDate: string,
    endDate: string,
    includeEndDate: boolean
}

class App extends React.Component<any,AppState> {
    resultEl: HTMLElement;

    constructor(props:any) {
        super(props);

        this.state = {
            startDate: "",
            endDate: "",
            includeEndDate: false
        }

        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndtDateChange = this.onEndtDateChange.bind(this);
        this.onIncludeDateChange = this.onIncludeDateChange.bind(this);
    }

    onStartDateChange(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onEndtDateChange(e) {
        this.setState({
            endDate: e.target.value
        });
    } 

    onIncludeDateChange(e) {
        this.setState({
            includeEndDate: (e.target as HTMLInputElement).checked
        });
    }

    componentDidMount() {
        this.resultEl = this.refs["result"] as HTMLElement;
    }

    componentDidUpdate(prevProps:any, prevState: AppState) {
        if(prevState !== this.state && this.state.startDate !== "" && this.state.endDate !== "") {
            let sd = this.state.startDate.replace(/-/g, " ").split(" "),
                ed = this.state.endDate.replace(/-/g, " ").split(" ");

            try {
                let n = formatNumber(getNumberOfDays([sd[2], sd[1], sd[0]].join(" "),[ed[2], ed[1], ed[0]].join(" "), this.state.includeEndDate));
                console.log(n);
                this.resultEl.innerHTML = "<div class='num'><span>"+n+"</span> Day(s)</div>";
                // console.log(n);                
            } catch(e) {
                this.resultEl.innerHTML = "<div class='msg'>"+e+"</div>";
                // console.log(e);
            }
        }
    }   

    render() {
        let state = this.state;
        
        return (
            <div className="app-component">
                <h1>Date Difference</h1>
                <p>Enter start date and end date, it should be between 1900-2020</p>
                <input type="date" value={state.startDate} onChange={this.onStartDateChange} />
                <input type="date" value={state.endDate} onChange={this.onEndtDateChange} />
                <label><input type="checkbox" onChange={this.onIncludeDateChange} /> Include End Date</label>
                <div ref="result" className="result"></div>
            </div>
        );
    }
}

ReactDOM.render(<App />,document.getElementById("container"));

// Just a function to format numbers
function formatNumber(num:any,decimals:number = 0, d:string = '.', t:string = ',', sign:string = '') {
    var n = num,
        c = decimals,
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - +i).toFixed(c).slice(2) : "");
}