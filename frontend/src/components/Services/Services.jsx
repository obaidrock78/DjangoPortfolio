import "./Services.css";
import { baseUrlImages, useGetServicesQuery } from "../../Api/api";

const Services = () => {
  const { data: services, isFetching } = useGetServicesQuery();
  const img_300 = baseUrlImages;

  if (isFetching) return "loading";

  return (
    <>
      <section id="services">
        <div className="service-container">
          <div className="service-title">
            <h2>What I Offer You</h2>

            <h3>Services</h3>
          </div>

          <div className="service-row">
            {services &&
              services.map((service) => (
                <div
                  className=" my-service"
                  key={service.id}
                  data-aos="zoom-in-up"
                  data-aos-duration="1500"
                >
                  <div className="ser-back">
                    <img src={`${img_300}${service.image}`} alt="" />
                  </div>
                  <h4 className="web">{service.service_name}</h4>
                  <p className="service-info">{service.service_description}</p>
                  {/* <h6 className="learn-more">{service.learn_more}</h6> */}
                  <div className="shadow-icon">
                    <i className={service.shadow_icon} aria-hidden="true" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
