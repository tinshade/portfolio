import { Link } from "react-router-dom";
import "./styles.css";

const NotFoundPage = () => {
  return (
    <section className="not-found-parent">
      <div className="not-found-child">
        <h1
          className="primary-text-blue"
          style={{ fontSize: "5rem", lineHeight: "3rem" }}
        >
          404
        </h1>
        <h2
          className="primary-text-blue"
          style={{ fontSize: "3rem", lineHeight: "3rem" }}
        >
          Wrong Place
        </h2>
        <h4
          className="primary-text-blue"
          style={{ fontSize: "2rem", lineHeight: "3rem" }}
        >
          Not sure how you got here <br /> but this place doesn not exist!
        </h4>
        <div className="mt-5">
          <Link className="not-found-link-btn" to="/dashboard/">
            Back To Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
