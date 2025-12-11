import { Heart, Stethoscope, Activity, Brain, Shield, Users } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Preventive Care",
    description:
      "Comprehensive health screenings, annual physicals, and personalized wellness plans to keep you healthy.",
  },
  {
    icon: Heart,
    title: "Chronic Disease Management",
    description:
      "Expert management of diabetes, hypertension, heart disease, and other chronic conditions.",
  },
  {
    icon: Activity,
    title: "Cardiovascular Health",
    description:
      "Heart health assessments, cholesterol management, and cardiovascular risk evaluation.",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description:
      "Addressing anxiety, depression, and stress with compassionate, integrated care.",
  },
  {
    icon: Shield,
    title: "Immunizations",
    description:
      "Stay protected with up-to-date vaccinations for all ages, including flu shots and travel vaccines.",
  },
  {
    icon: Users,
    title: "Family Medicine",
    description:
      "Caring for patients of all ages, from adolescents to seniors, with a family-centered approach.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We offer a wide range of medical services designed to meet your unique 
            healthcare needs with personalized attention and expert care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-8 rounded-2xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
