import "./Services.css";
import { baseUrlImages, useGetServicesQuery } from "../../Api/api";
import { useEffect, useState } from "react";

const Services = () => {
  const { data: services, isFetching } = useGetServicesQuery();
  const [servicesDetails, setServicesDetails] = useState(services);
  const img_300 = baseUrlImages;

  useEffect(() => {
    setServicesDetails(services);
  }, [servicesDetails, services]);

  if (isFetching) return null;

  return (
    <section className="experience-sovereign" id="services">
      <div className="experience-layout">
        {/* Sticky sidebar */}
        <div className="experience-sidebar rv">
          <div className="section-eyebrow">Services & Expertise</div>
          <h2 className="section-heading">
            Years of <em>levelling up.</em>
          </h2>
          <p className="experience-sidebar-text">
            Every engagement sharpens the craft. From early freelance builds to
            enterprise-scale cross-platform systems — each chapter added depth,
            speed, and architectural conviction.
          </p>
          <div className="experience-timeline-line" />
        </div>

        {/* Cards */}
        <div className="experience-cards">
          {services &&
            services.map((service, idx) => (
              <div className={`exp-card rv d${Math.min(idx + 1, 5)}`} key={service.id}>
                <div className="exp-card-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="exp-card-top">
                  {service.image && (
                    <div className="exp-card-icon">
                      <img
                        src={`${img_300}${service.image}`}
                        alt={service.service_name}
                      />
                    </div>
                  )}
                </div>

                <h3 className="exp-card-title">{service.service_name}</h3>
                <p className="exp-card-description">
                  {service.service_description}
                </p>

                {service.shadow_icon && (
                  <div className="exp-shadow-icon">
                    <i className={service.shadow_icon}></i>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
