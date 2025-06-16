import React, { useEffect, useState, useContext } from "react";
import { getPolicyQuotes } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewQuotes.css";

const ViewQuotes = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getPolicyQuotes(userId);
        setQuotes(data);
        if (data.length === 0) {
          toast.info("You have no quotes yet.");
        }
      } catch (err) {
        console.error(err);
        toast.error("You have no quotes yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [userId]);

  return (
    <div className="view-quotes-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="quotes-container">
        <h2>My Policy Quotes</h2>

        {loading ? (
          <p>Loading quotes...</p>
        ) : quotes.length === 0 ? (
          <div className="no-quotes">
            <p>You have no quotes yet.</p>
            <p>Create a policy to view available quotes.</p>
            <button onClick={() => navigate("/propose-policy")}>
              Propose a Policy
            </button>
          </div>
        ) : (
          <>
            <table className="quotes-table">
              <thead>
                <tr>
                  <th>Vehicle Type</th>
                  <th>Vehicle Number</th>
                  <th>Base Premium</th>
                  <th>Add-On Premium</th>
                  <th>Total Premium</th>
                  <th>Quote Date</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.quoteId}>
                    <td>{quote.vehicleType}</td>
                    <td>{quote.vehicleNumber}</td>
                    <td>₹{quote.basePremiumAmount}</td>
                    <td>₹{quote.addOnPremiumAmount}</td>
                    <td>₹{quote.totalPremium}</td>
                    <td>{new Date(quote.quoteDate).toLocaleDateString()}</td>
                    <td>{new Date(quote.expiryDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="quote-guidance">
              Need to make a payment? Head to the payment section!
            </p>

            <button
              className="payment-button"
              onClick={() => navigate("/make-payment")}
            >
              Proceed to Make Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewQuotes;

