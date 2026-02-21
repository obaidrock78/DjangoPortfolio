import "./Services.css";
import { baseUrlImages, useGetServicesQuery } from "../../Api/api";
import { useEffect, useState } from "react";

const Services = () => {
  const { data: services, isFetching } = useGetServicesQuery();
  const [list, setList] = useState(services);
  const imgBase = baseUrlImages || "";

  useEffect(() => {
    setList(services);
  }, [services]);

  if (isFetching) return null;

  return (
    <section className="page-section services-section" id="services">
      <div className="section-inner">
        <header className="section-head">
          <span className="section-label">What I offer</span>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            From development to deployment, I help you ship quality software.
          </p>
        </header>
        <div className="services-grid">
          {list?.map((service) => (
            <article className="service-card" key={service.id}>
              <div className="service-card-icon">
                <img
                  src={`${imgBase}${service.image}`}
                  alt=""
                />
              </div>
              <h3 className="service-card-title">{service.service_name}</h3>
              <p className="service-card-desc">{service.service_description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
