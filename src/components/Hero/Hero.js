import "./styles.css";

const Hero = () => {
  return (
    <section id="hero" className="row p-0 m-0">
      <div className="col-sm-12 col-lg-6 col-md-6">
        <div className="d-flex flex-column">
          <h5>👋🏼 Hello, World!</h5>
          <h1 className="display-1">I am Abhishek</h1>
          <h3>Full Stack Developer</h3>
          <h4>With 5yrs of experience</h4>

          <div className="container-fluid d-flex" style={{ gap: "5%" }}>
            <button className="btn primary-btn">Say Hello!</button>
            <button className="btn alt-btn">My Works</button>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-lg-6 col-md-6">
        <img src="" alt="" />
      </div>
    </section>
  );
};

export default Hero;
