/* eslint react/prop-types: 0 */

import { useParams } from 'react-router-dom';
import clplans from "../Plans/plans.json";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import PlanCard from '../Plans/FlipingCard';
import dummy from '../AdvisersClientView/grapghup.png';
// import advidata from "./advi.json";
import "../Plans/Plans.css";


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function PlanView() {
    // Extracting the advisor ID from the URL params
    const { plan_id } = useParams();

    const plan = clplans.find(plan => plan.plan_id === plan_id);

    // const advisorPlans = clplans.filter(plan => plan.advisor_id === advisor_id);
  
    return (
      <div>
        <div className='bigadv'>
            <div className='riga'>
            <div className='advleft'>
                <img className="moneyimg" src={plan.img} alt="money" style={{ borderRadius: '1.5rem', width: '8rem', height: '8rem', margin: '0.6rem' }} />
                <img src={dummy} style={{ borderRadius: '1.5rem', width: '10rem', height: '10rem', margin: '0.6rem' }}/>
            </div>
            </div>
            <div className='lefa'>
            <div className='advright'> 
                <h2 style={{marginTop:"0.5rem" }}>{plan.plan_name}</h2>
                <center><hr style={{ width: '70%' }} /></center>
                <div>📧: {plan.price} </div>
                <div>🚀: {new Date(plan.date_created).toLocaleDateString()}</div>
                <div>More details to be added</div>
                <br/>
                <br/>
                <br/>
                <button style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  padding: "10px 20px",
                                  borderRadius: "20px",
                                  border: "none",
                                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  cursor: "pointer"
                              }}>Buy</button>
            </div>
            </div>
        </div>
      </div>
    );
  
}

export default PlanView ;