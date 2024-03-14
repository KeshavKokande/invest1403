import {useState} from 'react';

const AddPlan = () => {
    const [formData, setFormData] = useState({
        capValue: '',
        maxVal: '',
        returnProfit: '',
        risk: '',
        minInvestmentAmount: '',
        advise: '',
        stocks: [{stockName: '',contri: ''}]
      });      
   
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStockChange = (e, index) => {
        const { name, value } = e.target;
        const updatedStocks = [...formData.stocks];
        updatedStocks[index][name] = value;
        setFormData({
            ...formData,
            stocks: updatedStocks
        });
    };

    const handleAddStock = () => {
        setFormData({
            ...formData,
            stocks: [...formData.stocks, { stockName: '', contri: '' }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Redirect to "/plans" route
        history.push('/plans');
    };
      

   return (
    <div className="addPlan-form-container">
      <div className="addPlan-image-container">
        <img src="https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=" alt="Financial Analysis" />
      </div>
      <div className="addPlan-form-section">
        <form id="new-plan-form" onSubmit={handleSubmit}>
            <label className="addPlan-label" htmlFor="capValue">Cap Value:</label>
            <input className="addPlan-input" type="text" id="capValue" name="capValue" value={formData.capValue} onChange={handleChange} required />
                    
          <label className="addPlan-label" htmlFor="maxVal">Max Value:</label>
          <input className="addPlan-input" type="text" id="maxVal" name="maxVal" value={formData.maxVal} onChange={handleChange} required />
          
          <label className="addPlan-label" htmlFor="returnProfit">Return Profit:</label>
          <input className="addPlan-input" type="text" id="returnProfit" name="returnProfit" value={formData.returnProfit} onChange={handleChange} required />
          
          <label className="addPlan-label" htmlFor="risk">Risk:</label>
          <select className="addPlan-select" id="risk" name="risk" value={formData.risk} onChange={handleChange} required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <label className="addPlan-label" htmlFor="minInvestmentAmount">Minimum Investment Amount:</label>
          <input className="addPlan-input" type="number" id="minInvestmentAmount" name="minInvestmentAmount" value={formData.minInvestmentAmount} onChange={handleChange} required />
          
          <label className="addPlan-label" htmlFor="advise">Advise:</label>
          <input className="addPlan-input" type="text" id="advise" name="advise" value={formData.advise} onChange={handleChange} required />
          
          <label className="addPlan-label" htmlFor="stocks">Stocks:</label>
            <div id="stocks">
                {formData.stocks.map((stock, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            id={`stockName${index}`}
                            name={`stockName${index}`}
                            value={stock.stockName}
                            onChange={(e) => handleStockChange(e, index)}
                            placeholder="Enter stock name"
                        />
                        <input
                            type="number"
                            id={`contri${index}`}
                            name={`contri${index}`}
                            value={stock.contri}
                            onChange={(e) => handleStockChange(e, index)}
                            placeholder="Enter contribution"
                        />
                    </div>
                ))}
            </div>
          <button type="button" className="addPlan-add-stock-btn" onClick={handleAddStock}>+ Add Stock</button>
          <button type="submit">Create Plan</button>
          </form>
      </div>
    </div>
  );
};

export default AddPlan;