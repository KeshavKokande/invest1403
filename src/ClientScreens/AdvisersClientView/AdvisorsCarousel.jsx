
import AdvisorCard from './AdvisorCard';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
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

const AdvisorsCarousel = ({ advisors }) => {
  const associateAdvisors = advisors.filter(advisor => advisor.cat_type === "Associate");
  const advanceAdvisors = advisors.filter(advisor => advisor.cat_type === "Advance");
  const expertAdvisors = advisors.filter(advisor => advisor.cat_type === "Expert");

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Standard Advisors</h2>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {associateAdvisors.map((advisor, index) => (
          <div key={index}>
            <Link to={`/advisor_id/${advisor._id}`}>
              <AdvisorCard advisor={advisor} />
            </Link>
          </div>
        ))}
      </Carousel>

      <h2 style={{ marginBottom: "1rem" }}>Exeutive Advisors</h2>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {advanceAdvisors.map((advisor, index) => (
          <div key={index}>
            <Link to={`/advisor_id/${advisor._id}`}>
              <AdvisorCard advisor={advisor} />
            </Link>
          </div>
        ))}
      </Carousel>

      <h2 style={{ marginBottom: "1rem" }}>Premium Advisors</h2>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {expertAdvisors.map((advisor, index) => (
          <div key={index}>
            <Link to={`/advisor_id/${advisor._id}`}>
              <AdvisorCard advisor={advisor} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdvisorsCarousel;
