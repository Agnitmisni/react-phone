import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class MyApp extends React.Component {
  render() {
    const onSuccess = (details, data) => {
      console.log("The payment was succeeded!", details);
      this.props.clearCart();
      this.props.history.push("/");

      // Optional: Call your server to save the transaction
      return fetch("/paypal-transaction-complete", {
        method: "post",
        body: JSON.stringify({
          orderID: data.orderID
        })
      });
    };

    const onCancel = (data) => {
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    return (
      <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_APP_ID }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.props.totalAmount, // Shuma që dëshironi të paguani
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              onSuccess(details, data);
            });
          }}
          onCancel={onCancel}
          onError={onError}
        />
      </PayPalScriptProvider>
    );
  }
}