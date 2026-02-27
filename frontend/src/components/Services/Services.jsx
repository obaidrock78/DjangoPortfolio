import "./Services.css";
import { baseUrlImages, useGetServicesQuery } from "../../Api/api";
import SectionHeading from "../SectionHeading/SectionHeading";

const Services = () => {
  const { data: services, isFetching } = useGetServicesQuery();

  if (isFetching) return "loading";

  const total = services?.length || 0;

  return (
    <section id="services">
      <SectionHeading label="What I Offer You" title="Services" />

      <div className="services-grid">
        {services &&
          services.map((service, index) => {
            const order = index + 1;
            const paddedOrder = order.toString().padStart(2, "0");
            const paddedTotal = total.toString().padStart(2, "0");

            return (
              <div
                className="service-card"
                key={service.id}
                data-aos="fade-up"
                data-aos-duration="900"
              >
                <div className="service-overlay" />
                <div className="service-bg-num">{paddedOrder}</div>
                <div className="service-icon">
                  {service.image ? (
                    <img
                      src={`${baseUrlImages}${service.image}`}
                      alt={service.service_name}
                    />
                  ) : (
                    service.shadow_icon && (
                      <i className={service.shadow_icon} aria-hidden="true" />
                    )
                  )}
                </div>
                <div className="service-content">
                  <span className="service-num">
                    {paddedOrder} / {paddedTotal}
                  </span>
                  <div className="service-line" />
                  <h3 className="service-name">{service.service_name}</h3>
                  {service.service_description && (
                    <p className="service-desc">
                      {service.service_description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Services;
