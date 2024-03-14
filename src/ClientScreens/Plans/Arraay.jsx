/* eslint react/prop-types: 0 */
import PlanCard from './FlipingCard';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import '../Profilepage/style.css';
import "../Plans/Plans.css";
import { Link } from 'react-router-dom';

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

const Arraay = ({ plans }) => {
  const topRatedPlans = plans.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 5);
  const mostOrderedPlans = plans.sort((a, b) => parseInt(b.total_orders) - parseInt(a.total_orders)).slice(0, 5);

  return (
    <div>
      <h2 style={{marginBottom:"1rem"}}>Top Rated Plans</h2>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {topRatedPlans.map((plan, index) => (
          <div key={index}>
            <Link to={`/plan_id/${plan.plan_id}`}>
            <PlanCard plan={plan} />
            </Link>
          </div>
        ))}
      </Carousel>

      <h2 style={{marginBottom:"1rem"}}>Most Ordered Plans</h2>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {mostOrderedPlans.map((plan, index) => (
          <div key={index}>
            <Link to={`/plan_id/${plan.plan_id}`}>
            <PlanCard plan={plan} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Arraay;