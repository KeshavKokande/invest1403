import AreaCard from "./AreaCard";
import { useState,useEffect } from "react";
import "./AreaCards.scss";

const AreaCards = () => {

  const [totalClients, setTotalClients] = useState();
  const [totalInvestedAmount, setTotalInvestedAmount] = useState();

  useEffect(() => {
    const fetchTotalClients = async () => {
      try {

        const response = await fetch('http://localhost:8000/api/v1/advisor/get-no-of-clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTotalClients(data);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchTotalClients();
  }, []);

  useEffect(() => {
    const fetchTotalInvestedAmount = async () => {
      try {

        const response = await fetch('http://localhost:8000/api/v1/advisor/get-tatal-invested-amount', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTotalInvestedAmount(data);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchTotalInvestedAmount();
  }, []);


  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Total Clients",
          value: totalClients?.noOfClients, 
          text: `You have ${totalClients?.noOfClients} clients.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total Revenue",
          value: `₹${totalInvestedAmount?.totalInvestedAmount}`,
          text: `Total investment ${totalInvestedAmount?.totalInvestedAmount}`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Current Profit",
          value: "$18.2K",
          text: "Available to payout",
        }}
      />
    </section>
  );
};

export default AreaCards;
