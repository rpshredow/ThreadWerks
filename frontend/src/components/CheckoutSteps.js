import { Link } from "react-router-dom";
import style from "./CheckoutSteps.module.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={style.container}>
      <div>
        {step1 ? (
          <Link className={style.link} to="/login">
            <h3>Sign In</h3>
          </Link>
        ) : (
          <Link className={style.link_disabled} disabled>
            <h3>Sign In</h3>
          </Link>
        )}
      </div>
      <div>
        {step2 ? (
          <Link className={style.link} to="/shipping">
            <h3>Shipping</h3>
          </Link>
        ) : (
          <Link className={style.link_disabled} disabled>
            <h3>Shipping</h3>
          </Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link className={style.link} to="/payment">
            <h3>Payment</h3>
          </Link>
        ) : (
          <Link className={style.link_disabled} disabled>
            <h3>Payment</h3>
          </Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link className={style.link} to="/placeorder">
            <h3>Place Order</h3>
          </Link>
        ) : (
          <Link className={style.link_disabled} disabled>
            <h3>Place Order</h3>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
