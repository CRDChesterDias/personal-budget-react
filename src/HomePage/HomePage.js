import React from 'react';
import axios from "axios";
import Pie from 'react-chartjs-2';

import * as d3 from "d3";

import DJspie from './DJspie';

class HomePage extends React.Component {
   
myBudgetFile = "http://localhost:3000/budget.json";
state = { dataSource: {labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
            '#FFCD56',
            '#FF6384',
            '#36A2EB',
            '#FD6B19',
            '#FD3A19',
            '#FDCD56',
            '#FFCD19',
        ],
        label: 'Budget'
    }],d3Data:[]}
    
};
dataSource = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: [
          '#FFCD56',
          '#FF6384',
          '#36A2EB',
          '#FD6B19',
          '#FD3A19',
          '#FDCD56',
          '#FFCD19',
      ],
      label: 'Budget'
  }],
  d3Data:[]
};

componentDidMount()
 {

    axios.get(this.myBudgetFile)
      .then(res => {
          res=JSON.parse(JSON.stringify(res))
          for(var i = 0; i < res.data.myBudget.length; i++){
              this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
              this.dataSource.labels[i] = res.data.myBudget[i].title;
            }
            const test = this.dataSource.labels.map((item, index) => ({
                date: this.dataSource.datasets[0].data[index],
                value: this.dataSource.labels[index]
              }));
              console.log(test)
              this.dataSource.d3Data = test
              console.log(this.dataSource.d3Data)
              this.setState(currentState =>({dataSource: this.dataSource}));
              console.log(this.state.dataSource.d3Data);
              
              this.forceUpdate()
        })

      }

  render() {
    return (
      <div className="container center">
        
      <div className="page-area" role="main" id="content"> 
      

          <section className="text-box">
           <h1>Stay on track</h1>
              <p>
                  Do you know where you are spending your money? If you really stop to track it down,
                  you would get surprised! Proper budget management depends on real data... and this
                  app will help you with that!
              </p>
          </section>

          <section className="text-box">
              <h1>Alerts</h1>
              <p>
                  What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
              </p>
          </section>
      

          <section className="text-box">
              <h1>Results</h1>
              <p>
                  People who stick to a financial plan, budgeting every expense, get out of debt faster!
                  Also, they to live happier lives... since they expend without guilt or fear... 
                  because they know it is all good and accounted for.
              </p>
          </section>

          <section className="text-box">
              <h1>Free</h1>
              <DJspie></DJspie>
              <div>
      </div>
              
          </section>

          <section className="text-box">
              <h1>Stay on track</h1>
              <p>
                  Do you know where you are spending your money? If you really stop to track it down,
                  you would get surprised! Proper budget management depends on real data... and this
                  app will help you with that!
              </p>
          </section>
    
          <section className="text-box">
              <h1>Alerts</h1>
              <p>
                  What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
              </p>
          </section>

          <section className="text-box">
              <h1>Results</h1>
              <p>
                  People who stick to a financial plan, budgeting every expense, get out of debt faster!
                  Also, they to live happier lives... since they expend without guilt or fear... 
                  because they know it is all good and accounted for.
              </p>
          </section>
          <section className="text-box">
              <h1>Free</h1>
              <p>
              <Pie data={this.state.dataSource}/>
                </p>
          </section>
          
      </div>

  </div>
    );
  }
}

export default HomePage;
